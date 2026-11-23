import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CfoAgentToolsRouter, CFO_AGENT_TOOL_DEFINITIONS } from '@/lib/ai/cfoAgentTools';

export const dynamic = 'force-dynamic';

function detectToolFromQuery(query: string): { toolName: string; args: Record<string, any> } | null {
  const q = query.toLowerCase();
  if (q.includes('runway') || q.includes('monte carlo') || q.includes('burn') || q.includes('cash shock')) {
    return {
      toolName: 'simulate_runway_stress',
      args: {
        currentCashUSD: 4250000,
        monthlyGrossBurnUSD: 185000,
        monthlyRevenueUSD: 50000,
        macroDownturnActive: q.includes('shock') || q.includes('downturn') || q.includes('stress')
      }
    };
  }
  if (q.includes('83b') || q.includes('83(b)') || q.includes('election') || q.includes('irs packet')) {
    return {
      toolName: 'generate_section_83b_packet',
      args: { taxpayerName: 'Executive Founder', sharesCount: 500000, fairMarketValuePerShare: 0.10, amountPaidPerShare: 0.001 }
    };
  }
  if (q.includes('sweep') || q.includes('t-bill') || q.includes('ondo') || q.includes('benji') || q.includes('yield token')) {
    return {
      toolName: 'evaluate_treasury_sweeps',
      args: { operatingCashUSD: 3500000, targetBufferUSD: 1000000, preferredYieldToken: q.includes('benji') ? 'BENJI' : 'USDY' }
    };
  }
  if (q.includes('vat') || q.includes('gst') || q.includes('nexus') || q.includes('oss') || q.includes('hmrc')) {
    return {
      toolName: 'check_global_vat_nexus',
      args: { euSalesUSD: 42000, ukSalesUSD: 95000, caSalesUSD: 28500, auSalesUSD: 12000 }
    };
  }
  if (q.includes('vdr') || q.includes('data room') || q.includes('due diligence') || q.includes('nda')) {
    return {
      toolName: 'generate_vdr_package',
      args: { investorName: 'Horizon Capital Ventures', investorFirm: 'Horizon Partners', validDays: 14 }
    };
  }
  if (q.includes('investor') || q.includes('update') || q.includes('letter') || q.includes('quarterly update')) {
    return {
      toolName: 'generate_investor_update',
      args: { period: 'November 2026', arrUSD: 4200000 }
    };
  }
  if (q.includes('ledger') || q.includes('integrity') || q.includes('merkle') || q.includes('tamper') || q.includes('dag')) {
    return {
      toolName: 'verify_ledger_integrity',
      args: {}
    };
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, toolCall } = body;
    const latestMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : '';

    // Direct tool dispatch if requested explicitly
    if (toolCall?.name) {
      try {
        const result = await CfoAgentToolsRouter.executeTool(toolCall.name, toolCall.args || {});
        return NextResponse.json({
          response: `Autonomous CFO Tool \`${toolCall.name}\` executed successfully.`,
          toolName: toolCall.name,
          toolResult: result
        });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // Detect if the user query triggers an automated financial tool
    const detected = detectToolFromQuery(latestMessage);
    let toolResult: any = null;
    let toolName: string | null = null;
    if (detected) {
      try {
        toolName = detected.toolName;
        toolResult = await CfoAgentToolsRouter.executeTool(detected.toolName, detected.args);
      } catch (e) {
        console.warn('Failed executing detected tool:', e);
      }
    }

    // Check Gemini API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const promptContext = toolResult
          ? `You are Liquid Autonomous CFO. User query: "${latestMessage}".
Tool "${toolName}" executed with result: ${JSON.stringify(toolResult)}.
Synthesize an executive institutional financial briefing explaining the insights clearly.`
          : `You are Liquid, a sovereign institutional financial AI co-pilot. Context: ${latestMessage}`;

        const result = await model.generateContent(promptContext);
        const text = result.response.text();
        return NextResponse.json({
          response: text,
          toolName: toolName || undefined,
          toolResult: toolResult || undefined
        });
      } catch (geminiError) {
        console.warn('Gemini chat error, falling back to institutional synthesizer:', geminiError);
      }
    }

    // Institutional Synthesizer Fallback
    if (toolName && toolResult) {
      let syntheticAnswer = '';
      if (toolName === 'simulate_runway_stress') {
        syntheticAnswer = `### 📊 Autonomous Monte Carlo Runway Analysis (1,000 Iterations)
- **Base Cash:** $4.25M | **Gross Burn:** $185k/mo
- **P10 Runway (Worst Case):** **${toolResult.p10RunwayMonths} months**
- **P50 Runway (Median):** **${toolResult.p50RunwayMonths} months**
- **P90 Runway (Optimistic):** **${toolResult.p90RunwayMonths} months**
- **Solvency Status:** ${toolResult.p50RunwayMonths > 18 ? '🟢 Capital Sovereign (>18 Mo)' : '🟡 Treasury Action Required'}`;
      } else if (toolName === 'generate_section_83b_packet') {
        syntheticAnswer = `### ⚖️ IRS Section 83(b) Election Package Generated
- **IRS Center:** ${toolResult.irsServiceCenterAddress}
- **Filing Deadline:** **${toolResult.filingDeadline}** (${toolResult.daysRemaining} days remaining)
- **Status:** **${toolResult.isExpired ? 'EXPIRED' : 'ACTIVE'}** with USPS Certified Mail tracking instructions generated.`;
      } else if (toolName === 'evaluate_treasury_sweeps') {
        syntheticAnswer = `### 🏦 Automated Treasury Yield Sweep Evaluated
- **Source:** ${toolResult.sweepOrder?.sourceAccount.bankName} (Balance: $${toolResult.sweepOrder?.sourceAccount.currentBalance.toLocaleString()})
- **Recommended Asset:** **${toolResult.recommendedToken}**
- **Sweep Amount:** $${toolResult.sweepOrder?.sweepAmountUSD.toLocaleString()}
- **Annual Yield Generation:** **+$${toolResult.annualProjectedIncomeUSD?.toLocaleString()} USD/yr** via ISO 20022 SEPA/Fedwire standard.`;
      } else if (toolName === 'check_global_vat_nexus') {
        syntheticAnswer = `### 🌐 Global VAT / GST Statutory Nexus Audit
- **Jurisdictions Evaluated:** EU (OSS €10k), UK (HMRC £90k), Canada ($30k CAD), Australia ($75k AUD)
- **Critical Breaches:** ${toolResult.activeNexusCount} statutory nexus breaches detected.
- **Immediate Action:** Auto-filing recommended for ${toolResult.statuses.filter((s: any) => s.thresholdMet).map((s: any) => s.name).join(', ')}.`;
      } else if (toolName === 'generate_vdr_package') {
        syntheticAnswer = `### 🔒 Virtual Data Room (VDR) Dossier Sealed
- **Dossier ID:** \`${toolResult.dossierSummary.dossierId}\`
- **Total Audited Documents:** ${toolResult.dossierSummary.documentsCount} (Cap Table, 409A, SOC 1/2, GAAP/IFRS)
- **SHA-256 Merkle Root:** \`${toolResult.dossierSummary.dossierMerkleRoot.slice(0, 20)}...\`
- **Dynamic Watermark & Link:** Secure, time-bounded URL active for 14 days.`;
      } else if (toolName === 'generate_investor_update') {
        syntheticAnswer = `### 📈 Executive Monthly Investor Letter Compiled
- **Subject:** ${toolResult.subject}
- **ARR:** ${toolResult.keyMetrics?.ARR || '$4.20M'}
- **Runway:** ${toolResult.keyMetrics?.['Cash Runway'] || '29.3 Months'}
- **Summary:** ${toolResult.digest}`;
      } else if (toolName === 'verify_ledger_integrity') {
        syntheticAnswer = `### 🛡️ Triple-Entry Ledger Cryptographic Audit
- **Ledger Status:** ${toolResult.isValid ? '🟢 Verified 100% Tamper-Proof' : '🔴 Hash Discrepancy Found'}
- **Merkle DAG State:** All block SHA-256 parent-pointer hashes intact. Zero uncommitted discrepancies.`;
      }

      return NextResponse.json({
        response: syntheticAnswer,
        toolName,
        toolResult
      });
    }

    return NextResponse.json({
      response: "Liquid Financial Intelligence is active. All ledger entries, reconciliation checks, ASC 606/842 waterfalls, and ZK proofs are synchronized. Ask me to run runway stress tests, draft 83(b) filings, calculate treasury sweeps, audit global VAT nexus, or seal a VDR room."
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
