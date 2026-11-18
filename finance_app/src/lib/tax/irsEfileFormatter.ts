/**
 * IRS 1099-NEC / 1099-MISC e-Filing Formatter (IRIS & FIRE Specs)
 * 
 * Prepares contractor tax information returns for direct submission to the IRS
 * Information Returns Intake System (IRIS) Application-to-Application (A2A) XML
 * format and Publication 1220 FIRE format.
 */

export interface PayeeRecord {
  id: string;
  recipientTIN: string; // SSN or EIN (9 digits)
  tinType: 'EIN' | 'SSN';
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  nonemployeeCompensation: number; // Box 1 for 1099-NEC
  federalIncomeTaxWithheld?: number; // Box 4
  stateTaxWithheld?: number; // Box 5
  stateIncome?: number; // Box 7
}

export interface PayerInfo {
  payerEIN: string;
  payerName: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  tccCode?: string; // Transmitter Control Code
}

export class IRSEfileFormatter {
  /**
   * Sanitizes and validates Taxpayer Identification Numbers (TIN)
   */
  public static validateTIN(tin: string): boolean {
    const clean = tin.replace(/\D/g, '');
    return clean.length === 9 && !/^0{9}|1{9}|9{9}$/.test(clean);
  }

  /**
   * Generates IRS IRIS XML envelope for 1099-NEC returns
   */
  public static generateIRISXml(payer: PayerInfo, payees: PayeeRecord[], taxYear: number = new Date().getFullYear()): string {
    const validPayees = payees.filter(p => p.nonemployeeCompensation >= 600);

    const xmlLines: string[] = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<Form1099NECPackage xmlns="urn:us:gov:treasury:irs:msg:iris:form1099nec:v1.0" taxYear="${taxYear}">`,
      `  <TransmissionHeader>`,
      `    <TransmitterControlCode>${payer.tccCode || 'DEFAULT_TCC'}</TransmitterControlCode>`,
      `    <PayerEIN>${payer.payerEIN.replace(/\D/g, '')}</PayerEIN>`,
      `    <PayerName>${payer.payerName}</PayerName>`,
      `    <Timestamp>${new Date().toISOString()}</Timestamp>`,
      `  </TransmissionHeader>`,
      `  <FormsList totalReturns="${validPayees.length}">`
    ];

    for (const payee of validPayees) {
      const cleanTIN = payee.recipientTIN.replace(/\D/g, '');
      xmlLines.push(
        `    <Form1099NEC id="${payee.id}">`,
        `      <RecipientTIN type="${payee.tinType}">${cleanTIN}</RecipientTIN>`,
        `      <RecipientName>${payee.name}</RecipientName>`,
        `      <AddressLine1>${payee.addressLine1}</AddressLine1>`,
        `      <City>${payee.city}</City>`,
        `      <State>${payee.state}</State>`,
        `      <ZIP>${payee.zip}</ZIP>`,
        `      <Box1NonemployeeCompensation>${payee.nonemployeeCompensation.toFixed(2)}</Box1NonemployeeCompensation>`,
        `      <Box4FederalTaxWithheld>${(payee.federalIncomeTaxWithheld || 0).toFixed(2)}</Box4FederalTaxWithheld>`,
        `    </Form1099NEC>`
      );
    }

    xmlLines.push(
      `  </FormsList>`,
      `</Form1099NECPackage>`
    );

    return xmlLines.join('\n');
  }

  /**
   * Generates 1099-NEC Summary Breakdown
   */
  public static generateSummary(payees: PayeeRecord[]): {
    totalRecipients: number;
    qualifyingRecipients: number; // >= $600 threshold
    exemptRecipients: number; // < $600 threshold
    totalCompensationUSD: number;
    totalTaxWithheldUSD: number;
  } {
    let qualifying = 0;
    let exempt = 0;
    let totalComp = 0;
    let totalWithheld = 0;

    for (const p of payees) {
      if (p.nonemployeeCompensation >= 600) {
        qualifying++;
        totalComp += p.nonemployeeCompensation;
        totalWithheld += p.federalIncomeTaxWithheld || 0;
      } else {
        exempt++;
      }
    }

    return {
      totalRecipients: payees.length,
      qualifyingRecipients: qualifying,
      exemptRecipients: exempt,
      totalCompensationUSD: Number(totalComp.toFixed(2)),
      totalTaxWithheldUSD: Number(totalWithheld.toFixed(2))
    };
  }
}
