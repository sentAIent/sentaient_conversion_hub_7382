import type { Recommendation, SwotAnalysis } from '@/types';

export const INITIAL_TEXT = `AGREEMENT

This Agreement is made on this day between Company A ("Provider") and Client B ("Client").

1. SERVICES. Provider agrees to do work for Client.

2. PAYMENT. Client will pay Provider money when the work is done.

3. TERM. This agreement lasts for 1 year.

4. TERMINATION. Either party can stop this agreement whenever they want.

5. LIABILITY. Provider is not responsible for anything bad that happens.

6. DISPUTE RESOLUTION. If we fight, we will try to talk it out.

[End of Agreement]`;

export const SEVERITY_IMPACT: Record<string, number> = {
    'Critical': 15,
    'High': 10,
    'Medium': 5,
    'Low': 2,
};

export const SAMPLE_SCORE = 42;

export const SAMPLE_SWOT: SwotAnalysis = {
    strengths: [
        "Clearly defined parties and basic intent",
        "Mutual agreement on general services"
    ],
    weaknesses: [
        "Critical lack of liability caps",
        "Ambiguous termination rights ('whenever they want')",
        "Undefined payment terms leading to potential disputes"
    ],
    opportunities: [
        "Standardize payment to 'Net 30'",
        "Implement binding arbitration to reduce litigation cost",
        "Define specific venue to avoid jurisdiction shopping"
    ],
    threats: [
        "Uncapped exposure to consequential damages",
        "Risk of 'illusory promise' invalidating the contract"
    ]
};

export const SAMPLE_RECOMMENDATIONS: Recommendation[] = [
    {
        id: 101,
        section: '5. LIABILITY',
        severity: 'Critical',
        category: 'Risk Mitigation',
        title: 'Broad Liability Exclusion Unenforceable',
        roastTitle: 'This Liability Clause is a Joke',
        currentText: 'Provider is not responsible for anything bad that happens.',
        proposedText: "To the maximum extent permitted by applicable law, Provider's liability shall be limited to direct damages not exceeding the total fees paid by Client under this Agreement. In no event shall Provider be liable for consequential, incidental, or punitive damages.",
        legalBasis: 'U.C.C. § 2-719; Hadley v. Baxendale. Blanket exclusions are frequently struck down as unconscionable.',
        roastComment: 'LOL. "Not responsible for anything bad"? Did a 5-year-old write this? A judge would laugh this out of court before lunch. Fix it or lose your house.',
        scoreImpact: 15,
        citation: 'Smith v. DataCorp (2019)',
        accepted: false
    },
    {
        id: 102,
        section: '4. TERMINATION',
        severity: 'High',
        category: 'Contract Stability',
        title: 'Ambiguous Termination Clause',
        roastTitle: 'The "Ghosting" Clause',
        currentText: 'Either party can stop this agreement whenever they want.',
        proposedText: 'Either party may terminate this Agreement for convenience upon providing thirty (30) days prior written notice to the other party. Immediate termination is permitted for material breach after a ten (10) day cure period.',
        legalBasis: 'Prevents "illusory promise" claims. Courts require defined notice periods for mutuality.',
        roastComment: 'So they can just fire you on a Tuesday because they feel like it? Zero job security. This is an illusory promise, not a contract.',
        scoreImpact: 12,
        citation: 'Restatement (Second) of Contracts § 77',
        accepted: false
    },
    {
        id: 103,
        section: '2. PAYMENT',
        severity: 'Medium',
        category: 'Financial Terms',
        title: 'Vague Payment Triggers',
        roastTitle: 'The "Pay Me Maybe" Clause',
        currentText: 'Client will pay Provider money when the work is done.',
        proposedText: 'Client shall pay Provider the Fees within thirty (30) days of receipt of a valid invoice (Net 30). Late payments shall accrue interest at the lesser of 1.5% per month or the maximum rate permitted by law.',
        legalBasis: 'Commercial standard practice requires defined payment windows to establish breach.',
        roastComment: '"When work is done" is not a date. Do you want to get paid in 2035? Add Net 30 or start a charity.',
        scoreImpact: 8,
        citation: 'Standard Commercial Practice',
        accepted: false
    }
];
