/**
 * IRS Section 83(b) Election Generator & Statutory Deadline Monitor
 * 
 * Generates legally binding Section 83(b) elections under Internal Revenue Code Section 83(b).
 * Computes the strict statutory 30-day post-grant filing deadline and formats IRS Certified
 * Mail packets with Return Receipt Requested.
 */

export interface Section83bElectionInput {
  taxpayerName: string;
  taxpayerSSN: string; // Formatted or masked
  taxpayerAddress: string;
  spouseName?: string;
  companyName: string;
  companyEIN: string;
  companyAddress: string;
  sharesCount: number;
  shareClassDescription: string;
  transferDate: string; // YYYY-MM-DD
  fairMarketValuePerShare: number;
  amountPaidPerShare: number;
  vestingScheduleDescription: string;
}

export interface Section83bFilingPackage {
  filingDeadline: string;          // Strictly 30 calendar days from transferDate
  daysRemaining: number;
  isExpired: boolean;
  irsServiceCenterAddress: string;
  electionLetterText: string;
  coverLetterText: string;
  certifiedMailInstructions: string[];
}

export class Section83bEngine {
  /**
   * Computes statutory 30-day deadline from property transfer date
   */
  public static calculateDeadline(transferDateStr: string): { deadlineDate: Date; daysRemaining: number; isExpired: boolean } {
    const transferDate = new Date(transferDateStr);
    const deadline = new Date(transferDate);
    deadline.setDate(deadline.getDate() + 30);

    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      deadlineDate: deadline,
      daysRemaining,
      isExpired: daysRemaining < 0
    };
  }

  /**
   * Generates the complete IRS Section 83(b) election document package
   */
  public static generatePackage(input: Section83bElectionInput): Section83bFilingPackage {
    const { deadlineDate, daysRemaining, isExpired } = this.calculateDeadline(input.transferDate);
    const deadlineFormatted = deadlineDate.toISOString().split('T')[0];

    const totalFMV = input.sharesCount * input.fairMarketValuePerShare;
    const totalPaid = input.sharesCount * input.amountPaidPerShare;
    const taxableIncome = Math.max(0, totalFMV - totalPaid);

    const electionLetterText = `ELECTION UNDER SECTION 83(b) OF THE INTERNAL REVENUE CODE

Department of the Treasury
Internal Revenue Service

The undersigned taxpayer hereby elects, pursuant to Section 83(b) of the Internal Revenue Code of 1986, as amended, to include in gross income for the taxable year the excess (if any) of the fair market value of the property described below over the amount paid for such property.

1. Taxpayer Information:
   Name: ${input.taxpayerName}
   Address: ${input.taxpayerAddress}
   Taxpayer Identification Number (SSN/ITIN): ${input.taxpayerSSN}

2. Property Description:
   ${input.sharesCount.toLocaleString()} shares of ${input.shareClassDescription} of ${input.companyName} (EIN: ${input.companyEIN}).

3. Date of Transfer:
   ${input.transferDate}
   Taxable year for which election is made: ${new Date(input.transferDate).getFullYear()}

4. Nature of Restrictions to Which Property is Subject:
   The shares are subject to forfeiture/repurchase at original cost by ${input.companyName} upon termination of service, vesting in accordance with: ${input.vestingScheduleDescription}.

5. Fair Market Value:
   Fair Market Value at time of transfer: $${totalFMV.toFixed(2)} ($${input.fairMarketValuePerShare.toFixed(4)} per share).

6. Amount Paid for Property:
   Amount paid: $${totalPaid.toFixed(2)} ($${input.amountPaidPerShare.toFixed(4)} per share).

7. Gross Income Amount:
   Amount to include in gross income pursuant to IRC Section 83(b): $${taxableIncome.toFixed(2)}.

8. Submission & Copies:
   A copy of this election has been submitted to ${input.companyName}, the entity for whom services are performed.

Dated: ${new Date().toISOString().split('T')[0]}

_________________________________________
${input.taxpayerName} (Taxpayer Signature)
`;

    const coverLetterText = `Department of the Treasury
Internal Revenue Service Center

RE: ELECTION PURSUANT TO IRC SECTION 83(b)
Taxpayer: ${input.taxpayerName}
SSN: ${input.taxpayerSSN}

Dear IRS Official:

Enclosed please find an original and one duplicate copy of an Election under Section 83(b) of the Internal Revenue Code executed by the above-referenced taxpayer.

Kindly file the original election and stamp the duplicate copy with your file-mark and date, and return it in the enclosed self-addressed, stamped envelope.

Sincerely,

${input.taxpayerName}
`;

    return {
      filingDeadline: deadlineFormatted,
      daysRemaining,
      isExpired,
      irsServiceCenterAddress: "Internal Revenue Service Center (based on taxpayer's legal residence state)",
      electionLetterText,
      coverLetterText,
      certifiedMailInstructions: [
        "1. Print two copies of the Section 83(b) Election and one copy of the Cover Letter.",
        "2. Sign both Election copies in blue or black ink.",
        "3. Send the original + duplicate + self-addressed stamped envelope via USPS Certified Mail with Return Receipt Requested.",
        "4. Postmark MUST be within 30 days of transfer (" + deadlineFormatted + ").",
        "5. Provide one signed copy to " + input.companyName + " HR / Cap Table records.",
        "6. Retain USPS Certified Mail receipt and IRS stamped return copy with permanent tax records."
      ]
    };
  }
}
