import { NextResponse } from "next/server";

// Standard financial categories taxonomy
const CATEGORY_RULES: { pattern: RegExp; label: string; score: number }[] = [
  { pattern: /aws|google cloud|azure|datadog|github|vercel|netlify|supabase/i, label: "Cloud Infrastructure", score: 0.98 },
  { pattern: /uber|lyft|airline|delta|united|hotel|airbnb/i, label: "Travel & Lodging", score: 0.95 },
  { pattern: /doordash|grubhub|restaurant|coffee|starbucks|catering/i, label: "Meals & Entertainment", score: 0.92 },
  { pattern: /gusto|rippling|adp|payroll|wages/i, label: "Payroll & Compensation", score: 0.99 },
  { pattern: /latham|cooley|legal|attorney|delaware|sos/i, label: "Legal & Regulatory", score: 0.96 },
  { pattern: /figma|slack|notion|linear|zoom|google workspace/i, label: "Software & SaaS Subscriptions", score: 0.95 },
  { pattern: /stripe|mercury|svb|wire fee|bank fee/i, label: "Bank & Merchant Fees", score: 0.97 },
];

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    // Pattern-based high-confidence categorization
    for (const rule of CATEGORY_RULES) {
      if (rule.pattern.test(text)) {
        return NextResponse.json({
          result: [{ label: rule.label, score: rule.score }]
        }, { status: 200 });
      }
    }

    // Default general business expense classification
    return NextResponse.json({
      result: [{ label: "General & Administrative", score: 0.85 }]
    }, { status: 200 });
  } catch (error) {
    console.error("AI Categorization failed:", error);
    return NextResponse.json({ error: "Categorization error" }, { status: 500 });
  }
}
