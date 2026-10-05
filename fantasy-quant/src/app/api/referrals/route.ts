import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
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
            // ignore
          }
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action } = await req.json();

    if (action === 'generate_link') {
      // In a real app, we'd store the referral code in a referrals table
      const referralCode = `FQ-${session.user.id.substring(0, 8).toUpperCase()}`;
      return NextResponse.json({ 
        referral_link: `https://fantasyquant.com/?ref=${referralCode}`,
        referral_code: referralCode,
        stats: {
          clicks: 24,
          signups: 3,
          revenue_share: 15.00
        }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Referral processing failed" }, { status: 500 });
  }
}
