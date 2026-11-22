/**
 * Corporate Treasury Sweeps & ISO 20022 Payment Engine
 * 
 * Automates multi-account target balance sweeps:
 * Directs excess liquidity above operational buffer into tokenized US Treasury
 * yield instruments (Ondo USDY, Franklin Templeton BENJI, BlackRock BUIDL)
 * and generates ISO 20022 pain.001.001.09 payment initiation instructions.
 */

export interface YieldInstrument {
  id: string;
  name: string;
  symbol: string;
  apy: number;
  provider: string;
  liquidityTier: 'T+0_INSTANT' | 'T+1_DAILY' | 'T+2_STANDARD';
  tokenAddress?: string;
  chain?: string;
  minimumInvestment: number;
}

export interface TreasuryAccount {
  accountNumber: string;
  bankName: string;
  currentBalance: number;
  targetOperatingBalance: number;
  sweepEnabled: boolean;
  designatedYieldId: string;
}

export interface SweepExecutionOrder {
  orderId: string;
  timestamp: string;
  sourceAccount: string;
  destinationYield: YieldInstrument;
  sweepAmount: number;
  projectedAnnualYield: number;
  status: 'SCHEDULED' | 'EXECUTING' | 'SETTLED';
  iso20022InstructionId: string;
}

export const INSTITUTIONAL_YIELD_INSTRUMENTS: YieldInstrument[] = [
  {
    id: 'yield-usdy',
    name: 'Ondo US Dollar Yield (USDY)',
    symbol: 'USDY',
    apy: 5.10,
    provider: 'Ondo Finance / Ankura Trust',
    liquidityTier: 'T+0_INSTANT',
    tokenAddress: '0x969609273665476a6dC459807E92966e364658B5',
    chain: 'Ethereum / Base',
    minimumInvestment: 500
  },
  {
    id: 'yield-benji',
    name: 'Franklin OnChain U.S. Government Money Fund',
    symbol: 'BENJI',
    apy: 5.25,
    provider: 'Franklin Templeton (SEC Regulated)',
    liquidityTier: 'T+1_DAILY',
    tokenAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    chain: 'Polygon / Stellar',
    minimumInvestment: 1000
  },
  {
    id: 'yield-buidl',
    name: 'BlackRock USD Institutional Digital Liquidity Fund',
    symbol: 'BUIDL',
    apy: 5.15,
    provider: 'BlackRock / Securitize',
    liquidityTier: 'T+0_INSTANT',
    tokenAddress: '0x7712c3420373714b1677df5020464e53298544c0',
    chain: 'Ethereum',
    minimumInvestment: 5000000
  }
];

export class TreasurySweepsEngine {
  /**
   * Evaluates an account balance against target operating buffer and generates sweep order
   */
  public static evaluateSweep(account: TreasuryAccount): SweepExecutionOrder | null {
    if (!account.sweepEnabled) return null;

    const excess = account.currentBalance - account.targetOperatingBalance;
    if (excess <= 0) return null;

    const targetYield = INSTITUTIONAL_YIELD_INSTRUMENTS.find(y => y.id === account.designatedYieldId) 
      || INSTITUTIONAL_YIELD_INSTRUMENTS[0];

    const projectedYield = (excess * (targetYield.apy / 100));
    const instructionId = `ISO-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    return {
      orderId: `SWP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      sourceAccount: account.accountNumber,
      destinationYield: targetYield,
      sweepAmount: Number(excess.toFixed(2)),
      projectedAnnualYield: Number(projectedYield.toFixed(2)),
      status: 'SCHEDULED',
      iso20022InstructionId: instructionId
    };
  }

  /**
   * Generates ISO 20022 pain.001.001.09 CustomerCreditTransferInitiation XML
   */
  public static generateISO20022CreditTransfer(
    instructionId: string,
    amount: number,
    debtorIbanOrAccount: string,
    creditorName: string,
    creditorIbanOrAccount: string
  ): string {
    const messageId = `MSG-${Date.now()}`;
    const creationTime = new Date().toISOString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${messageId}</MsgId>
      <CreDtTm>${creationTime}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${amount.toFixed(2)}</CtrlSum>
      <InitgPty>
        <Nm>Liquid Autonomous Treasury</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${instructionId}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt>${creationTime.split('T')[0]}</ReqdExctnDt>
      <Dbtr>
        <Nm>Liquid Treasury Holding Co.</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <Othr>
            <Id>${debtorIbanOrAccount}</Id>
          </Othr>
        </Id>
      </DbtrAcct>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>${instructionId}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="USD">${amount.toFixed(2)}</InstdAmt>
        </Amt>
        <Cdtr>
          <Nm>${creditorName}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <Othr>
              <Id>${creditorIbanOrAccount}</Id>
            </Othr>
          </Id>
        </CdtrAcct>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
  }

  /**
   * Resolves ACH/FedNow Return Code to human-readable remediation
   */
  public static resolveReturnCode(code: string): { meaning: string; actionableRemedy: string } {
    const codes: Record<string, { meaning: string; actionableRemedy: string }> = {
      R01: { meaning: 'Insufficient Funds', actionableRemedy: 'Wait for balance sweep or re-route from backup treasury account.' },
      R02: { meaning: 'Account Closed', actionableRemedy: 'Update beneficiary bank account details before retrying.' },
      R03: { meaning: 'No Account / Unable to Locate', actionableRemedy: 'Verify routing and transit account number.' },
      R08: { meaning: 'Payment Stopped', actionableRemedy: 'Contact creditor to verify stop-payment order.' },
      R16: { meaning: 'Account Frozen / OFAC Match', actionableRemedy: 'Escalate to compliance team for sanctions screening verification.' }
    };

    return codes[code] || { meaning: 'General Clearing Error', actionableRemedy: 'Inspect FedLine wire exception report.' };
  }
}
