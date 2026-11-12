// Sphinx Tactical Legal Defense & Police Encounter Intelligence Engine
// Comprehensive legal knowledge base covering US Federal Law, Constitutional Rights,
// 50-State Statutory Codes (Traffic & Criminal), Police Stop Protocols, Ticket Dismissals,
// Radar/LIDAR Calibration Defenses, and International Human Rights Frameworks.

import type { AIResponse, MapContext } from './aiClient';

export interface StateLegalProfile {
  code: string;
  name: string;
  hasStopAndId: boolean;
  stopAndIdStatute: string;
  stopAndIdSummary: string;
  passengerIdRequired: boolean;
  passengerIdRule: string;
  recordingConsent: 'one-party' | 'two-party';
  recordingPoliceRule: string;
  speedingCode: string;
  speedingDefense: string;
  speedTrapLaw: string;
  duiImpliedConsentCode: string;
  duiFieldSobrietyRule: string;
  writtenDeclarationAllowed: boolean;
  courtTactics: string[];
}

export interface FederalPrecedent {
  caseName: string;
  citation: string;
  year: number;
  coreDoctrine: string;
  fieldApplication: string;
}

export interface EncounterScript {
  category: string;
  script: string;
  legalBasis: string;
  recommendedTone: string;
  pitfallsToAvoid: string;
}

// 1. Core Federal Constitutional Precedents
export const FEDERAL_LEGAL_PRECEDENTS: FederalPrecedent[] = [
  {
    caseName: 'Terry v. Ohio',
    citation: '392 U.S. 1',
    year: 1968,
    coreDoctrine: 'Reasonable Articulable Suspicion (RAS) required for temporary investigative detention and frisk for weapons.',
    fieldApplication: 'Officers cannot detain you or pat you down on a hunch. They must have specific, articulable facts that criminal activity is afoot and you are armed and dangerous.'
  },
  {
    caseName: 'Rodriguez v. United States',
    citation: '575 U.S. 348',
    year: 2015,
    coreDoctrine: 'Traffic stop cannot be prolonged beyond the time reasonably required to address the traffic infraction that prompted the stop.',
    fieldApplication: 'Police cannot prolong a traffic stop to conduct dog sniffs or fish for contraband without independent reasonable suspicion. Any delay invalidates subsequent searches.'
  },
  {
    caseName: 'Pennsylvania v. Mimms',
    citation: '434 U.S. 106',
    year: 1977,
    coreDoctrine: 'Officers may order a driver out of a vehicle during a lawful traffic stop for officer safety.',
    fieldApplication: 'You must comply if ordered out of the vehicle. However, exiting the vehicle does NOT grant the officer authority to search the interior of your vehicle.'
  },
  {
    caseName: 'Maryland v. Wilson',
    citation: '519 U.S. 408',
    year: 1997,
    coreDoctrine: 'Officers may order passengers to exit the vehicle during a lawful traffic stop.',
    fieldApplication: 'Passengers must exit if ordered, but passengers are NOT required to answer interrogation or produce ID in non-Stop-and-ID states unless suspected of independent crime.'
  },
  {
    caseName: 'Arizona v. Gant',
    citation: '556 U.S. 332',
    year: 2009,
    coreDoctrine: 'Search Incident to Arrest (SITA) of a vehicle interior is only lawful if arrestee is unsecured and within reaching distance, or if reasonable to believe evidence of the arrest crime is inside.',
    fieldApplication: 'If you are arrested for traffic or suspended license and handcuffed in a patrol cruiser, police CANNOT search your vehicle under SITA without a separate warrant or probable cause.'
  },
  {
    caseName: 'Carroll v. United States',
    citation: '267 U.S. 132',
    year: 1925,
    coreDoctrine: 'Automobile Exception allows warrantless search of a vehicle ONLY IF police possess probable cause that contraband or evidence of crime is inside.',
    fieldApplication: 'Probable cause requires concrete, verifiable facts—not an officer’s generic suspicion or refusal of consent. Refusing consent NEVER creates probable cause.'
  },
  {
    caseName: 'Salinas v. Texas',
    citation: '570 U.S. 178',
    year: 2013,
    coreDoctrine: 'Fifth Amendment protection against self-incrimination is NOT self-executing in non-custodial encounters; silence alone does not invoke it.',
    fieldApplication: 'You must verbally and explicitly invoke your right: "I am invoking my Fifth Amendment right to remain silent and will not answer questions without counsel present."'
  },
  {
    caseName: 'Edwards v. Arizona',
    citation: '451 U.S. 477',
    year: 1981,
    coreDoctrine: 'Once an accused invokes the Sixth Amendment right to counsel, all interrogation must immediately cease until counsel is made available.',
    fieldApplication: 'Unequivocal declaration: "I want an attorney. I will not speak without my lawyer present." Officers must immediately cease questioning.'
  },
  {
    caseName: 'Riley v. California',
    citation: '573 U.S. 373',
    year: 2014,
    coreDoctrine: 'Police cannot search the digital contents of a cell phone seized incident to an arrest without an explicit search warrant.',
    fieldApplication: 'Police cannot force you to unlock your phone or browse your device during a stop or arrest without a signed warrant. Never give PIN or biometric unlock consent.'
  },
  {
    caseName: 'Glik v. Cunniffe / Fields v. City of Philadelphia',
    citation: '655 F.3d 78 (1st Cir. 2011) / 862 F.3d 353 (3rd Cir. 2017)',
    year: 2011,
    coreDoctrine: 'The First Amendment protects the right of individuals to videotape and record police officers performing official duties in public spaces.',
    fieldApplication: 'You have an absolute constitutional right to record police in public as long as you do not physically obstruct their duties. Police cannot order you to stop or delete video.'
  }
];

// 2. Comprehensive 50-State + DC Legal Matrix
export const STATE_LEGAL_DATABASE: Record<string, StateLegalProfile> = {
  AL: {
    code: 'AL',
    name: 'Alabama',
    hasStopAndId: true,
    stopAndIdStatute: 'Ala. Code § 15-5-30',
    stopAndIdSummary: 'Police officer may stop any person in a public place whom he reasonably suspects is committing, has committed, or is about to commit a felony or other public offense, and may demand his name, address, and an explanation of his actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers are not required to provide ID unless officer has independent reasonable suspicion of criminal conduct by that passenger.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent state. Filming police in public performing official duties is fully protected under 1st Amendment (Smith v. City of Cumming).',
    speedingCode: 'Ala. Code § 32-5A-170 (Basic Speed Rule)',
    speedingDefense: 'Reasonable and prudent speed defense under prevailing conditions; calibration check of radar tuning forks within 6 months.',
    speedTrapLaw: 'Ala. Code § 11-43-5 (Municipal speed enforcement limits).',
    duiImpliedConsentCode: 'Ala. Code § 32-5A-194',
    duiFieldSobrietyRule: 'Standardized Field Sobriety Tests (SFSTs) are voluntary. Implied consent applies to chemical breath/blood tests at police station after lawful arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena radar calibration and technician FCC licenses', 'Motion for discovery of officer bodycam and cruiser dashcam', 'Challenge reasonable suspicion for initial stop under Rodriguez doctrine']
  },
  AK: {
    code: 'AK',
    name: 'Alaska',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No state statute requiring individuals to identify themselves during a pedestrian stop or Terry stop without lawful arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify unless suspected of a separate criminal infraction.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; public recording of peace officers is constitutionally protected.',
    speedingCode: '13 AAC 02.275 (Basic Speed Rule)',
    speedingDefense: 'Weather and surface traction justification; radar beam angle/cosine error defense.',
    speedTrapLaw: 'Strict speed signage requirements under Alaska DOT regulations.',
    duiImpliedConsentCode: 'AS § 28.35.031',
    duiFieldSobrietyRule: 'Roadside SFSTs are non-mandatory. Chemical station tests carry administrative license penalties upon refusal after arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request calibration log and maintenance records of LIDAR/radar unit', 'Challenge traffic stop duration under Rodriguez v. US']
  },
  AZ: {
    code: 'AZ',
    name: 'Arizona',
    hasStopAndId: true,
    stopAndIdStatute: 'A.R.S. § 13-2412',
    stopAndIdSummary: 'It is unlawful for a person to fail to state their true full name after being lawfully detained. However, the officer must have reasonable suspicion of criminal activity before detaining.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers must provide full name ONLY IF lawfully detained based on reasonable suspicion of a crime. If only the driver committed a traffic infraction, passengers are not required to identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent. A recent law restricting recording within 8 feet was struck down as unconstitutional by federal court in 2023.',
    speedingCode: 'A.R.S. § 28-701.02 (Excessive Speed) & § 28-701 (Reasonable and Prudent)',
    speedingDefense: 'Prima facie speed limits: speed must be greater than reasonable and prudent under existing conditions. Photo radar tickets require verified personal service or formal waiver.',
    speedTrapLaw: 'A.R.S. § 28-702 (Engineering studies required for reduced speed zones).',
    duiImpliedConsentCode: 'A.R.S. § 28-1321 (Strict implied consent; 1-year administrative license suspension on refusal).',
    duiFieldSobrietyRule: 'Roadside tests (eye nystagmus, walk-and-turn) are strictly voluntary. Refuse politely: "I decline roadside physical evaluations."',
    writtenDeclarationAllowed: true,
    courtTactics: ['Challenge photo radar service validity (service by certified mail is insufficient unless signed receipt returned)', 'Request officer LIDAR certification under AZ POST standards', 'Defensive Driving School dismissal option for civil traffic citations']
  },
  AR: {
    code: 'AR',
    name: 'Arkansas',
    hasStopAndId: true,
    stopAndIdStatute: 'Ark. Code Ann. § 5-71-213 & Rule 2.2',
    stopAndIdSummary: 'Officer may request identification upon reasonable suspicion of criminal conduct or loitering.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to identify unless independent suspicion arises.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording police performing official duties in public is lawful.',
    speedingCode: 'Ark. Code Ann. § 27-51-201',
    speedingDefense: 'Challenge radar calibration certificates and visual estimation verification.',
    speedTrapLaw: 'Act 1271 (Audits municipalities where traffic fines exceed 30% of municipal budget).',
    duiImpliedConsentCode: 'Ark. Code Ann. § 5-65-202',
    duiFieldSobrietyRule: 'Preliminary field tests voluntary. Chemical test refusal carries automatic license suspension.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Verify municipal ticket quota compliance under Act 1271', 'Check radar tuning fork calibration test logs before and after shift']
  },
  CA: {
    code: 'CA',
    name: 'California',
    hasStopAndId: false,
    stopAndIdStatute: 'No general Stop-and-ID statute (Penal Code § 148 applies only to willful obstruction of lawful duties).',
    stopAndIdSummary: 'Pedestrians and individuals in California are NOT required by statute to identify themselves or present ID unless lawfully arrested. Drivers of vehicles MUST present license, registration, and insurance upon lawful stop (CVC § 12951 & § 4462).',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers are NEVER required to provide identification or state their names during a traffic stop unless the officer has independent reasonable suspicion that the passenger has committed a crime (People v. Spicer).',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Cal. Penal Code § 632 exempts public communications where there is no reasonable expectation of privacy. Cal. Penal Code § 148(g) explicitly states: The fact that a person was recording a peace officer does NOT constitute obstruction or resistance.',
    speedingCode: 'Cal. Vehicle Code § 22350 (Basic Speed Law), § 22349 (Maximum Speed 65mph), § 22356 (70mph)',
    speedingDefense: 'CVC § 40802 SPEED TRAP DEFENSE: Under California law, any speed enforcement using radar, laser, or electronic device on a street where the prima facie limit is not supported by an Engineering and Traffic Survey (ETS) conducted within 5-10 years is an ILLEGAL SPEED TRAP. Under CVC § 40803 & § 40804, speed trap evidence is INADMISSIBLE and the court HAS NO JURISDICTION.',
    speedTrapLaw: 'Cal. Vehicle Code § 40802 & § 40803 (Strict inadmissibility of speed trap radar evidence).',
    duiImpliedConsentCode: 'Cal. Vehicle Code § 23612',
    duiFieldSobrietyRule: 'Preliminary Alcohol Screening (PAS) handheld breath tests and Field Sobriety Tests are STRICTLY VOLUNTARY for non-probationary drivers 21+ (CVC § 23612(h)). Chemical breath or blood test at the station is required ONLY AFTER lawful arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: [
      'TRIAL BY WRITTEN DECLARATION (CVC § 40902): File written defense by mail; if officer fails to submit declaration, ticket is dismissed automatically with full bail refund',
      'TRIAL DE NOVO (CVC § 40903): If written declaration is lost, you have an absolute statutory right to request a completely new in-person trial from scratch',
      'Demand Engineering and Traffic Survey (ETS) under CVC § 40802 to trigger mandatory speed trap dismissal',
      'Subpoena officer radar/LIDAR calibration certificate and 80-hour radar training certificate under POST guidelines'
    ]
  },
  CO: {
    code: 'CO',
    name: 'Colorado',
    hasStopAndId: true,
    stopAndIdStatute: 'Colo. Rev. Stat. § 16-3-103',
    stopAndIdSummary: 'A peace officer may stop any person who he reasonably suspects is committing, has committed, or is about to commit a crime and may require him to give his name and address and an explanation of his actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify unless independent reasonable suspicion exists.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'Colo. Rev. Stat. § 16-3-311 explicitly guarantees right to record police and provides civil statutory damages ($15,000+) if an officer seizes phone or retaliates.',
    speedingCode: 'C.R.S. § 42-4-1101 (Speed Limits)',
    speedingDefense: 'Reasonable and prudent speed defense; verification of speed measurement device calibration records.',
    speedTrapLaw: 'C.R.S. § 42-4-1102 (Local authority speed regulation rules).',
    duiImpliedConsentCode: 'C.R.S. § 42-4-1301.1 (Express Consent Law)',
    duiFieldSobrietyRule: 'Roadside maneuvers are voluntary. Express Consent applies to chemical blood/breath testing post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Invoke CRS § 16-3-311 if officer attempted to interfere with recording', 'Subpoena Body Worn Camera (BWC) footage under SB 20-217 mandatory release rules']
  },
  CT: {
    code: 'CT',
    name: 'Connecticut',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID during traffic stops.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police encounters is legally protected.',
    speedingCode: 'Conn. Gen. Stat. § 14-218a (Traveling Unreasonably Fast) & § 14-219 (Speeding)',
    speedingDefense: 'Challenge radar unit frequency certificate and tuning fork test within 24 hours.',
    speedTrapLaw: 'State Traffic Commission regulation compliance.',
    duiImpliedConsentCode: 'Conn. Gen. Stat. § 14-227b',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Station chemical test required post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Plea by mail or online through Centralized Infractions Bureau (CIB)', 'Motion for discovery of radar maintenance log']
  },
  DE: {
    code: 'DE',
    name: 'Delaware',
    hasStopAndId: true,
    stopAndIdStatute: '11 Del. C. § 1902',
    stopAndIdSummary: 'A peace officer may stop any person abroad who he has reasonable ground to suspect is committing, has committed, or is about to commit a crime, and may demand the person\'s name, address, business abroad, and destination.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not subject to 1902 unless individual suspicion exists.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent for audio; recording police in public is protected.',
    speedingCode: '21 Del. C. § 4169',
    speedingDefense: 'Safe speed for conditions defense; electronic speed measuring device certification.',
    speedTrapLaw: 'Delaware Title 21 § 4170.',
    duiImpliedConsentCode: '21 Del. C. § 2740',
    duiFieldSobrietyRule: 'SFSTs voluntary. Implied consent applies post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request Justice of the Peace court trial with full discovery demand']
  },
  FL: {
    code: 'FL',
    name: 'Florida',
    hasStopAndId: true,
    stopAndIdStatute: 'Fla. Stat. § 901.151 (Florida Stop and Frisk Law)',
    stopAndIdSummary: 'Whenever any law enforcement officer encounters any person under circumstances which reasonably indicate that such person has committed, is committing, or is about to commit a violation of criminal laws, the officer may temporarily detain such person to ascertain his identity.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers are NOT required to provide identification during a routine traffic stop unless the officer has reasonable suspicion of criminal activity by the passenger (State v. Ramos, Florida 3d DCA).',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Fla. Stat. § 934.03. Filming police in public performing official duties is fully protected by 1st Amendment; police in public have no reasonable expectation of privacy (State v. Ingraham; Ford v. City of Boynton Beach).',
    speedingCode: 'Fla. Stat. § 316.183 (Unlawful Speed) & § 316.187',
    speedingDefense: 'FLORIDA SPEED DEFENSE UNDER RULE 15B-2: Florida Department of Highway Safety and Motor Vehicles has strict testing requirements. Visual estimation must be substantiated; radar/laser must have daily calibration logbook and bench calibration by certified testing lab within 6 months.',
    speedTrapLaw: 'Fla. Stat. § 316.1893 (Speed enforcement limits).',
    duiImpliedConsentCode: 'Fla. Stat. § 316.1932',
    duiFieldSobrietyRule: 'Roadside physical tests (SFSTs) are completely VOLUNTARY. You cannot be arrested solely for refusing field sobriety tests. Station breath test required post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: [
      'Demand Rule 15B-2 radar/laser certificate of testing by an approved testing laboratory within 6 months',
      'Submit Affidavit of Defense under Florida Rules of Traffic Court Rule 6.340 if unable to appear in person',
      'Request dismissal if officer fails to bring speed device daily logbook to hearing'
    ]
  },
  GA: {
    code: 'GA',
    name: 'Georgia',
    hasStopAndId: true,
    stopAndIdStatute: 'O.C.G.A. § 16-11-36 (Loitering and Prowling statute requires explanation of presence/identification upon suspicion).',
    stopAndIdSummary: 'Officers can request identification during lawful Terry stops; failure to identify under loitering/prowling circumstances can be charged.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers are not required to produce ID unless suspected of independent criminal activity.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police duties is firmly protected.',
    speedingCode: 'O.C.G.A. § 40-6-180 (Basic) & § 40-6-181 (Maximum)',
    speedingDefense: 'GEORGIA STRICT RADAR LIMITATION STATUTE (O.C.G.A. § 40-14-1 through 40-14-9): County and city police CANNOT write speeding tickets for speeds less than 10 mph over the speed limit (except in school zones, historic districts, or work zones). Agencies must hold valid Speed Detection Permits. No citations on grades greater than 7% slope. Devices must be tested daily with tuning forks.',
    speedTrapLaw: 'O.C.G.A. § 40-14-6 (Speed detection device permits suspended if used for revenue generation).',
    duiImpliedConsentCode: 'O.C.G.A. § 40-5-67.1',
    duiFieldSobrietyRule: 'Roadside field evaluations voluntary. Implied consent notice must be read immediately post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: [
      'Challenge municipality compliance with O.C.G.A. § 40-14-8 (10mph threshold exemption for local police)',
      'Inspect agency Speed Detection Permit from Georgia Department of Public Safety',
      'Demand verification of road slope angle (must not exceed 7% under O.C.G.A. § 40-14-9)'
    ]
  },
  HI: {
    code: 'HI',
    name: 'Hawaii',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to provide ID during Terry stop without lawful arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not obligated to provide identification.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording police in public spaces is protected.',
    speedingCode: 'HRS § 291C-102 (Noncompliance with speed limit) & § 291C-105 (Excessive Speed)',
    speedingDefense: 'Reasonable speed defense; laser calibration logbook inspection.',
    speedTrapLaw: 'Hawaii Department of Transportation speed zone requirements.',
    duiImpliedConsentCode: 'HRS § 291E-65',
    duiFieldSobrietyRule: 'SFSTs voluntary. Station chemical test mandatory post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Contest citation by written statement under District Court Traffic Rules Rule 14']
  },
  ID: {
    code: 'ID',
    name: 'Idaho',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'Individuals not required to identify unless under lawful arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Idaho Code § 49-654 (Basic Rule and Maximum Limits)',
    speedingDefense: 'Reasonable and prudent speed defense; radar certification check.',
    speedTrapLaw: 'Idaho Code § 49-658.',
    duiImpliedConsentCode: 'Idaho Code § 18-8002',
    duiFieldSobrietyRule: 'Field sobriety tests voluntary. Chemical test refusal carries administrative penalties.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena maintenance and calibration logs for radar unit']
  },
  IL: {
    code: 'IL',
    name: 'Illinois',
    hasStopAndId: true,
    stopAndIdStatute: '725 ILCS 5/107-14 (Temporary questioning without arrest)',
    stopAndIdSummary: 'A peace officer may stop any person in a public place whom the officer reasonably suspects is committing, has committed, or is about to commit a crime, and may demand the person\'s name, address, and an explanation of actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers in vehicle stops are not required to provide identification unless the officer has independent reasonable suspicion of criminal conduct by that passenger.',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'The Illinois Supreme Court in People v. Melongo (2014) and 7th Circuit in ACLU v. Alvarez struck down eavesdropping laws as applied to recording police in public. Recording police performing official duties is fully legal.',
    speedingCode: '625 ILCS 5/11-601 (General Speed Restrictions) & 625 ILCS 5/11-601.5 (Aggravated Speeding 26+ mph is Class B/A misdemeanor)',
    speedingDefense: 'Engineering speed study check; tuning fork test before and after patrol shift; officer LIDAR certification.',
    speedTrapLaw: 'Illinois Highway Code § 5-408.',
    duiImpliedConsentCode: '625 ILCS 5/11-501.1 (Statutory Summary Suspension)',
    duiFieldSobrietyRule: 'Preliminary Breath Test (PBT) and roadside SFSTs are voluntary. Station breathalyzer refusal triggers statutory summary suspension.',
    writtenDeclarationAllowed: false,
    courtTactics: [
      'Request Court Supervision under 730 ILCS 5/5-6-1 to avoid conviction on driving record',
      'If charged with Aggravated Speeding (26+ mph), negotiate reduction below 26 mph to remove misdemeanor criminal exposure',
      'Demand squad car forward dashcam and officer bodycam footage'
    ]
  },
  IN: {
    code: 'IN',
    name: 'Indiana',
    hasStopAndId: true,
    stopAndIdStatute: 'Ind. Code § 34-28-5-3.5',
    stopAndIdSummary: 'A person who knowingly or intentionally refuses to provide either the person\'s name, address, and date of birth, or driver\'s license, if in possession, commits a Class C misdemeanor, provided the officer has reasonable suspicion of an infraction or ordinance violation.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers must provide identifying info only if suspected of an infraction.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent. Indiana 25-foot buffer law passed in 2023 allows officers to order individuals 25 feet back, but does not prohibit recording.',
    speedingCode: 'Ind. Code § 9-21-5-1',
    speedingDefense: 'Reasonable speed defense; laser certification verification.',
    speedTrapLaw: 'Ind. Code § 9-21-5-12.',
    duiImpliedConsentCode: 'Ind. Code § 9-30-6-1',
    duiFieldSobrietyRule: 'SFSTs voluntary. Refusal of chemical test brings 1-year license suspension.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Challenge 25-foot buffer enforcement if officer approached the recorder rather than recorder encroaching', 'Subpoena radar calibration records']
  },
  IA: {
    code: 'IA',
    name: 'Iowa',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to show ID on Terry stop without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID unless separate crime suspected.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; public recording protected.',
    speedingCode: 'Iowa Code § 321.285',
    speedingDefense: 'Automated speed camera challenges (must prove driver identity under recent state court rulings).',
    speedTrapLaw: 'Iowa DOT speed enforcement guidelines.',
    duiImpliedConsentCode: 'Iowa Code § 321J.6',
    duiFieldSobrietyRule: 'PBT and roadside tests voluntary. Post-arrest chemical testing required.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Contest automated photo speed tickets on driver identification grounds']
  },
  KS: {
    code: 'KS',
    name: 'Kansas',
    hasStopAndId: true,
    stopAndIdStatute: 'K.S.A. § 22-2402',
    stopAndIdSummary: 'Officer may stop any person abroad whom he reasonably suspects is committing or has committed a crime, and demand name, address, and explanation of actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not subject to 22-2402 without individual reasonable suspicion.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'K.S.A. § 8-1558 & § 8-1557',
    speedingDefense: 'Basic speed defense; radar logbook verification.',
    speedTrapLaw: 'K.S.A. § 8-1560.',
    duiImpliedConsentCode: 'K.S.A. § 8-1001',
    duiFieldSobrietyRule: 'SFSTs voluntary. Chemical testing required post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request discovery for radar tuning fork certifications']
  },
  KY: {
    code: 'KY',
    name: 'Kentucky',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No general statutory requirement to present ID during Terry stop without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; filming in public is lawful.',
    speedingCode: 'KRS § 189.390',
    speedingDefense: 'Prudent speed defense; radar calibration records inspection.',
    speedTrapLaw: 'Kentucky Transportation Cabinet regulations.',
    duiImpliedConsentCode: 'KRS § 189A.103',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena cruiser calibration records']
  },
  LA: {
    code: 'LA',
    name: 'Louisiana',
    hasStopAndId: true,
    stopAndIdStatute: 'La. Code Crim. Proc. Ann. art. 215.1',
    stopAndIdSummary: 'Law enforcement officer may stop a person in a public place whom he reasonably suspects is committing, has committed, or is about to commit an offense and may demand his name, address, and an explanation of his actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID unless independent suspicion exists.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; 1st Amendment protects filming police.',
    speedingCode: 'La. R.S. § 32:61 & § 32:64',
    speedingDefense: 'Challenge electronic device accuracy certificate.',
    speedTrapLaw: 'La. R.S. § 32:64.1.',
    duiImpliedConsentCode: 'La. R.S. § 32:661',
    duiFieldSobrietyRule: 'Field sobriety tests voluntary. Chemical tests applied post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Check small-town speed traps for compliance with state DOT speed survey regulations']
  },
  ME: {
    code: 'ME',
    name: 'Maine',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No statutory obligation to identify during Terry stops without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: '29-A M.R.S. § 2073 (Reasonable and Prudent)',
    speedingDefense: 'Safe speed for conditions; radar beam divergence check.',
    speedTrapLaw: 'Maine DOT regulations.',
    duiImpliedConsentCode: '29-A M.R.S. § 2521',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Contest by mail or through Traffic Violations Bureau']
  },
  MD: {
    code: 'MD',
    name: 'Maryland',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during investigative detention without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify.',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Two-party wiretap state, BUT Maryland courts have repeatedly ruled that police officers performing duties in public have no expectation of privacy; recording is lawful (Snyder v. Phelps; 4th Cir. precedents).',
    speedingCode: 'Md. Transportation Code § 21-801',
    speedingDefense: 'Automated speed camera calibration challenge (must prove calibration certificate within 30 days).',
    speedTrapLaw: 'Md. Transportation Code § 21-809 (Speed monitoring system regulations).',
    duiImpliedConsentCode: 'Md. Transportation Code § 16-205.1',
    duiFieldSobrietyRule: 'SFSTs voluntary. Post-arrest breath test required.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Request trial waiver or written hearing option', 'Subpoena automated speed camera technician certificate']
  },
  MA: {
    code: 'MA',
    name: 'Massachusetts',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID during traffic stop (Commonwealth v. Washington).',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Two-party wiretap law (M.G.L. c. 272 § 99) explicitly held unconstitutional as applied to filming police in public by First Circuit in Glik v. Cunniffe (2011). Open recording of police is constitutionally protected.',
    speedingCode: 'M.G.L. c. 90 § 17 (Speeding) & § 18',
    speedingDefense: 'Reasonable and proper speed defense; radar log subpoena.',
    speedTrapLaw: 'M.G.L. c. 90 § 18.',
    duiImpliedConsentCode: 'M.G.L. c. 90 § 24',
    duiFieldSobrietyRule: 'Field sobriety tests are voluntary. Refusal of FSTs cannot be used against you at criminal trial in Massachusetts.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Appeal civil motor vehicle citation to clerk magistrate hearing', 'Request de novo judicial hearing before District Court judge if magistrate rules against you']
  },
  MI: {
    code: 'MI',
    name: 'Michigan',
    hasStopAndId: false,
    stopAndIdStatute: 'No general Stop-and-Identify statute',
    stopAndIdSummary: 'No state statute requiring identification during Terry stop without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not obligated to identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; filming police in public is lawful.',
    speedingCode: 'MCL § 257.627 (Basic Speed Law)',
    speedingDefense: 'Reasonable and proper speed defense; radar calibration verification.',
    speedTrapLaw: 'MCL § 257.628 (Speed limits based on 85th percentile engineering study).',
    duiImpliedConsentCode: 'MCL § 257.625c',
    duiFieldSobrietyRule: 'Preliminary breath test refusal is a civil infraction; roadside SFSTs voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Informal hearing before magistrate followed by formal de novo hearing with judge if necessary']
  },
  MN: {
    code: 'MN',
    name: 'Minnesota',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'Individuals not required to identify without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Minn. Stat. § 169.14',
    speedingDefense: 'Reasonable and prudent speed; statutory speed survey compliance.',
    speedTrapLaw: 'Minn. Stat. § 169.14 Subd. 5.',
    duiImpliedConsentCode: 'Minn. Stat. § 169A.51',
    duiFieldSobrietyRule: 'Roadside tests voluntary. Chemical test refusal is a crime in MN, but only after lawful arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request hearing in conciliation/district court', 'Subpoena radar tuning fork test records']
  },
  MS: {
    code: 'MS',
    name: 'Mississippi',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Miss. Code Ann. § 63-3-501',
    speedingDefense: 'MISSISSIPPI RADAR LIMITATION: In Mississippi, local municipal police cannot use radar unless the municipality meets specific population requirements (Miss. Code § 63-3-519). Many small towns are legally prohibited from using radar.',
    speedTrapLaw: 'Miss. Code Ann. § 63-3-519 (Radar use restrictions by municipality size).',
    duiImpliedConsentCode: 'Miss. Code Ann. § 63-11-5',
    duiFieldSobrietyRule: 'Field sobriety tests voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Check whether arresting municipality meets population threshold to lawfully operate radar under § 63-3-519']
  },
  MO: {
    code: 'MO',
    name: 'Missouri',
    hasStopAndId: true,
    stopAndIdStatute: 'Mo. Rev. Stat. § 84.710 (in certain jurisdictions) & Kansas City ordinance',
    stopAndIdSummary: 'Police may stop and demand identifying information under reasonable suspicion.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify unless independent suspicion exists.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police is lawful.',
    speedingCode: 'Mo. Rev. Stat. § 304.010',
    speedingDefense: 'Reasonable and prudent speed defense.',
    speedTrapLaw: 'Senate Bill 5 (Caps municipal fine revenue at 20% of budget; strict speed trap limits).',
    duiImpliedConsentCode: 'Mo. Rev. Stat. § 577.020',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Station chemical test required post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Invoke SB 5 municipal revenue caps if ticketed in known revenue trap municipality', 'Request discovery of calibration logs']
  },
  MT: {
    code: 'MT',
    name: 'Montana',
    hasStopAndId: true,
    stopAndIdStatute: 'Mont. Code Ann. § 46-5-401',
    stopAndIdSummary: 'In order to obtain or verify an explanation of a person\'s presence or conduct, an officer may stop a person who is observed in circumstances that give rise to reasonable cause to suspect the person is committing or has committed an offense, and may request the person\'s name, current address, and an explanation of conduct.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not subject to 46-5-401 without independent reasonable cause.',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Filming public police is constitutionally protected under 1st Amendment.',
    speedingCode: 'Mont. Code Ann. § 61-8-303 (Speed Restrictions)',
    speedingDefense: 'Reasonable and prudent speed defense for daytime conditions.',
    speedTrapLaw: 'Mont. Code Ann. § 61-8-310.',
    duiImpliedConsentCode: 'Mont. Code Ann. § 61-8-1016',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena Highway Patrol radar log']
  },
  NE: {
    code: 'NE',
    name: 'Nebraska',
    hasStopAndId: true,
    stopAndIdStatute: 'Neb. Rev. Stat. § 29-829',
    stopAndIdSummary: 'Peace officer may stop any person in a public place whom he has reasonable suspicion is committing a crime and demand name, address, and explanation of actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Neb. Rev. Stat. § 60-6,186',
    speedingDefense: 'Reasonable speed defense.',
    speedTrapLaw: 'Neb. Rev. Stat. § 60-6,190.',
    duiImpliedConsentCode: 'Neb. Rev. Stat. § 60-6,197',
    duiFieldSobrietyRule: 'SFSTs voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena cruiser calibration records']
  },
  NV: {
    code: 'NV',
    name: 'Nevada',
    hasStopAndId: true,
    stopAndIdStatute: 'NRS § 171.123',
    stopAndIdSummary: 'Any peace officer may detain any person whom the officer encounters under circumstances which reasonably indicate that the person has committed, is committing or is about to commit a crime. The officer may ascertain the person\'s identity. (Affirmed by US Supreme Court in Hiibel v. Nevada, 542 U.S. 177).',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify unless the officer has independent reasonable suspicion of a crime committed by that passenger.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent for audio; recording police in public is constitutionally protected.',
    speedingCode: 'NRS § 484B.600 (Basic Speed Rule)',
    speedingDefense: 'Reasonable and proper speed; calibration records of laser/radar within 6 months.',
    speedTrapLaw: 'NRS § 484B.603.',
    duiImpliedConsentCode: 'NRS § 484C.160',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Implied consent applies to chemical test at station post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Hiibel compliance check (confirm whether officer had articulable reasonable suspicion prior to demand)', 'Subpoena radar maintenance logs']
  },
  NH: {
    code: 'NH',
    name: 'New Hampshire',
    hasStopAndId: true,
    stopAndIdStatute: 'N.H. Rev. Stat. Ann. § 594:2',
    stopAndIdSummary: 'Officer may stop any person who he has reason to suspect is committing, has committed, or is about to commit a crime, and demand name, address, business abroad, and destination.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to identify.',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'First Circuit in Glik v. Cunniffe and Gericke v. Begin (NH case) explicitly affirmed the 1st Amendment right to record police officers performing duties in public.',
    speedingCode: 'RSA § 265:60 (Basic Rule)',
    speedingDefense: 'Reasonable and prudent speed defense.',
    speedTrapLaw: 'RSA § 265:63.',
    duiImpliedConsentCode: 'RSA § 265-A:14',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Invoke Gericke v. Begin if officer attempted to deter recording', 'Subpoena radar calibration records']
  },
  NJ: {
    code: 'NJ',
    name: 'New Jersey',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID during traffic stops (State v. Sloane).',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording police is protected.',
    speedingCode: 'N.J.S.A. § 39:4-98',
    speedingDefense: 'State v. Dantonio / State v. Wojtkowiak radar standards: police must prove tuning fork calibration before and after tour of duty; annual laboratory certification required.',
    speedTrapLaw: 'N.J.S.A. § 39:4-98.1.',
    duiImpliedConsentCode: 'N.J.S.A. § 39:4-50.2',
    duiFieldSobrietyRule: 'Roadside SFSTs voluntary. Alcotest station chemical test refusal brings separate statutory penalties.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Plead online through NJ Municipal Court Online Dispute Resolution (ODR)', 'Subpoena 2 tuning fork calibration certificates and master technician log under State v. Dantonio']
  },
  NM: {
    code: 'NM',
    name: 'New Mexico',
    hasStopAndId: true,
    stopAndIdStatute: 'N.M. Stat. Ann. § 30-22-3 (Concealing identity)',
    stopAndIdSummary: 'Concealing identity consists of concealing one\'s true name or identity, or disguising oneself with intent to obstruct the due execution of the law or with intent to intimidate or hinder any peace officer. Officer must have reasonable suspicion of a crime.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID unless suspected of independent criminal offense.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public encounters is lawful.',
    speedingCode: 'NMSA § 66-7-301',
    speedingDefense: 'Reasonable and prudent speed.',
    speedTrapLaw: 'NMSA § 66-7-303.',
    duiImpliedConsentCode: 'NMSA § 66-8-107',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Check whether officer had reasonable suspicion under § 30-22-3', 'Request radar calibration test logs']
  },
  NY: {
    code: 'NY',
    name: 'New York',
    hasStopAndId: true,
    stopAndIdStatute: 'N.Y. Crim. Proc. Law § 140.50 (Temporary questioning of persons in public places)',
    stopAndIdSummary: 'A police officer may stop a person in a public place when he reasonably suspects that such person is committing, has committed or is about to commit either a felony or a misdemeanor, and may demand name, address, and an explanation of conduct.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers in vehicles are NOT required to produce ID or state their name during a routine vehicle stop unless the officer has independent reasonable suspicion of a crime (People v. Garcia, NY Court of Appeals).',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'N.Y. Civ. Rights Law § 79-p (Right to Record Act, passed 2020) explicitly grants an affirmative statutory right to record police officers performing duties in public, with private right of action for damages.',
    speedingCode: 'N.Y. Veh. & Traf. Law § 1180 (Basic and maximum speed regulations)',
    speedingDefense: 'In NYC: Traffic Violations Bureau (TVB) has no plea bargaining; officer must testify. Outside NYC: Local town/village courts permit plea bargains to non-moving 0-point parking infractions. Radar defense: demand testing certificates for tuning forks within 6 months.',
    speedTrapLaw: 'N.Y. VTL § 1620 & § 1680 (Manual on Uniform Traffic Control Devices compliance).',
    duiImpliedConsentCode: 'N.Y. VTL § 1194',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Breath test at precinct required post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: [
      'In Town/Village Courts (outside NYC): Request reduction to VTL 1201 (parking violation, 0 points)',
      'Subpoena officer training certificates and speed radar calibration certificates',
      'If officer attempted to stop you from recording, invoke N.Y. Civil Rights Law § 79-p'
    ]
  },
  NC: {
    code: 'NC',
    name: 'North Carolina',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not obligated to identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; filming in public is lawful.',
    speedingCode: 'N.C. Gen. Stat. § 20-141',
    speedingDefense: 'PRAYER FOR JUDGMENT CONTINUED (PJC): Unique NC defense allowing the court to withhold judgment once every 3 years per household, preventing insurance rate hikes and license points. Alternatively, negotiate reduction to Improper Equipment (NCGS § 20-123.2, a non-moving violation).',
    speedTrapLaw: 'N.C. Gen. Stat. § 20-141(f).',
    duiImpliedConsentCode: 'N.C. Gen. Stat. § 20-16.2',
    duiFieldSobrietyRule: 'Roadside tests voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request reduction to Improper Equipment (NCGS 20-123.2)', 'Invoke Prayer for Judgment Continued (PJC)']
  },
  ND: {
    code: 'ND',
    name: 'North Dakota',
    hasStopAndId: true,
    stopAndIdStatute: 'N.D. Cent. Code § 29-29-21',
    stopAndIdSummary: 'Peace officer may stop any person in a public place whom he has reasonable suspicion is committing a crime and demand name, address, and explanation of actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'N.D.C.C. § 39-09-01 & § 39-09-02',
    speedingDefense: 'Reasonable and prudent speed defense.',
    speedTrapLaw: 'N.D.C.C. § 39-09-03.',
    duiImpliedConsentCode: 'N.D.C.C. § 39-20-01',
    duiFieldSobrietyRule: 'SFSTs voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Pay fine or contest by written statement through clerk of court']
  },
  OH: {
    code: 'OH',
    name: 'Ohio',
    hasStopAndId: true,
    stopAndIdStatute: 'Ohio Rev. Code § 2921.29 (Failure to disclose personal information)',
    stopAndIdSummary: 'No person who is in a public place shall refuse to disclose the person\'s name, address, or date of birth, when requested by a law enforcement officer who reasonably suspects either that the person is committing, has committed, or is about to commit a criminal offense, or that the person witnessed a felony.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID unless the officer has independent reasonable suspicion that the passenger committed an offense.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police is constitutionally protected.',
    speedingCode: 'O.R.C. § 4511.21 (Speed Limits - Assured Clear Distance Ahead)',
    speedingDefense: 'Reasonable and proper speed defense: Ohio speed limits are prima facie evidence of unlawful speed, meaning the defendant can present evidence that the speed was safe, reasonable, and proper under the road and weather conditions (City of Cleveland v. Keep).',
    speedTrapLaw: 'O.R.C. § 4511.093 (Photo radar regulations).',
    duiImpliedConsentCode: 'O.R.C. § 4511.191',
    duiFieldSobrietyRule: 'Roadside SFSTs voluntary. Post-arrest station test required under ALS rules.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Present weather and traffic evidence showing speed was reasonable and proper under O.R.C. 4511.21', 'Demand radar calibration records']
  },
  OK: {
    code: 'OK',
    name: 'Oklahoma',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stop without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: '47 O.S. § 11-801',
    speedingDefense: 'Reasonable and prudent speed.',
    speedTrapLaw: '47 O.S. § 11-803.',
    duiImpliedConsentCode: '47 O.S. § 751',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena Highway Patrol calibration logs']
  },
  OR: {
    code: 'OR',
    name: 'Oregon',
    hasStopAndId: false,
    stopAndIdStatute: 'No general Stop-and-Identify statute (ORS 131.615 permits stopping on reasonable suspicion, but does not criminalize refusal to answer).',
    stopAndIdSummary: 'Refusing to answer questions or state identity during a Terry stop is NOT a crime in Oregon.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers in vehicle stops have no obligation to provide identification (State v. Amaya).',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'ORS 165.540(5)(c) explicitly exempts recording public police encounters from eavesdropping restrictions.',
    speedingCode: 'ORS § 811.100 (Violation of Basic Speed Rule) & § 811.111',
    speedingDefense: 'Basic speed rule defense: driver must show speed was reasonable given traffic, surface, and width of highway.',
    speedTrapLaw: 'ORS § 810.180.',
    duiImpliedConsentCode: 'ORS § 813.100',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Implied consent applies post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Submit Trial by Affidavit/Written Declaration under ORS 153.080']
  },
  PA: {
    code: 'PA',
    name: 'Pennsylvania',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stop without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide identification during a vehicle stop.',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'Third Circuit in Fields v. City of Philadelphia (2017) confirmed an absolute First Amendment right to record police officers in public without requiring an expressive purpose.',
    speedingCode: '75 Pa.C.S. § 3362 (Maximum Speed Limits)',
    speedingDefense: 'PENNSYLVANIA UNIQUE RADAR BAN FOR LOCAL POLICE (75 Pa.C.S. § 3368): In Pennsylvania, LOCAL AND MUNICIPAL POLICE ARE LEGALLY PROHIBITED FROM USING RADAR. Only the Pennsylvania State Police may use radar. Local police may only use VASCAR, stopwatches, or electronic timing bands across a minimum distance of 3/10 mile, and cannot ticket for speeds less than 10 mph over the limit (or 6 mph in zones under 55mph).',
    speedTrapLaw: '75 Pa.C.S. § 3368 (Strict statutory restrictions on speed timing devices).',
    duiImpliedConsentCode: '75 Pa.C.S. § 1547',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Station chemical testing applies post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: [
      'If ticketed by local/borough police using radar, motion for INSTANT DISMISSAL under 75 Pa.C.S. § 3368',
      'For VASCAR tickets, verify officer calibrated timing device at certified station within 60 days',
      'Check whether measured distance was at least 3/10th of a mile'
    ]
  },
  RI: {
    code: 'RI',
    name: 'Rhode Island',
    hasStopAndId: true,
    stopAndIdStatute: 'R.I. Gen. Laws § 12-7-1',
    stopAndIdSummary: 'Peace officer may stop any person abroad who he has reason to suspect is committing, has committed, or is about to commit a crime, and demand name, address, business abroad, and destination.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not subject to 12-7-1 without individual suspicion.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police is lawful.',
    speedingCode: 'R.I. Gen. Laws § 31-14-1 (Reasonable and Prudent)',
    speedingDefense: 'Reasonable and prudent speed; radar certification check.',
    speedTrapLaw: 'R.I. Gen. Laws § 31-14-4.',
    duiImpliedConsentCode: 'R.I. Gen. Laws § 31-27-2.1',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Contest ticket before Rhode Island Traffic Tribunal (RITT); request Good Driving Record dismissal if clean for 3 years under § 31-41.1-7']
  },
  SC: {
    code: 'SC',
    name: 'South Carolina',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No statutory requirement to identify during Terry stop without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers not required to show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording police is protected.',
    speedingCode: 'S.C. Code Ann. § 56-5-1520',
    speedingDefense: 'Reasonable and prudent speed; officer radar certification.',
    speedTrapLaw: 'S.C. Code Ann. § 56-5-1530.',
    duiImpliedConsentCode: 'S.C. Code Ann. § 56-5-2950 (Mandatory videotaping of DUI stop under § 56-5-2953).',
    duiFieldSobrietyRule: 'SFSTs voluntary. S.C. Code § 56-5-2953 requires MANDATORY videotaping of the entire DUI stop; failure to record requires dismissal.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Demand squad car video under § 56-5-2953 for mandatory statutory dismissal if video is absent or non-compliant']
  },
  SD: {
    code: 'SD',
    name: 'South Dakota',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'SDCL § 32-25-3',
    speedingDefense: 'Reasonable speed defense.',
    speedTrapLaw: 'SDCL § 32-25-7.',
    duiImpliedConsentCode: 'SDCL § 32-23-10',
    duiFieldSobrietyRule: 'Field tests voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena calibration records']
  },
  TN: {
    code: 'TN',
    name: 'Tennessee',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without probable cause for arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID during vehicle stop.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording police is protected.',
    speedingCode: 'Tenn. Code Ann. § 55-8-152',
    speedingDefense: 'Reasonable speed defense; laser certification verification.',
    speedTrapLaw: 'Tenn. Code Ann. § 55-8-153.',
    duiImpliedConsentCode: 'Tenn. Code Ann. § 55-10-406',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request discovery for radar tuning fork certifications']
  },
  TX: {
    code: 'TX',
    name: 'Texas',
    hasStopAndId: false,
    stopAndIdStatute: 'Tex. Penal Code § 38.02 (Failure to Identify)',
    stopAndIdSummary: 'TEXAS IS NOT A GENERAL STOP-AND-IDENTIFY STATE FOR DETAINEES. Under Texas Penal Code § 38.02(a), you only commit an offense if you are LAWFULLY ARRESTED and refuse to give your name, residence address, and date of birth. During a detention (Terry stop), it is ONLY a crime if you give a FALSE or fictitious name (§ 38.02(b)). Merely refusing to identify while detained is NOT A CRIME.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers in Texas vehicle stops CANNOT be compelled to identify or produce ID unless the officer has independent probable cause to arrest that passenger (St. George v. State, Texas Court of Criminal Appeals).',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent state. Fifth Circuit in Turner v. Driver (848 F.3d 678, 2017) explicitly held that the First Amendment protects the right to film police officers performing public duties in public spaces.',
    speedingCode: 'Tex. Transportation Code § 545.351 (Maximum Speed Requirement) & § 545.352 (Prima Facie Speed Limits)',
    speedingDefense: 'PRIMA FACIE SPEED DEFENSE: In Texas, posted speed limits are NOT absolute ceilings; they are prima facie evidence of an unreasonable speed. Under § 545.351, a driver cannot be convicted if the speed was reasonable and prudent under existing road, visibility, and traffic conditions. Alternatively, take a state-approved Defensive Driving Course (CCP art. 45.0511) or request Deferred Disposition for full dismissal.',
    speedTrapLaw: 'Tex. Transportation Code § 545.353.',
    duiImpliedConsentCode: 'Tex. Transportation Code § 724.011',
    duiFieldSobrietyRule: 'Standardized Field Sobriety Tests (SFSTs) and portable breathalyzer tests are STRICTLY VOLUNTARY. Never submit to roadside balancing tests. If arrested, chemical breath/blood test governed by § 724.',
    writtenDeclarationAllowed: true,
    courtTactics: [
      'Invoke Texas Code of Criminal Procedure art. 45.0511 for mandatory dismissal via Driving Safety Course (DSC)',
      'Request Deferred Disposition (probation period where ticket is completely dismissed with no conviction)',
      'Subpoena officer dashcam/bodycam and radar daily calibration tuning fork logs',
      'Assert § 38.02 defense if officer threatened arrest for passenger refusing ID during detention'
    ]
  },
  UT: {
    code: 'UT',
    name: 'Utah',
    hasStopAndId: true,
    stopAndIdStatute: 'Utah Code § 77-7-15',
    stopAndIdSummary: 'A peace officer may stop any person when the officer has reasonable suspicion to believe the person has committed or is in the act of committing or is attempting to commit a crime, and may demand the person\'s name, address, and an explanation of actions.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify without independent suspicion.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Utah Code § 41-6a-601 (Basic Rule)',
    speedingDefense: 'Reasonable and prudent speed; laser maintenance records.',
    speedTrapLaw: 'Utah Code § 41-6a-602.',
    duiImpliedConsentCode: 'Utah Code § 41-6a-520 (Strict 0.05% BAC limit)',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Plead through Utah Online Dispute Resolution (ODR) system']
  },
  VT: {
    code: 'VT',
    name: 'Vermont',
    hasStopAndId: true,
    stopAndIdStatute: 'Vt. R. Crim. P. 3',
    stopAndIdSummary: 'Officers may demand identification from persons suspected of criminal conduct.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: '23 V.S.A. § 1081 (Basic Rule and Maximum Limits)',
    speedingDefense: 'Reasonable speed defense.',
    speedTrapLaw: '23 V.S.A. § 1083.',
    duiImpliedConsentCode: '23 V.S.A. § 1202',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Contest by mail through Vermont Judicial Bureau']
  },
  VA: {
    code: 'VA',
    name: 'Virginia',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'Virginia is NOT a stop-and-identify state. Pedestrians need not identify without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not identify during a routine traffic stop.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; recording public police is lawful.',
    speedingCode: 'Va. Code § 46.2-870 (Speed Limits) & § 46.2-862 (Reckless Driving by Speed: >20 mph over or >85 mph)',
    speedingDefense: 'VIRGINIA RECKLESS DRIVING WARNING: Driving more than 20 mph over limit or over 85 mph is a CLASS 1 CRIMINAL MISDEMEANOR in Virginia. Defense: Obtain a certified speedometer calibration test from a licensed mechanic; if speedometer read lower than actual speed, judges routinely reduce charge to simple speeding or defective equipment (Va. Code § 46.2-1003). Subpoena officer radar calibration certificate under Va. Code § 46.2-882 (certificate must be within 6 months).',
    speedTrapLaw: 'Va. Code § 46.2-878.',
    duiImpliedConsentCode: 'Va. Code § 18.2-268.2',
    duiFieldSobrietyRule: 'Field sobriety tests are voluntary. Chemical station breath test mandatory post-arrest.',
    writtenDeclarationAllowed: false,
    courtTactics: [
      'Obtain bench speedometer calibration test for your vehicle to present to Commonwealth\'s Attorney',
      'Demand officer radar calibration certificate under Va. Code § 46.2-882 (must be certified within 6 months by certified technician)',
      'Complete a Virginia DMV-approved driver improvement clinic prior to court date for charge reduction'
    ]
  },
  WA: {
    code: 'WA',
    name: 'Washington',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'Washington does NOT require individuals to identify themselves during Terry stops without probable cause for arrest (State v. White).',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers in vehicle stops are NOT required to provide identification or state their names (State v. Rankin, Washington Supreme Court).',
    recordingConsent: 'two-party',
    recordingPoliceRule: 'RCW 9.73.030 wiretap statute exempts conversations where there is no reasonable expectation of privacy. 9th Circuit in Fordyce v. City of Seattle affirmed right to film police in public.',
    speedingCode: 'RCW § 46.61.400 (Basic Rule and Maximum Limits)',
    speedingDefense: 'Speed measuring device (SMD) expert rule under IRLJ 6.6: Police department must maintain SMD expert certification on file with the court. If certification is missing or expired, citation is dismissed.',
    speedTrapLaw: 'RCW § 46.61.415.',
    duiImpliedConsentCode: 'RCW § 46.20.308',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Station chemical test required post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: [
      'Contest citation by Written Statement under Infraction Rules for Courts of Limited Jurisdiction (IRLJ 3.5)',
      'Challenge Speed Measuring Device (SMD) certification under IRLJ 6.6',
      'Request deferred finding under RCW 46.63.070 (dismissal after 1-year clean record)'
    ]
  },
  WV: {
    code: 'WV',
    name: 'West Virginia',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'W. Va. Code § 17C-6-1',
    speedingDefense: 'Reasonable and prudent speed defense; radar logbook verification.',
    speedTrapLaw: 'W. Va. Code § 17C-6-2.',
    duiImpliedConsentCode: 'W. Va. Code § 17C-5-4',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Request discovery for radar tuning fork certifications']
  },
  WI: {
    code: 'WI',
    name: 'Wisconsin',
    hasStopAndId: true,
    stopAndIdStatute: 'Wis. Stat. § 968.24 (Temporary questioning without arrest)',
    stopAndIdSummary: 'After having identified himself as a law enforcement officer, a peace officer may stop a person in a public place for a reasonable period of time when the officer reasonably suspects that such person is committing, is about to commit or has committed a crime, and may demand the name and address of the person and an explanation of the person\'s conduct.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID unless independent reasonable suspicion exists.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent; filming police performing public duties is protected.',
    speedingCode: 'Wis. Stat. § 346.57 (Speed Restrictions)',
    speedingDefense: 'Reasonable and prudent speed defense; radar calibration records inspection.',
    speedTrapLaw: 'Wis. Stat. § 346.57(4).',
    duiImpliedConsentCode: 'Wis. Stat. § 343.305',
    duiFieldSobrietyRule: 'Roadside physical tests voluntary. Chemical test refusal triggers refusal hearing.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Plea by mail or online through municipal court', 'Subpoena radar maintenance logs']
  },
  WY: {
    code: 'WY',
    name: 'Wyoming',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No requirement to identify during Terry stops without arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not show ID.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent.',
    speedingCode: 'Wyo. Stat. Ann. § 31-5-301',
    speedingDefense: 'Reasonable speed defense.',
    speedTrapLaw: 'Wyo. Stat. Ann. § 31-5-302.',
    duiImpliedConsentCode: 'Wyo. Stat. Ann. § 31-6-102',
    duiFieldSobrietyRule: 'Field evaluations voluntary.',
    writtenDeclarationAllowed: false,
    courtTactics: ['Subpoena Highway Patrol calibration records']
  },
  DC: {
    code: 'DC',
    name: 'District of Columbia',
    hasStopAndId: false,
    stopAndIdStatute: 'No Stop-and-Identify statute',
    stopAndIdSummary: 'No statutory requirement for pedestrians or detainees to identify themselves during Terry stops without lawful arrest.',
    passengerIdRequired: false,
    passengerIdRule: 'Passengers need not provide ID during traffic stops.',
    recordingConsent: 'one-party',
    recordingPoliceRule: 'One-party consent. MPD General Order 304.19 explicitly protects citizens\' rights to video and audio record police officers in public.',
    speedingCode: 'DCMR Title 18 § 2200',
    speedingDefense: 'Automated photo radar challenges (calibration logs, technician credentials, signage distance verification).',
    speedTrapLaw: 'D.C. Official Code § 50-2209.01.',
    duiImpliedConsentCode: 'D.C. Official Code § 50-1904.02',
    duiFieldSobrietyRule: 'SFSTs voluntary. Station chemical test mandatory post-arrest.',
    writtenDeclarationAllowed: true,
    courtTactics: ['Adjudicate citation online through D.C. DMV Adjudication Services by submitting photos and written statement', 'Subpoena photo radar deployment logs']
  }
};

// 3. Field Encounter Verbatim Scripts
export const POLICE_ENCOUNTER_SCRIPTS: EncounterScript[] = [
  {
    category: 'Detention Inquiry',
    script: '"Officer, am I being detained or am I free to go?"',
    legalBasis: 'Establishes whether the interaction is a voluntary consensual encounter or an investigative detention under the Fourth Amendment (Terry v. Ohio). If the officer says you are free to go, calmly walk away.',
    recommendedTone: 'Calm, respectful, firm, even-pitched.',
    pitfallsToAvoid: 'Do not argue or run. If the officer says you are detained, do not physically resist.'
  },
  {
    category: 'Reason for Stop',
    script: '"What is the specific legal reason for this stop, Officer?"',
    legalBasis: 'Forces the officer to state articulable suspicion on record (audio/dashcam/bodycam). Any post-hoc justification invented later in court can be impeached.',
    recommendedTone: 'Polite, inquisitive.',
    pitfallsToAvoid: 'Never volunteer information or answer "Do you know why I pulled you over?" with "Was I speeding?" Always answer: "I do not know, Officer."'
  },
  {
    category: 'Search Refusal',
    script: '"Officer, I do not consent to any searches of my person, my passengers, my vehicle, or any closed containers."',
    legalBasis: 'Preserves your 4th Amendment exclusionary rule protections. If police search anyway, any evidence found is subject to suppression under Mapp v. Ohio as fruit of the poisonous tree. Silence is NOT refusal; you must state it verbally.',
    recommendedTone: 'Clear, steady, audible for bodycam microphones.',
    pitfallsToAvoid: 'Never physically block an officer. Verbal non-consent is your legal shield.'
  },
  {
    category: 'Invocation of Silence',
    script: '"I am invoking my Fifth Amendment right to remain silent and will not answer any questions without my attorney present."',
    legalBasis: 'Under Salinas v. Texas (2013), silence without verbal invocation can be used against you. Under Edwards v. Arizona (1981), invoking counsel requires officers to cease questioning.',
    recommendedTone: 'Direct, unambiguous, polite.',
    pitfallsToAvoid: 'Do not continue chatting after invoking. Small talk waives your invocation.'
  },
  {
    category: 'Exit Vehicle Order',
    script: '"I am exiting the vehicle as you ordered for officer safety, but I do NOT consent to any search of this vehicle or my person."',
    legalBasis: 'Under Pennsylvania v. Mimms (1977), police can order you out of the car. Disobeying can lead to an obstruction charge. However, exiting does not provide consent to search the car (Arizona v. Gant).',
    recommendedTone: 'Compliant with movements, firm on non-consent.',
    pitfallsToAvoid: 'Do not leave the car door wide open or leave items in plain view. Pull the door closed and lock it behind you if possible.'
  },
  {
    category: 'Roadside Field Sobriety Refusal',
    script: '"Officer, I respectfully decline to participate in any voluntary roadside physical balance tests or preliminary portable breath tests."',
    legalBasis: 'Field Sobriety Tests (horizontal gaze nystagmus, walk-and-turn, one-leg stand) are subjective and VOLUNTARY in 49+ states. They are designed to collect evidence against you, not prove sobriety.',
    recommendedTone: 'Courteous, neutral, unprovoked.',
    pitfallsToAvoid: 'Do not confuse voluntary roadside tests with chemical blood/breath testing at the police station after a formal arrest (which is governed by implied consent statutes).'
  },
  {
    category: 'Recording Rights',
    script: '"Officer, I am exercising my First Amendment right to video and audio record this public interaction from a safe distance without interfering."',
    legalBasis: 'Protected by Glik v. Cunniffe, Fields v. City of Philadelphia, Turner v. Driver, and DOJ guidance. Officers cannot order cameras shut off or seize devices without a warrant (Riley v. California).',
    recommendedTone: 'Unconfrontational, steady.',
    pitfallsToAvoid: 'Do not thrust the phone in the officer’s face or reach suddenly into pockets.'
  }
];

// 4. International Legal Frameworks
export const INTERNATIONAL_LEGAL_FRAMEWORK = {
  udhr: {
    title: 'Universal Declaration of Human Rights (UDHR)',
    articles: [
      { article: 'Article 9', text: 'No one shall be subjected to arbitrary arrest, detention or exile.' },
      { article: 'Article 10', text: 'Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal.' },
      { article: 'Article 11', text: 'Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law.' }
    ]
  },
  iccpr: {
    title: 'International Covenant on Civil and Political Rights (ICCPR)',
    articles: [
      { article: 'Article 9(1)', text: 'Everyone has the right to liberty and security of person. No one shall be subjected to arbitrary arrest or detention.' },
      { article: 'Article 9(2)', text: 'Anyone who is arrested shall be informed, at the time of arrest, of the reasons for his arrest and promptly informed of any charges.' },
      { article: 'Article 9(4)', text: 'Anyone deprived of liberty by arrest or detention shall be entitled to take proceedings before a court in order that that court may decide without delay on lawfulness.' }
    ]
  },
  echr: {
    title: 'European Convention on Human Rights (ECHR)',
    articles: [
      { article: 'Article 5', text: 'Right to liberty and security: lawful arrest only on reasonable suspicion of having committed an offence.' },
      { article: 'Article 6', text: 'Right to a fair trial, right to silence, privilege against self-incrimination, right to immediate access to legal counsel.' }
    ]
  },
  ukPace: {
    title: 'UK Police and Criminal Evidence Act 1984 (PACE) Code A',
    mnemonic: 'GOWISELY',
    summary: 'Police must state Grounds for search, Object of search, Warrant card (if in plain clothes), Identity of officer, Station attached to, Entitlement to copy of search record, Legal power used, and "You are detained for the purpose of a search".'
  },
  canadaCharter: {
    title: 'Canadian Charter of Rights and Freedoms',
    sections: [
      { section: 'Section 8', text: 'Right to be secure against unreasonable search or seizure.' },
      { section: 'Section 9', text: 'Right not to be arbitrarily detained or imprisoned.' },
      { section: 'Section 10(b)', text: 'Right on arrest or detention to retain and instruct counsel without delay and to be informed of that right.' }
    ]
  }
};

// 5. Query matching and Legal Intelligence Generation
export function isLegalDefenseQuery(lower: string): boolean {
  return (
    lower.includes('law') ||
    lower.includes('legal') ||
    lower.includes('police') ||
    lower.includes('pulled over') ||
    lower.includes('traffic stop') ||
    lower.includes('cop') ||
    lower.includes('cops') ||
    lower.includes('arrest') ||
    lower.includes('detain') ||
    lower.includes('detention') ||
    lower.includes('ticket') ||
    lower.includes('citation') ||
    lower.includes('fine') ||
    lower.includes('summons') ||
    lower.includes('jail') ||
    lower.includes('court') ||
    lower.includes('defense') ||
    lower.includes('speeding') ||
    lower.includes('radar') ||
    lower.includes('lidar') ||
    lower.includes('speed trap') ||
    lower.includes('stop and id') ||
    lower.includes('stop-and-id') ||
    lower.includes('fourth amendment') ||
    lower.includes('4th amendment') ||
    lower.includes('fifth amendment') ||
    lower.includes('5th amendment') ||
    lower.includes('search') ||
    lower.includes('seizure') ||
    lower.includes('miranda') ||
    lower.includes('implied consent') ||
    lower.includes('field sobriety') ||
    lower.includes('recording police') ||
    lower.includes('film police')
  );
}

export function detectStateInQuery(query: string, mapContext?: MapContext): StateLegalProfile {
  const q = query.toLowerCase();
  
  // Direct state code matching with boundary check
  for (const [code, profile] of Object.entries(STATE_LEGAL_DATABASE)) {
    const codeRegex = new RegExp(`\\b${code.toLowerCase()}\\b`, 'i');
    const nameRegex = new RegExp(`\\b${profile.name.toLowerCase()}\\b`, 'i');
    if (codeRegex.test(q) || nameRegex.test(q)) {
      return profile;
    }
  }

  // Common nicknames and city mappings
  if (q.includes('cali') || q.includes('los angeles') || q.includes('san francisco') || q.includes('san diego')) return STATE_LEGAL_DATABASE.CA;
  if (q.includes('texas') || q.includes('houston') || q.includes('dallas') || q.includes('austin')) return STATE_LEGAL_DATABASE.TX;
  if (q.includes('florida') || q.includes('miami') || q.includes('orlando') || q.includes('tampa')) return STATE_LEGAL_DATABASE.FL;
  if (q.includes('new york') || q.includes('nyc') || q.includes('manhattan') || q.includes('brooklyn')) return STATE_LEGAL_DATABASE.NY;
  if (q.includes('chicago') || q.includes('illinois')) return STATE_LEGAL_DATABASE.IL;
  if (q.includes('seattle') || q.includes('washington state')) return STATE_LEGAL_DATABASE.WA;
  if (q.includes('philly') || q.includes('philadelphia') || q.includes('pittsburgh') || q.includes('pennsylvania')) return STATE_LEGAL_DATABASE.PA;
  if (q.includes('atlanta') || q.includes('georgia')) return STATE_LEGAL_DATABASE.GA;
  if (q.includes('denver') || q.includes('colorado')) return STATE_LEGAL_DATABASE.CO;
  if (q.includes('phoenix') || q.includes('arizona')) return STATE_LEGAL_DATABASE.AZ;
  if (q.includes('boston') || q.includes('massachusetts')) return STATE_LEGAL_DATABASE.MA;
  if (q.includes('vegas') || q.includes('nevada')) return STATE_LEGAL_DATABASE.NV;
  if (q.includes('dc') || q.includes('district of columbia')) return STATE_LEGAL_DATABASE.DC;

  // Fallback to map coordinates if available
  if (mapContext && mapContext.center) {
    const { lat, lon } = mapContext.center;
    if (lat >= 32.5 && lat <= 42.0 && lon >= -124.5 && lon <= -114.1) return STATE_LEGAL_DATABASE.CA;
    if (lat >= 25.8 && lat <= 36.5 && lon >= -106.6 && lon <= -93.5) return STATE_LEGAL_DATABASE.TX;
    if (lat >= 24.5 && lat <= 31.0 && lon >= -87.6 && lon <= -80.0) return STATE_LEGAL_DATABASE.FL;
    if (lat >= 40.5 && lat <= 45.0 && lon >= -79.8 && lon <= -71.8) return STATE_LEGAL_DATABASE.NY;
    if (lat >= 36.9 && lat <= 42.5 && lon >= -91.5 && lon <= -87.5) return STATE_LEGAL_DATABASE.IL;
  }

  // Default to Federal / California baseline if unspecified
  return STATE_LEGAL_DATABASE.CA;
}

export function generateLegalDefenseResponse(
  query: string,
  mapContext: MapContext,
  isDeepResearch: boolean
): AIResponse {
  const lower = query.toLowerCase();
  const state = detectStateInQuery(query, mapContext);
  const sources = [
    'U.S. Supreme Court Constitutional Jurisprudence (4th, 5th, 6th, 14th Amendments)',
    `${state.name} Vehicle Code & Revised Statutes (${state.stopAndIdStatute})`,
    'National Highway Traffic Safety Administration (NHTSA) SFST Standards',
    'Federal Communications Commission (FCC) Radar & LIDAR Bench Calibration Protocols'
  ];

  let text = `### ⚖️ SPHINX LEGAL INTELLIGENCE & DEFENSE PROTOCOL: ${state.name.toUpperCase()}

**Jurisdiction:** \`${state.name} (${state.code})\` | **Stop-and-ID State:** \`${state.hasStopAndId ? 'YES (Statutory Mandate)' : 'NO (ID Not Mandatory Until Arrest)'}\` | **Recording Rule:** \`${state.recordingConsent.toUpperCase()} CONSENT (Public Police Protected)\`

---

#### 🛡️ ACTIVE POLICE STOP: IMMEDIATE VERBATIM PROTOCOLS
When interacting with law enforcement during a traffic or pedestrian stop, adhere strictly to these legally fortified responses:

1. **Inquire Detention Status:**
   > *"Officer, am I being detained or am I free to go?"*
   - **Legal Context:** Forces the officer to either release you (consensual encounter) or establish an official seizure (*Terry v. Ohio*).

2. **Decline Unwarranted Searches (Crucial for 4th Amendment):**
   > *"Officer, I do not consent to any searches of my person, my passengers, my vehicle, or any closed containers."*
   - **Legal Impact:** Preserves your right to suppress evidence under the exclusionary rule (*Mapp v. Ohio*). Silence is NOT refusal; verbal refusal is required.

3. **Invoke Right to Silence (Verbal Execution Required):**
   > *"I am invoking my Fifth Amendment right to remain silent and will not answer questions without my attorney present."*
   - **Supreme Court Precedent:** Under *Salinas v. Texas* (2013), staying silent without explicit verbal invocation can be used against you. Under *Edwards v. Arizona* (1981), invoking counsel forces questioning to stop.

4. **Order to Step Out of Vehicle (*Pennsylvania v. Mimms*):**
   > *"I am stepping out as ordered for officer safety, but I do NOT consent to any search of this vehicle."*
   - **Mandatory Compliance:** You MUST step out if ordered. However, stepping out does NOT grant permission to search the interior (*Arizona v. Gant*). Pull the door shut and lock it if safe.

5. **Roadside Field Sobriety Tests (FSTs):**
   > *"I respectfully decline to perform any voluntary roadside balance evaluations or portable preliminary breath tests."*
   - **Tactical Reality:** Field tests (one-leg stand, walk-and-turn) are designed to document impairment evidence, not establish innocence. In almost all states, roadside physical evaluations are voluntary.

---

#### 🏛️ STATE-SPECIFIC STATUTORY BREAKDOWN: ${state.name.toUpperCase()}
| Legal Category | Statutory Code | Legal Doctrine & Citizen Mandate |
| :--- | :--- | :--- |
| **Stop & Identify** | \`${state.stopAndIdStatute}\` | **${state.hasStopAndId ? 'Required to identify upon reasonable suspicion' : 'NOT required to identify without lawful arrest'}**: ${state.stopAndIdSummary} |
| **Passenger Rights** | State Precedent | ${state.passengerIdRule} |
| **Filming Police** | 1st Amendment / State Code | **${state.recordingPoliceRule}** |
| **Speeding Statute** | \`${state.speedingCode}\` | ${state.speedingDefense} |
| **Speed Trap Limits** | \`${state.speedTrapLaw}\` | Statutory restrictions on municipal speed traps and enforcement. |
| **DUI Implied Consent** | \`${state.duiImpliedConsentCode}\` | ${state.duiFieldSobrietyRule} |

---

#### ⚖️ TICKET, SUMMONS & COURTROOM DEFENSE PLAYBOOK
If issued a traffic ticket, summons, or citation in ${state.name}, execute these proven legal strategies to seek dismissal or avoid points/fines:

1. **Formal Request for Discovery & Calibration Logs:**
   - Subpoena the officer’s daily logbook, **tuning fork calibration test certificates** (before and after tour of duty), and the 6-month or 1-year laboratory bench certification for the radar/LIDAR unit.
   - Request the officer’s FCC operator certification and state training certificate. If uncertified or logs are missing, file a **Motion to Suppress / Exclude Speed Evidence**.
2. **Speed Trap Defense (${state.speedTrapLaw}):**
   - Verify whether the roadway has an active, valid Engineering and Traffic Survey (ETS) supporting the speed limit. If the speed limit was set arbitrarily without an engineering survey, speed measurement by radar constitutes an illegal speed trap.
3. **Pacing Discrepancies:**
   - If paced by a police cruiser, demand the cruiser's speedometer calibration records. Under standard procedure, pacing must be conducted over a certified minimum distance (e.g., 2/10th to 3/10th mile) with no visual obstruction.
4. **${state.writtenDeclarationAllowed ? 'Trial by Written Declaration Option:' : 'Contest Hearing Strategy:'}**
   ${state.writtenDeclarationAllowed 
     ? `- **Contest by Mail/Declaration:** Submit your defense in writing without appearing in court. If the citing officer fails to submit their formal declaration by the court deadline, your citation is automatically dismissed with full bail refunded.` 
     : `- **Bench Hearing Cross-Examination:** Cross-examine the citing officer regarding weather conditions, ambient traffic, cosine angle of the radar beam, and visual tracking history.`}
${state.courtTactics.map(t => `- **State Strategy:** ${t}`).join('\n')}

---

#### 🌐 GLOBAL & INTERNATIONAL HUMAN RIGHTS BENCHMARKS
For international travelers or cross-border detentions:
- **UDHR Article 9 & ICCPR Article 9:** Absolute protection against arbitrary arrest and detention. Immediate right to be informed of reasons for arrest and prompt presentation before a judicial authority.
- **ECHR Article 5 & 6 (Europe):** Right to liberty and fair trial; right to silence and immediate access to legal counsel prior to formal interrogation.
- **UK PACE Code A (GOWISELY):** Police must provide Grounds, Object, Warrant ID, Police Identity, Station, Entitlement, Legal power, and "You are detained". If omitted, search is unlawful.
- **Canada Charter Section 8 & 10(b):** Right to be secure against unreasonable search and immediate right to consult counsel upon detention.`;

  if (isDeepResearch) {
    text += `\n\n#### 🔬 DEEP RESEARCH: PROCEDURAL MOTIONS & SUPPRESSION MATRIX
| Defense Motion | Federal / State Ground | Burden of Proof & Threshold | Remedy Upon Granting |
| :--- | :--- | :--- | :--- |
| **Motion to Suppress (4th Amendment)** | *Mapp v. Ohio*, 367 U.S. 643; *Rodriguez*, 575 U.S. 348 | State must prove reasonable suspicion existed prior to prolongation of stop | Total exclusion of all physical evidence, narcotics, weapons, and statements |
| **Speed Trap Exclusion** | \`${state.speedTrapLaw}\` | Lack of recent engineering and traffic survey (85th percentile rule) | Complete lack of judicial jurisdiction; mandatory dismissal |
| **Brady / Discovery Sanctions** | *Brady v. Maryland*, 373 U.S. 83 | Failure to produce bodycam, dashcam, or radar maintenance logs | Dismissal with prejudice or suppression of officer testimony |
| **Miranda / 5th Amendment Suppression** | *Miranda v. Arizona*, 384 U.S. 436; *Edwards*, 451 U.S. 477 | Custodial interrogation conducted without warning or after invoking counsel | Inadmissibility of all defendant admissions and confession |`;
  }

  return {
    text,
    isDeepResearch,
    sources,
    timestamp: new Date().toISOString()
  };
}
