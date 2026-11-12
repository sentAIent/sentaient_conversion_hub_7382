/**
 * SPHINX Constitutional & Foundational Legal Reference Library
 * Complete, unabridged original text of the United States Constitution (1787),
 * the Bill of Rights (1791), and Amendments XI through XXVII.
 *
 * Dedicated civic reference for rule of law, constitutional liberties,
 * and civil rights in peacetime and grid-down emergency conditions.
 * Zero sectarian or theological references.
 */

import { SurvivalArticle } from './survivalData';

export const CONSTITUTIONAL_ARTICLES: SurvivalArticle[] = [
  // ==========================================
  // 1. THE CONSTITUTION OF THE UNITED STATES (ORIGINAL 1787 TEXT)
  // ==========================================
  {
    id: 'us-constitution-original-text',
    category: 'constitutional_legal',
    subcategory: 'foundational_law',
    title: 'The Constitution of the United States (Original 1787 Text)',
    summary: 'The supreme organic law of the United States of America drafted at the Constitutional Convention in Philadelphia (May 25 – September 17, 1787). Complete, unabridged Preamble and Articles I through VII.',
    urgency: 'high',
    keywords: [
      'US Constitution', 'Constitution', 'Preamble', 'Article I', 'Article II', 'Article III',
      'Article IV', 'Article V', 'Article VI', 'Article VII', 'Founding Fathers', 'Philadelphia Convention',
      'Separation of Powers', 'Checks and Balances', 'Supremacy Clause', 'Commerce Clause', 'Necessary and Proper'
    ],
    materials: [
      'Original engrossed parchment on display at the National Archives, Washington, D.C.',
      'Certified transcription from the Records of the Continental Congress and Constitutional Convention (Record Group 360)'
    ],
    warnings: [
      'Constitutional provisions operate as the supreme law of the land; all federal, state, and municipal statutes, executive orders, and administrative regulations are subordinate to its text.',
      'Certain historical clauses (such as Article I, Section 2, Clause 3 regarding apportionment and Article I, Section 9, Clause 1 regarding migration/importation) have been amended or superseded by the 13th, 14th, and 16th Amendments.'
    ],
    tips: [
      'Article I establishes the bicameral Legislative branch (House and Senate) and delegates enumerated powers in Section 8.',
      'Article II vests executive power in the President and defines Commander-in-Chief authorities.',
      'Article III establishes the independent Federal Judiciary and strictly defines the narrow crime of Treason.',
      'Article VI, Clause 2 contains the Supremacy Clause establishing the Constitution as the supreme Law of the Land.'
    ],
    protocols: [
      'PREAMBLE: We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
      'ARTICLE I, SECTION 1 (Legislative Powers): All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.',
      'ARTICLE I, SECTION 2 (House of Representatives): The House of Representatives shall be composed of Members chosen every second Year by the People of the several States. No Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen. The House shall choose their Speaker and other Officers; and shall have the sole Power of Impeachment.',
      'ARTICLE I, SECTION 3 (The Senate): The Senate of the United States shall be composed of two Senators from each State, chosen for six Years; and each Senator shall have one Vote. No Person shall be a Senator who shall not have attained to the Age of thirty Years, and been nine Years a Citizen of the United States. The Vice President shall be President of the Senate, but shall have no Vote, unless they be equally divided. The Senate shall have the sole Power to try all Impeachments. When the President of the United States is tried, the Chief Justice shall preside: And no Person shall be convicted without the Concurrence of two thirds of the Members present.',
      'ARTICLE I, SECTION 4 (Elections & Meetings): The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed in each State by the Legislature thereof; but the Congress may at any time by Law make or alter such Regulations. The Congress shall assemble at least once in every Year.',
      'ARTICLE I, SECTION 5 (Rules & Quorum): Each House shall be the Judge of the Elections, Returns and Qualifications of its own Members, and a Majority of each shall constitute a Quorum to do Business. Each House may determine the Rules of its Proceedings, punish its Members for disorderly Behaviour, and, with the Concurrence of two thirds, expel a Member.',
      'ARTICLE I, SECTION 6 (Compensation & Privileges): The Senators and Representatives shall receive a Compensation for their Services, to be ascertained by Law. They shall in all Cases, except Treason, Felony and Breach of the Peace, be privileged from Arrest during their Attendance at the Session of their respective Houses, and in going to and returning from the same.',
      'ARTICLE I, SECTION 7 (Lawmaking & Veto): All Bills for raising Revenue shall originate in the House of Representatives. Every Bill which shall have passed the House of Representatives and the Senate, shall, before it become a Law, be presented to the President of the United States; If he approve he shall sign it, but if not he shall return it with his Objections. If after reconsideration two thirds of that House agree to pass the Bill, it shall be sent to the other House, and if approved by two thirds of that House, it shall become a Law.',
      'ARTICLE I, SECTION 8 (Powers of Congress): The Congress shall have Power: To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States; To borrow Money on the credit of the United States; To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes; To establish an uniform Rule of Naturalization, and uniform Laws on the subject of Bankruptcies; To coin Money, regulate the Value thereof, and of foreign Coin, and fix the Standard of Weights and Measures; To provide for the Punishment of counterfeiting; To establish Post Offices and post Roads; To promote the Progress of Science and useful Arts, by securing for limited Times to Authors and Inventors the exclusive Right to their respective Writings and Discoveries; To constitute Tribunals inferior to the supreme Court; To define and punish Piracies and Felonies committed on the high Seas, and Offences against the Law of Nations; To declare War, grant Letters of Marque and Reprisal, and make Rules concerning Captures on Land and Water; To raise and support Armies (no Appropriation for longer than two Years); To provide and maintain a Navy; To make Rules for the Government and Regulation of the land and naval Forces; To provide for calling forth the Militia to execute the Laws of the Union, suppress Insurrections and repel Invasions; To provide for organizing, arming, and disciplining, the Militia; To exercise exclusive Legislation over the District of seat of Government; AND To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers.',
      'ARTICLE I, SECTION 9 (Limits on Congress): The Privilege of the Writ of Habeas Corpus shall not be suspended, unless when in Cases of Rebellion or Invasion the public Safety may require it. No Bill of Attainder or ex post facto Law shall be passed. No Capitation, or other direct, Tax shall be laid, unless in Proportion to the Census. No Tax or Duty shall be laid on Articles exported from any State. No Preference shall be given to the Ports of one State over those of another. No Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law. No Title of Nobility shall be granted by the United States: And no Person holding any Office of Profit or Trust shall accept of any present, Emolument, Office, or Title from any King, Prince, or foreign State without Consent of Congress.',
      'ARTICLE I, SECTION 10 (Limits on States): No State shall enter into any Treaty, Alliance, or Confederation; grant Letters of Marque and Reprisal; coin Money; emit Bills of Credit; make any Thing but gold and silver Coin a Tender in Payment of Debts; pass any Bill of Attainder, ex post facto Law, or Law impairing the Obligation of Contracts, or grant any Title of Nobility. No State shall, without the Consent of the Congress, lay any Imposts or Duties on Imports or Exports, keep Troops or Ships of War in time of Peace, enter into any Agreement or Compact with another State or foreign Power, or engage in War, unless actually invaded, or in such imminent Danger as will not admit of delay.',
      'ARTICLE II, SECTION 1 (Executive Branch & President): The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term. Electors shall be appointed by each State equal to the whole Number of Senators and Representatives. No Person except a natural born Citizen, or a Citizen of the United States at the time of the Adoption of this Constitution, shall be eligible to the Office of President; neither shall any Person be eligible who shall not have attained to the Age of thirty five Years, and been fourteen Years a Resident within the United States. Presidential Oath: "I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States."',
      'ARTICLE II, SECTION 2 (Presidential Powers): The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia of the several States, when called into the actual Service of the United States; he may require the Opinion, in writing, of the principal Officer in each of the executive Departments; and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment. He shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur; and he shall nominate, and by and with the Advice and Consent of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the supreme Court, and all other Officers of the United States. The President shall have Power to fill up all Vacancies that may happen during the Recess of the Senate.',
      'ARTICLE II, SECTION 3 (Executive Duties): He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient; he may, on extraordinary Occasions, convene both Houses; he shall receive Ambassadors and other public Ministers; he shall take Care that the Laws be faithfully executed, and shall Commission all the Officers of the United States.',
      'ARTICLE II, SECTION 4 (Impeachment): The President, Vice President and all civil Officers of the United States, shall be removed from Office on Impeachment for, and Conviction of, Treason, Bribery, or other high Crimes and Misdemeanors.',
      'ARTICLE III, SECTION 1 (Judicial Power): The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour, and shall, at stated Times, receive for their Services, a Compensation, which shall not be diminished during their Continuance in Office.',
      'ARTICLE III, SECTION 2 (Jurisdiction & Trial by Jury): The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made; to all Cases affecting Ambassadors, other public Ministers and Consuls; to all Cases of admiralty and maritime Jurisdiction; to Controversies to which the United States shall be a Party; to Controversies between two or more States; between a State and Citizens of another State; between Citizens of different States. In all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party, the supreme Court shall have original Jurisdiction. In all other Cases, the supreme Court shall have appellate Jurisdiction. The Trial of all Crimes, except in Cases of Impeachment, shall be by Jury; and such Trial shall be held in the State where the said Crimes shall have been committed.',
      'ARTICLE III, SECTION 3 (Treason Defined): Treason against the United States, shall consist only in levying War against them, or in adhering to their Enemies, giving them Aid and Comfort. No Person shall be convicted of Treason unless on the Testimony of two Witnesses to the same overt Act, or on Confession in open Court. The Congress shall have Power to declare the Punishment of Treason, but no Attainder of Treason shall work Corruption of Blood, or Forfeiture except during the Life of the Person attainted.',
      'ARTICLE IV, SECTION 1 (Full Faith and Credit): Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State.',
      'ARTICLE IV, SECTION 2 (Privileges, Extradition): The Citizens of each State shall be entitled to all Privileges and Immunities of Citizens in the several States. A Person charged in any State with Treason, Felony, or other Crime, who shall flee from Justice, and be found in another State, shall on Demand of the executive Authority of the State from which he fled, be delivered up, to be removed to the State having Jurisdiction of the Crime.',
      'ARTICLE IV, SECTION 3 (New States & Territories): New States may be admitted by the Congress into this Union; but no new State shall be formed or erected within the Jurisdiction of any other State, nor any State be formed by the Junction of two or more States, without the Consent of the Legislatures of the States concerned as well as of the Congress. The Congress shall have Power to dispose of and make all needful Rules and Regulations respecting the Territory or other Property belonging to the United States.',
      'ARTICLE IV, SECTION 4 (Republican Form of Government): The United States shall guarantee to every State in this Union a Republican Form of Government, and shall protect each of them against Invasion; and on Application of the Legislature, or of the Executive (when the Legislature cannot be convened) against domestic Violence.',
      'ARTICLE V (Amendment Process): The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, or, on the Application of the Legislatures of two thirds of the several States, shall call a Convention for proposing Amendments, which, in either Case, shall be valid to all Intents and Purposes, as Part of this Constitution, when ratified by the Legislatures of three fourths of the several States, or by Conventions in three fourths thereof. Provided that no State, without its Consent, shall be deprived of its equal Suffrage in the Senate.',
      'ARTICLE VI (Debts, Supremacy & Oath): All Debts contracted and Engagements entered into, before the Adoption of this Constitution, shall be as valid against the United States under this Constitution, as under the Confederation. This Constitution, and the Laws of the United States which shall be made in Pursuance thereof; and all Treaties made, or which shall be made, under the Authority of the United States, shall be the SUPREME LAW OF THE LAND; and the Judges in every State shall be bound thereby, any Thing in the Constitution or Laws of any State to the Contrary notwithstanding. The Senators and Representatives before mentioned, and the Members of the several State Legislatures, and all executive and judicial Officers, both of the United States and of the several States, shall be bound by Oath or Affirmation, to support this Constitution; but no religious Test shall ever be required as a Qualification to any Office or public Trust under the United States.',
      'ARTICLE VII (Ratification): The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same. Done in Convention by the Unanimous Consent of the States present the Seventeenth Day of September in the Year of our Lord one thousand seven hundred and Eighty seven and of the Independence of the United States of America the Twelfth. In Witness whereof We have hereunto subscribed our Names: George Washington, President and deputy from Virginia, and 38 signers representing New Hampshire, Massachusetts, Connecticut, New York, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, North Carolina, South Carolina, and Georgia.'
    ]
  },

  // ==========================================
  // 2. THE UNITED STATES BILL OF RIGHTS (AMENDMENTS I–X)
  // ==========================================
  {
    id: 'us-constitution-bill-of-rights',
    category: 'constitutional_legal',
    subcategory: 'foundational_law',
    title: 'The United States Bill of Rights (Amendments I–X)',
    summary: 'The original ten amendments proposed by the First Congress on September 25, 1789, and ratified on December 15, 1791. The foundational codification of American civil liberties and structural checks on governmental power.',
    urgency: 'critical',
    keywords: [
      'Bill of Rights', 'First Amendment', 'Second Amendment', 'Third Amendment', 'Fourth Amendment',
      'Fifth Amendment', 'Sixth Amendment', 'Seventh Amendment', 'Eighth Amendment', 'Ninth Amendment',
      'Tenth Amendment', 'Free Speech', 'Bearing Arms', 'Search and Seizure', 'Due Process', 'Self-Incrimination'
    ],
    materials: [
      'Joint Resolution of Congress proposing twelve amendments to the Constitution (September 25, 1789)',
      'Ratification certificates deposited in the Department of State by eleven state legislatures'
    ],
    warnings: [
      'The Bill of Rights was originally drafted as a restriction on federal encroachment, but has been substantially incorporated against the States through the Due Process Clause of the Fourteenth Amendment.',
      'In emergency, disaster, or civil unrest situations, knowledge of 4th, 5th, and 2nd Amendment rights is vital for personal liberty defense.'
    ],
    tips: [
      'The 1st Amendment protects five distinct rights: religion (establishment & free exercise), speech, press, peaceful assembly, and petition for redress of grievances.',
      'The 4th Amendment requires particularized probable cause supported by oath or affirmation for judicial warrants.',
      'The 5th Amendment guarantees grand jury indictment, prohibits double jeopardy and compulsory self-incrimination, guarantees due process, and mandates just compensation for property takings.',
      'The 9th Amendment clarifies that the enumeration of certain rights shall not be construed to deny or disparage other unenumerated rights retained by the people.',
      'The 10th Amendment preserves the bedrock principle of federalism: powers not delegated to the federal government are reserved to the States or to the people.'
    ],
    protocols: [
      'AMENDMENT I (Freedoms of Religion, Speech, Press, Assembly, and Petition): Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
      'AMENDMENT II (Right to Keep and Bear Arms): A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
      'AMENDMENT III (Quartering of Soldiers): No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
      'AMENDMENT IV (Search and Seizure & Warrant Clause): The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.',
      'AMENDMENT V (Grand Jury, Double Jeopardy, Self-Incrimination, Due Process, Takings): No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.',
      'AMENDMENT VI (Rights in Criminal Prosecutions): In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the Assistance of Counsel for his defence.',
      'AMENDMENT VII (Civil Trial by Jury): In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law.',
      'AMENDMENT VIII (Cruel and Unusual Punishment, Excessive Bail/Fines): Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.',
      'AMENDMENT IX (Unenumerated Rights Retained by the People): The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.',
      'AMENDMENT X (Powers Reserved to the States and the People): The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.'
    ]
  },

  // ==========================================
  // 3. THE UNITED STATES CONSTITUTIONAL AMENDMENTS (XI–XXVII)
  // ==========================================
  {
    id: 'us-constitution-amendments-11-27',
    category: 'constitutional_legal',
    subcategory: 'foundational_law',
    title: 'The United States Constitutional Amendments (Amendments XI–XXVII)',
    summary: 'The complete, unabridged text of all seventeen subsequent amendments to the United States Constitution ratified between 1795 and 1992, including the Reconstruction Amendments, voting rights, presidential terms, and succession.',
    urgency: 'high',
    keywords: [
      'Amendments 11-27', 'Thirteenth Amendment', 'Fourteenth Amendment', 'Fifteenth Amendment',
      'Sixteenth Amendment', 'Nineteenth Amendment', 'Twenty-Second Amendment', 'Twenty-Fifth Amendment',
      'Civil Rights', 'Equal Protection', 'Citizenship', 'Abolition of Slavery', 'Suffrage', 'Presidential Succession'
    ],
    materials: [
      'Official Statutes at Large of the United States',
      'National Archives and Records Administration (NARA) certified enrollments'
    ],
    warnings: [
      'The 14th Amendment is the cornerstone of modern constitutional law, applying fundamental Bill of Rights protections against state and local government actions via the Incorporation Doctrine.',
      'The 18th Amendment (Prohibition) was explicitly repealed by the 21st Amendment in 1933, the only instance in American history of a constitutional amendment being repealed.'
    ],
    tips: [
      'The 13th Amendment eradicated slavery and involuntary servitude except as punishment for a crime whereof the party shall have been duly convicted.',
      'The 14th Amendment guarantees birthright citizenship, privileges and immunities, due process of law, and equal protection of the laws.',
      'The 25th Amendment provides the precise statutory mechanism for handling presidential disability, death, resignation, and vice presidential vacancies.'
    ],
    protocols: [
      'AMENDMENT XI (Ratified Feb 7, 1795 - Judicial Limits on State Suability): The Judicial power of the United States shall not be construed to extend to any suit in law or equity, commenced or prosecuted against one of the United States by Citizens of another State, or by Citizens or Subjects of any Foreign State.',
      'AMENDMENT XII (Ratified June 15, 1804 - Election of President and Vice-President): The Electors shall meet in their respective states and vote by ballot for President and Vice-President, one of whom, at least, shall not be an inhabitant of the same state with themselves; they shall name in their ballots the person voted for as President, and in distinct ballots the person voted for as Vice-President.',
      'AMENDMENT XIII (Ratified Dec 6, 1865 - Abolition of Slavery): SECTION 1. Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction. SECTION 2. Congress shall have power to enforce this article by appropriate legislation.',
      'AMENDMENT XIV (Ratified July 9, 1868 - Citizenship, Due Process & Equal Protection): SECTION 1. All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws. SECTION 2. Representatives shall be apportioned among the several States according to their respective numbers. SECTION 3. Disqualification for rebellion or insurrection against the United States after taking an oath to support the Constitution. SECTION 4. The validity of the public debt of the United States shall not be questioned. SECTION 5. The Congress shall have power to enforce, by appropriate legislation, the provisions of this article.',
      'AMENDMENT XV (Ratified Feb 3, 1870 - Voting Rights Not Denied by Race): SECTION 1. The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. SECTION 2. The Congress shall have power to enforce this article by appropriate legislation.',
      'AMENDMENT XVI (Ratified Feb 3, 1913 - Federal Income Tax): The Congress shall have power to lay and collect taxes on incomes, from whatever source derived, without apportionment among the several States, and without regard to any census or enumeration.',
      'AMENDMENT XVII (Ratified April 8, 1913 - Direct Election of U.S. Senators): The Senate of the United States shall be composed of two Senators from each State, elected by the people thereof, for six years; and each Senator shall have one vote. The electors in each State shall have the qualifications requisite for electors of the most numerous branch of the State legislatures.',
      'AMENDMENT XVIII (Ratified Jan 16, 1919 - Prohibition of Intoxicating Liquors [REPEALED BY AMENDMENT XXI]): After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.',
      'AMENDMENT XIX (Ratified Aug 18, 1920 - Women\'s Suffrage): The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex. Congress shall have power to enforce this article by appropriate legislation.',
      'AMENDMENT XX (Ratified Jan 23, 1933 - "Lame Duck" Terms & Succession): SECTION 1. The terms of the President and Vice President shall end at noon on the 20th day of January, and the terms of Senators and Representatives at noon on the 3d day of January. SECTION 2. The Congress shall assemble at least once in every year, beginning at noon on the 3d day of January. SECTION 3. If the President elect shall have died, the Vice President elect shall become President. If a President shall not have been chosen before the time fixed for the beginning of his term, or if the President elect shall have failed to qualify, then the Vice President elect shall act as President. SECTION 4. Congress may provide for the case of death of candidates in House or Senate elections.',
      'AMENDMENT XXI (Ratified Dec 5, 1933 - Repeal of Prohibition): SECTION 1. The eighteenth article of amendment to the Constitution of the United States is hereby repealed. SECTION 2. The transportation or importation into any State, Territory, or possession of the United States for delivery or use therein of intoxicating liquors, in violation of the laws thereof, is hereby prohibited.',
      'AMENDMENT XXII (Ratified Feb 27, 1951 - Presidential Two-Term Limit): SECTION 1. No person shall be elected to the office of the President more than twice, and no person who has held the office of President, or acted as President, for more than two years of a term to which some other person was elected President shall be elected to the office of the President more than once. SECTION 2. Ratification period.',
      'AMENDMENT XXIII (Ratified March 29, 1961 - Presidential Electors for District of Columbia): SECTION 1. The District constituting the seat of Government of the United States shall appoint a number of electors of President and Vice President equal to the whole number of Senators and Representatives in Congress to which the District would be entitled if it were a State, but in no event more than the least populous State. SECTION 2. Congress shall have power to enforce this article.',
      'AMENDMENT XXIV (Ratified Jan 23, 1964 - Abolition of Poll Taxes): SECTION 1. The right of citizens of the United States to vote in any primary or other election for President or Vice President, for electors for President or Vice President, or for Senator or Representative in Congress, shall not be denied or abridged by the United States or any State by reason of failure to pay any poll tax or other tax. SECTION 2. Congress shall have power to enforce this article.',
      'AMENDMENT XXV (Ratified Feb 10, 1967 - Presidential Disability & Succession): SECTION 1. In case of the removal of the President from office or of his death or resignation, the Vice President shall become President. SECTION 2. Whenever there is a vacancy in the office of the Vice President, the President shall nominate a Vice President who shall take office upon confirmation by a majority vote of both Houses of Congress. SECTION 3. Whenever the President transmits to the President pro tempore of the Senate and the Speaker of the House his written declaration that he is unable to discharge the powers and duties of his office, such powers and duties shall be discharged by the Vice President as Acting President. SECTION 4. Procedure for Vice President and majority of principal officers of executive departments declaring President unable to discharge powers.',
      'AMENDMENT XXVI (Ratified July 1, 1971 - Voting Age Lowered to 18): SECTION 1. The right of citizens of the United States, who are eighteen years of age or older, to vote shall not be denied or abridged by the United States or by any State on account of age. SECTION 2. The Congress shall have power to enforce this article by appropriate legislation.',
      'AMENDMENT XXVII (Ratified May 7, 1992 - Congressional Compensation Changes): No law, varying the compensation for the services of the Senators and Representatives, shall take effect, until an election of Representatives shall have intervened. [Note: Originally proposed September 25, 1789 by the First Congress, taking 202 years, 7 months, and 12 days to achieve ratification by 38 states].'
    ]
  },

  // ==========================================
  // 4. CONSTITUTIONAL RIGHTS IN EMERGENCIES & GRID-DOWN DEFENSE
  // ==========================================
  {
    id: 'us-constitution-emergency-rights',
    category: 'constitutional_legal',
    subcategory: 'civic_defense',
    title: 'Constitutional Rights in Grid-Down, Emergencies & Checkpoints',
    summary: 'A tactical civic defense guide examining how constitutional protections apply during declared national emergencies, martial law declarations, natural disasters, and civilian encounters with authorities.',
    urgency: 'critical',
    keywords: [
      'Constitutional Rights', 'Martial Law', 'Checkpoints', 'Emergency Declarations',
      'Habeas Corpus', 'Search and Seizure', 'Posse Comitatus', 'National Emergencies Act',
      'Fifth Amendment Silence', 'Insurrection Act', 'Civil Liberties'
    ],
    materials: [
      'Title 10 U.S. Code §§ 251-255 (Insurrection Act)',
      'Title 18 U.S. Code § 1385 (Posse Comitatus Act)',
      'National Emergencies Act (50 U.S.C. §§ 1601-1651)',
      'Stafford Disaster Relief and Emergency Assistance Act (42 U.S.C. § 5121 et seq.)'
    ],
    warnings: [
      'A governor or presidential declaration of emergency does NOT suspend the United States Constitution or revoke fundamental civil liberties guaranteed by the Bill of Rights.',
      'Under the Posse Comitatus Act (18 U.S.C. § 1385), active-duty military forces are prohibited from executing domestic civilian law enforcement duties unless expressly authorized by Congress (such as lawful invocation of the Insurrection Act).',
      'The Writ of Habeas Corpus can ONLY be suspended by the United States Congress pursuant to Article I, Section 9, Clause 2, and strictly in cases of actual rebellion or foreign invasion where public safety requires it.'
    ],
    tips: [
      'Fourth Amendment: You have the right to refuse consent to searches of your home, person, backpack, or vehicle in the absence of a signed judicial warrant or verified exigent circumstances.',
      'Fifth Amendment: You have the absolute right to remain silent and refuse self-incriminating interrogation. State clearly: "I am exercising my Fifth Amendment right to remain silent, and I request my attorney."',
      'Second Amendment & Disaster Firearms Protections: The 2006 Post-Katrina Emergency Management Reform Act (42 U.S.C. § 5207) explicitly prohibits federal, state, or municipal confiscation of lawfully possessed firearms during declared disasters or states of emergency.'
    ],
    protocols: [
      'STEP 1 (Encounter Protocol): Remain calm, keep hands visible, and avoid sudden movements. Do not physically resist even if you believe an encounter or detention is unlawful.',
      'STEP 2 (Determine Detention Status): Ask calmly and clearly: "Am I being detained, or am I free to go?" If the official states you are free to go, calmly leave the area.',
      'STEP 3 (Exercise 5th Amendment Silence): If detained, provide required identification if state law mandates (Stop-and-Identify statutes), but state: "I am exercising my right to remain silent. I will not answer questions without an attorney."',
      'STEP 4 (Withhold Search Consent): State clearly: "I do not consent to any search of my person, my bag, my vehicle, or my premises." An officer may pat down outer clothing for weapons if they have reasonable articulable suspicion (Terry stop), but cannot open closed containers without probable cause, a warrant, or exigent circumstances.',
      'STEP 5 (Vehicle Checkpoints): At temporary emergency or sobriety checkpoints, drivers are required to stop, provide driver license, vehicle registration, and proof of insurance upon request. Passengers are generally not required to identify unless suspected of an independent crime. You are not obligated to consent to a vehicular search.',
      'STEP 6 (Disaster Firearm Protection): Under 42 U.S.C. § 5207 (Disaster Recovery Personal Protection Act), emergency personnel and law enforcement CANNOT confiscate lawfully owned firearms or ammunition during a declared state of emergency or disaster.',
      'STEP 7 (Documenting Rights Infringements): As soon as safe, record officer badge numbers, patrol vehicle markings, names, agency jurisdictions, exact GPS coordinates, witness contacts, and timestamps of all directives.'
    ]
  }
];
