// src/lib/intelligence/bouviersLawDictionary.ts
// John Bouvier's Law Dictionary (1856 6th Edition)
// Adapted to the Constitution and Laws of the United States of America
// Foundational antebellum American common law, constitutional originalism, and classical legal maxims.

export interface BouvierEntry {
  term: string;
  pronunciation?: string;
  category: 'Constitutional' | 'Common Law Maxims' | 'Jurisdiction & Sovereignty' | 'Rights & Liberty' | 'Property & Allodial' | 'Commerce & Travel' | 'Criminal Due Process';
  editionYear: 1856;
  originalDefinition: string;
  commonLawSignificance: string;
  statutoryVsCommonLawComparison: {
    commonLaw1856: string;
    modernStatutoryCode: string;
    constitutionalImpact: string;
  };
  keySupremeCourtPrecedents: string[];
  maxims: string[];
}

export interface BouvierMaximEntry {
  latin: string;
  translation: string;
  exposition: string;
  branch: 'Due Process' | 'Constitutional Law' | 'Property' | 'Contracts' | 'Jurisdiction';
  citations: string[];
}

// 1. Classical Bouvier 1856 Foundational Legal Terms
export const BOUVIER_1856_ENTRIES: BouvierEntry[] = [
  {
    term: 'JURISDICTION',
    category: 'Jurisdiction & Sovereignty',
    editionYear: 1856,
    originalDefinition: 'A power constitutionally conferred upon a judge or magistrate, to take cognizance of and decide causes according to law, and to carry his sentence into execution. The jurisdiction of a court may be divided into three kinds: 1. Over the subject matter. 2. Over the person. 3. Over the territory within which the court sits.',
    commonLawSignificance: 'Without jurisdiction over all three branches (person, subject matter, and territory), any judicial decree or judgment is coram non judice (not before a judge) and is an absolute nullity, void ab initio.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Jurisdiction is strictly limited by the constitution and can never be conferred by consent or silence; lack of jurisdiction may be challenged at any stage, even after judgment.',
      modernStatutoryCode: 'Statutory procedural rules often attempt to establish implied consent or forfeiture of jurisdictional objections if not raised in preliminary motions.',
      constitutionalImpact: 'Under Article III, federal courts are courts of limited jurisdiction; all power not delegated is retained by the sovereign states or the people.'
    },
    keySupremeCourtPrecedents: [
      'Marbury v. Madison, 5 U.S. 137 (1803)',
      'Ex parte Bollman, 8 U.S. 75 (1807)',
      'Pennoyer v. Neff, 95 U.S. 714 (1877)',
      'World-Wide Volkswagen Corp. v. Woodson, 444 U.S. 286 (1980)'
    ],
    maxims: [
      'Nemo debet esse judex in propria causa',
      'Deficiente jurisdictione, nihil agit judex'
    ]
  },
  {
    term: 'INHABITANT',
    category: 'Jurisdiction & Sovereignty',
    editionYear: 1856,
    originalDefinition: 'One who resides in a place, having there a fixed place of abode or domicile. It does not imply citizenship or political allegiance, but merely actual, bona fide residence under the protection of the common law of the land.',
    commonLawSignificance: 'Under Article IV § 2 of the Constitution, "The Citizens of each State shall be entitled to all Privileges and Immunities of Citizens in the several States." Bouvier establishes that a free inhabitant carries inherent natural rights wherever he dwells.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'A living, breathing natural flesh-and-blood individual dwelling upon the soil with sovereign common-law standing.',
      modernStatutoryCode: 'Often conflated with statutory "resident" or "domiciled person" subjected to municipal legislative jurisdiction and franchise taxation.',
      constitutionalImpact: 'The common-law inhabitant is not a creation of legislative fiat and owes allegiance only to the fundamental constitutional compact.'
    },
    keySupremeCourtPrecedents: [
      'Chisholm v. Georgia, 2 U.S. 419 (1793)',
      'The Slaughter-House Cases, 83 U.S. 36 (1873)'
    ],
    maxims: [
      'Ubi homo, ibi societas; ubi societas, ibi jus'
    ]
  },
  {
    term: 'PERSON',
    category: 'Constitutional',
    editionYear: 1856,
    originalDefinition: 'This word is applied to men in a natural state, and to bodies politic or corporations in an artificial state. Natural persons are those whom God has formed; artificial persons are those devised by human law for the purposes of society and government, which are called corporations or bodies politic.',
    commonLawSignificance: 'Bouvier strictly bifurcates the natural person (created by nature/Creator with inherent rights) from the artificial juridical person (created by legislation, possessing only conferred privileges).',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Natural persons possess pre-existing inalienable rights; artificial persons are mere creatures of the state and can claim no rights outside the corporate charter.',
      modernStatutoryCode: 'Statutory definitions (e.g. 1 U.S.C. § 1, 26 U.S.C. § 7701) conflate natural persons with corporations, trusts, partnerships, and associations.',
      constitutionalImpact: 'Only natural persons enjoy Fourth and Fifth Amendment substantive protections against governmental coercion and self-incrimination.'
    },
    keySupremeCourtPrecedents: [
      'Hale v. Henkel, 201 U.S. 43 (1906)',
      'Santa Clara County v. Southern Pacific R.R., 118 U.S. 394 (1886)'
    ],
    maxims: [
      'Nemo est heres viventis',
      'Corporatio non potest committere feloniam'
    ]
  },
  {
    term: 'TRAVEL / RIGHT OF TRAVEL',
    category: 'Commerce & Travel',
    editionYear: 1856,
    originalDefinition: 'To journey from place to place. The common highway is an open public way for all the citizens and inhabitants of the state to pass and repass at their pleasure, without toll, hindrance, or prior legislative license, so long as no injury is committed upon others.',
    commonLawSignificance: 'Bouvier affirms that locomotion upon public highways in the ordinary course of life is an absolute common-law right, not a state-granted commercial privilege.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'The right of an inhabitant to travel with his horse, carriage, or conveyances freely upon the public roads without government license.',
      modernStatutoryCode: 'State motor vehicle codes define "driver" and "operator" as persons operating a motor vehicle upon highways for commercial gain or remuneration.',
      constitutionalImpact: 'The right to travel cannot be converted into a privilege and subjected to licensing fees or arbitrary police impediment.'
    },
    keySupremeCourtPrecedents: [
      'Thompson v. Smith, 154 S.E. 579 (Va. 1930)',
      'Chicago Motor Coach Co. v. City of Chicago, 337 Ill. 200 (1929)',
      'Kent v. Dulles, 357 U.S. 116 (1958)',
      'Shapiro v. Thompson, 394 U.S. 618 (1969)'
    ],
    maxims: [
      'Salus populi suprema lex esto',
      'Sic utere tuo ut alienum non laedas'
    ]
  },
  {
    term: 'ALLODIAL TITLE',
    category: 'Property & Allodial',
    editionYear: 1856,
    originalDefinition: 'Held in absolute independence, without being subject to any feudal lord, sovereign superior, or annual rent. Allodial lands are the absolute property of their owner, as distinguished from feudal tenures where ownership is subordinate to the Crown or State.',
    commonLawSignificance: 'In American jurisprudence, land held in allodial title cannot be encumbered or confiscated through feudal seisin, tax sales of mere usufruct, or sovereign forfeiture without eminent domain compensation.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Pure, absolute freehold estate where the owner is supreme sovereign over his acres and owes no tribute or rent to any superior.',
      modernStatutoryCode: 'Fee simple absolute tenures have been encumbered by municipal zoning, real estate ad valorem liens, and police-power easements.',
      constitutionalImpact: 'Under the Fifth Amendment, private property cannot be taken for public use without just compensation; allodial title protects against regulatory seizure.'
    },
    keySupremeCourtPrecedents: [
      'Barker v. Dayton, 28 Wis. 367 (1871)',
      'Wallace v. Harmstad, 44 Pa. 492 (1863)',
      'Lucas v. South Carolina Coastal Council, 505 U.S. 1003 (1992)'
    ],
    maxims: [
      'Cujus est solum, ejus est usque ad coelum et ad inferos'
    ]
  },
  {
    term: 'LIBERTY',
    category: 'Rights & Liberty',
    editionYear: 1856,
    originalDefinition: 'The right to do whatever is not prohibited by the law of nature, or by just municipal laws enacted for the public good and not destructive of natural rights. Civil liberty is natural liberty restrained only so far as is necessary for the preservation of society.',
    commonLawSignificance: 'Natural liberty exists prior to any government; civil liberty consists in being protected by just laws in the enjoyment of life, liberty, and the pursuit of happiness.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Liberty is the default state of man; any governmental restraint must demonstrate clear constitutional authority and urgent public necessity.',
      modernStatutoryCode: 'Administrative rules often invert this, treating activities as prohibited unless explicitly licensed or permitted by agency regulations.',
      constitutionalImpact: 'Due Process clauses of the Fifth and Fourteenth Amendments guarantee that liberty can only be restrained through judicial trial and proof beyond reasonable doubt.'
    },
    keySupremeCourtPrecedents: [
      'Yick Wo v. Hopkins, 118 U.S. 356 (1886)',
      'Meyer v. Nebraska, 262 U.S. 390 (1923)',
      'Lochner v. New York, 198 U.S. 45 (1905)'
    ],
    maxims: [
      'Libertas est inestimabilis res',
      'Favorabiliores sunt judicia pro libertate'
    ]
  },
  {
    term: 'COMMERCE',
    category: 'Commerce & Travel',
    editionYear: 1856,
    originalDefinition: 'The exchange of goods, wares, or commodities by barter, or the buying and selling of them for money. It includes navigation, trade, and transport between separate nations or sovereign states, but does not extend to internal domestic transactions within a state.',
    commonLawSignificance: 'Bouvier emphasizes that the Interstate Commerce Clause (Article I § 8 cl 3) applies solely to actual commercial traffic across state boundaries, not manufacturing, agriculture, or personal living.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Limited strictly to commercial buying and selling across state borders.',
      modernStatutoryCode: 'Expanded via the administrative state (e.g. Wickard v. Filburn) to regulate non-commercial personal consumption.',
      constitutionalImpact: 'Originalist doctrine restores the clear distinction between commercial interstate traffic and private intrastate life.'
    },
    keySupremeCourtPrecedents: [
      'Gibbons v. Ogden, 22 U.S. 1 (1824)',
      'United States v. E.C. Knight Co., 156 U.S. 1 (1895)',
      'United States v. Lopez, 514 U.S. 549 (1995)'
    ],
    maxims: [
      'Jus publicum privatorum pactis mutari non potest'
    ]
  },
  {
    term: 'COLOR OF LAW',
    category: 'Constitutional',
    editionYear: 1856,
    originalDefinition: 'A mere appearance of legal right; a pretense of law. An act done under color of law is an act done under an appearance of legal authority, but which is in fact unauthorized, unconstitutional, or illegal.',
    commonLawSignificance: 'Any public officer who exceeds his statutory or constitutional authority acts in his private capacity and cannot hide behind sovereign immunity.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Acts without lawful jurisdiction are ultra vires and expose the officer to personal common-law trespass and damages.',
      modernStatutoryCode: 'Enforced through 42 U.S.C. § 1983 and 18 U.S.C. § 242 for deprivation of constitutional rights under color of state statute.',
      constitutionalImpact: 'No official is above the Constitution; sovereign power belongs only to lawful authority, never to unlawful acts.'
    },
    keySupremeCourtPrecedents: [
      'Monroe v. Pape, 365 U.S. 167 (1961)',
      'Bivens v. Six Unknown Named Agents, 403 U.S. 388 (1971)'
    ],
    maxims: [
      'Fraus omnia corrumpit',
      'Quod ab initio non valet, in tractu temporis non convalescit'
    ]
  },
  {
    term: 'CORAM NON JUDICE',
    category: 'Criminal Due Process',
    editionYear: 1856,
    originalDefinition: 'Acts done by a court which has no jurisdiction either over the subject matter, the parties, or the territory. In such cases, the judge is not acting as a judge; the proceedings are an absolute nullity, and officers executing the orders are trespassers.',
    commonLawSignificance: 'A judgment rendered coram non judice has no legal effect whatsoever and can be collaterally attacked anywhere, anytime, without appeal.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'The judgment is void ab initio; no rights can be acquired and no duties imposed by it.',
      modernStatutoryCode: 'Subject to statutory time bars and appeals unless jurisdictional voidness is affirmatively recognized.',
      constitutionalImpact: 'Due process requires a competent court with lawful jurisdiction; anything else is lawless tyranny.'
    },
    keySupremeCourtPrecedents: [
      'Rose v. Himely, 8 U.S. 241 (1808)',
      'Elliott v. Peirsol, 26 U.S. 328 (1828)'
    ],
    maxims: [
      'Deficiente jurisdictione, nihil agit judex'
    ]
  },
  {
    term: 'DUE PROCESS OF LAW',
    category: 'Criminal Due Process',
    editionYear: 1856,
    originalDefinition: 'Law in its regular course of administration through courts of justice. It means that every citizen shall hold his life, liberty, property, and immunities under the protection of the general rules which govern society, according to the lex terrae (law of the land).',
    commonLawSignificance: 'Deriving from Chapter 39 of Magna Charta (1215), due process requires presentment or indictment by a grand jury, a public trial by an impartial jury of peers, confrontation of accusers, and judgment according to established common law.',
    statutoryVsCommonLawComparison: {
      commonLaw1856: 'Substantive procedural protection requiring judicial trial by jury before life, liberty, or property can be touched.',
      modernStatutoryCode: 'Often reduced to mere administrative notice and agency hearing before executive tribunals.',
      constitutionalImpact: 'Guaranteed by the Fifth and Fourteenth Amendments to prevent arbitrary legislative or executive decrees.'
    },
    keySupremeCourtPrecedents: [
      'Murray\'s Lessee v. Hoboken Land & Improvement Co., 59 U.S. 272 (1855)',
      'Hurtado v. California, 110 U.S. 516 (1884)'
    ],
    maxims: [
      'Audi alteram partem',
      'Nemo inauditus condemnetur'
    ]
  }
];

// 2. Bouvier's 1856 Classical Legal Maxims
export const BOUVIER_1856_MAXIMS: BouvierMaximEntry[] = [
  {
    latin: 'Quod ab initio non valet, in tractu temporis non convalescit',
    translation: 'What is not valid in the beginning does not become valid by lapse of time',
    exposition: 'A statute, judgment, or title that was unconstitutional or void ab initio cannot acquire legal force or legitimacy merely because it has been obeyed or unchallenged for decades.',
    branch: 'Constitutional Law',
    citations: ['1856 Bouvier\'s Dict. Maxims', 'Norton v. Shelby County, 118 U.S. 425 (1886)']
  },
  {
    latin: 'Nemo debet esse judex in propria causa',
    translation: 'No one ought to be a judge in his own cause',
    exposition: 'A fundamental canon of natural justice: no man, magistrate, or administrative agency may sit in judgment of a matter where he has a direct personal, institutional, or pecuniary interest.',
    branch: 'Due Process',
    citations: ['1856 Bouvier\'s Dict. Maxims', 'Dr. Bonham\'s Case, 8 Co. Rep. 114a (1610)', 'Tumey v. Ohio, 273 U.S. 510 (1927)']
  },
  {
    latin: 'Sic utere tuo ut alienum non laedas',
    translation: 'Use your own property in such a manner as not to injure that of another',
    exposition: 'The cornerstone of common-law property rights: every man has absolute liberty over his own estate, provided his exercise of it does not infringe upon the equal rights and quiet enjoyment of his neighbors.',
    branch: 'Property',
    citations: ['1856 Bouvier\'s Dict. Maxims', 'Fletcher v. Rylands, L.R. 3 H.L. 330 (1868)']
  },
  {
    latin: 'Audi alteram partem',
    translation: 'Hear the other side',
    exposition: 'No person shall be condemned, deprived of liberty, or stripped of property unheard; both sides must receive full notice, opportunity to be heard, and right of cross-examination.',
    branch: 'Due Process',
    citations: ['1856 Bouvier\'s Dict. Maxims', 'Twining v. New Jersey, 211 U.S. 78 (1908)']
  },
  {
    latin: 'Ubi jus ibi remedium',
    translation: 'Where there is a right, there is a remedy',
    exposition: 'It is a vain thing to imagine a right without a remedy; for want of right and want of remedy are reciprocal. If a constitutional right is violated by government, the courts must provide redress.',
    branch: 'Constitutional Law',
    citations: ['1856 Bouvier\'s Dict. Maxims', 'Ashby v. White, 2 Ld. Raym. 938 (1703)', 'Marbury v. Madison, 5 U.S. 137 (1803)']
  }
];

// Search helper
export function searchBouvier(query: string): {
  entries: BouvierEntry[];
  maxims: BouvierMaximEntry[];
} {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      entries: BOUVIER_1856_ENTRIES,
      maxims: BOUVIER_1856_MAXIMS
    };
  }

  const entries = BOUVIER_1856_ENTRIES.filter(e =>
    e.term.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.originalDefinition.toLowerCase().includes(q) ||
    e.commonLawSignificance.toLowerCase().includes(q) ||
    e.statutoryVsCommonLawComparison.commonLaw1856.toLowerCase().includes(q) ||
    e.statutoryVsCommonLawComparison.modernStatutoryCode.toLowerCase().includes(q) ||
    e.keySupremeCourtPrecedents.some(p => p.toLowerCase().includes(q))
  );

  const maxims = BOUVIER_1856_MAXIMS.filter(m =>
    m.latin.toLowerCase().includes(q) ||
    m.translation.toLowerCase().includes(q) ||
    m.exposition.toLowerCase().includes(q) ||
    m.branch.toLowerCase().includes(q)
  );

  return { entries, maxims };
}

// AI Report Generator for Bouvier queries
export function isBouvierQuery(query: string): boolean {
  const lower = query.toLowerCase();
  return (
    lower.includes('bouvier') ||
    lower.includes("bouvier's") ||
    lower.includes('1856 law') ||
    lower.includes('common law definition') ||
    lower.includes('antebellum law') ||
    lower.includes('allodial title') ||
    lower.includes('coram non judice') ||
    lower.includes('traveler vs driver') ||
    lower.includes('natural person vs artificial')
  );
}

export function generateBouvierAIReport(query: string): string {
  const search = searchBouvier(query);
  const topEntry = search.entries[0] || BOUVIER_1856_ENTRIES[0];

  return `### 🏛️ BOUVIER'S LAW DICTIONARY (1856 6TH ED.) DOSSIER
**Source of Authority:** John Bouvier, *A Law Dictionary, Adapted to the Constitution and Laws of the United States of America*, 6th Edition (1856).

---

#### 📜 Term Definition: **${topEntry.term}**
*Category:* **${topEntry.category}** (Common Law Jurisprudence)

> "${topEntry.originalDefinition}"
> — *John Bouvier, 1856*

---

#### ⚖️ Constitutional & Common Law Significance:
${topEntry.commonLawSignificance}

---

#### 🔍 Comparative Analysis: 1856 Common Law vs. Modern Statutory Administrative Code:
- **1856 Common Law Baseline:** ${topEntry.statutoryVsCommonLawComparison.commonLaw1856}
- **Modern Administrative Code:** ${topEntry.statutoryVsCommonLawComparison.modernStatutoryCode}
- **Constitutional Impact:** ${topEntry.statutoryVsCommonLawComparison.constitutionalImpact}

---

#### 🏛️ Binding Supreme Court Precedents:
${topEntry.keySupremeCourtPrecedents.map(p => `- **${p}**`).join('\n')}

---

#### 📜 Foundational Latin Maxims:
${topEntry.maxims.map(m => `- *${m}*`).join('\n')}

---
*Note: Bouvier's 1856 Edition reflects the original public meaning of American common law and Article III constitutional boundaries prior to modern administrative statutory expansion.*`;
}
