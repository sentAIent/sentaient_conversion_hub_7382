import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function DELETE() {
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
    // Delete user from auth (this cascades or we manually delete from public.users depending on schema)
    const { error: deleteAuthError } = await adminSupabase.auth.admin.deleteUser(userId);
    
    if (deleteAuthError) {
      throw deleteAuthError;
    }

    // Because of foreign keys and triggers, this might cascade. If not, we explicitly delete from public.users
    await adminSupabase.from("users").delete().eq("id", userId);
    
    return NextResponse.json({ success: true, message: "User data permanently deleted (CCPA/GDPR request)" }, { status: 200 });
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
