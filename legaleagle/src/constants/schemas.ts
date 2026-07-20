export const RECOMMENDATION_SCHEMA = `{
  "section": "Section number and title from contract",
  "severity": "Critical" | "High" | "Medium" | "Low",
  "category": "Issue category (e.g., 'Risk Mitigation', 'Financial Terms', 'IP Rights', 'Termination Rights', 'Dispute Resolution', 'Compliance', 'Representations & Warranties')",
  "title": "Professional issue summary (formal, suitable for legal memo)",
  "roastTitle": "Memorable/snarky title (for engagement, optional)",
  "currentText": "EXACT verbatim text from document - must match precisely",
  "proposedText": "Complete legally robust rewrite ready for insertion",
  "legalBasis": "Detailed legal analysis citing: (1) Specific statutes (USC, state codes), (2) Case law with court and year, (3) Regulatory guidance where applicable, (4) Industry standards or best practices",
  "roastComment": "Plain English critique explaining why this is problematic (optional)",
  "scoreImpact": "15 for Critical, 10 for High, 5 for Medium, 2 for Low",
  "citation": "Primary legal authority (e.g., 'Delaware Court of Chancery, In re Appraisal of Dell Inc., 2020')"
}`;

export const SWOT_SCHEMA = `{
  "swot": {
    "strengths": [
      "List of contractual strengths and protective provisions",
      "Cite specific clauses that favor the client",
      "Note any advantageous terms achieved"
    ],
    "weaknesses": [
      "List of remaining vulnerabilities",
      "Unresolved ambiguities",
      "One-sided provisions against client"
    ],
    "opportunities": [
      "Negotiation leverage points",
      "Industry-standard improvements to propose",
      "Risk mitigation strategies available"
    ],
    "threats": [
      "Potential litigation exposure",
      "Regulatory compliance risks",
      "Enforcement challenges"
    ]
  }
}`;
