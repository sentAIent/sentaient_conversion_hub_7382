import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Context called from server component, ignore
          }
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Collect all data related to the user for GDPR export
    const [profile, paperAccounts, paperBets, savedViews, drafts] = await Promise.all([
      adminSupabase.from("users").select("*").eq("id", userId).single(),
      adminSupabase.from("paper_accounts").select("*").eq("user_id", userId),
      adminSupabase.from("paper_bets").select("*").eq("user_id", userId),
      adminSupabase.from("user_views").select("*").eq("user_id", userId),
      adminSupabase.from("user_drafts").select("*").eq("user_id", userId),
    ]);

    const exportData = {
      generated_at: new Date().toISOString(),
      user: profile.data,
      paper_accounts: paperAccounts.data,
      paper_bets: paperBets.data,
      saved_views: savedViews.data,
      drafts: drafts.data,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="fantasyquant_data_${userId}.json"`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
