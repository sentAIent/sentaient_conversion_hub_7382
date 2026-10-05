import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: Request) {
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

  // Require Pro or Elite tier for Prop Betting Correlation
  const { data: user } = await supabase.from("users").select("subscription_tier").eq("id", session.user.id).single();
  if (!["pro", "elite", "admin"].includes(user?.subscription_tier || "")) {
    return NextResponse.json({ error: "Pro tier required for Prop Bet Correlator" }, { status: 403 });
  }

  // Simulate returning mathematically +EV prop bets by correlating our DFS projections against sportsbook lines
  const propDiscrepancies = [
    {
      player: "Amon-Ra St. Brown",
      market: "Receiving Yards",
      sportsbook_line: 78.5,
      ai_projection: 92.4,
      edge_percentage: 17.7,
      recommendation: "OVER",
      confidence: "HIGH"
    },
    {
      player: "Derrick Henry",
      market: "Rushing Yards",
      sportsbook_line: 85.5,
      ai_projection: 71.2,
      edge_percentage: -16.7,
      recommendation: "UNDER",
      confidence: "HIGH"
    },
    {
      player: "Patrick Mahomes",
      market: "Passing TDs",
      sportsbook_line: 2.5,
      ai_projection: 2.8,
      edge_percentage: 12.0,
      recommendation: "OVER",
      confidence: "MEDIUM"
    }
  ];

  return NextResponse.json({ props: propDiscrepancies });
}
