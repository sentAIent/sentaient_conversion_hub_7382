/**
 * Institutional Expansion Automated Verification Suite for Liquid
 * 
 * Verifies all expanded enterprise engines:
 * 1. CapTableEngine & Senior Liquidation Waterfall
 * 2. Valuation409AEngine (Black-Scholes OPM Backsolve + DLOM)
 * 3. Section83bEngine (Statutory 30-day Countdown & Tax Packet)
 * 4. TreasurySweepsEngine (Tokenized T-Bills Ondo/BUIDL + ISO 20022 Wire)
 * 5. RunwayStressEngine (1,000-iteration Monte Carlo Simulation)
 * 6. ThreeWayMatchingEngine (PO vs GRN vs Invoice Line Matching)
 * 7. SpendPolicyController (Virtual Card Limits, MCC Blocks, SOD Tiers)
 * 8. SafeMultiSigService (EIP-712 SafeTx Hashing & Ascending Signature Aggregation)
 * 9. ContractVerificationService (Compiler Metadata & Block Explorer Payloads)
 * 10. MevGasOptimizer (EIP-1559 Dynamic Fees & Private RPC Sentry)
 * 11. FbarFatcaTracker (FinCEN Form 114 $10k & IRS 8938 $50k Foreign Account Monitors)
 * 12. GlobalVatGstEngine (Multi-Jurisdiction OSS / HMRC / CRA Digital Sales Nexus)
 * 13. TransferPricingEngine (OECD Arm's Length CPM/TNMM & ISA Agreement)
 * 14. DualReportingEngine (Side-by-side US GAAP ASC 350/842 vs IFRS IAS 38/IFRS 16)
 * 15. SocAuditVault (Continuous AICPA SOC 1/2 Evidence & SHA-256 Merkle Root Seal)
 * 16. NativeWidgetEngine (iOS WidgetKit & Android Glance Serialized Timelines)
 * 17. PushNotificationSentry (APNs & FCM Prioritized Financial Alert Dispatcher)
 */

import { CapTableEngine } from '../src/lib/equity/capTableEngine';
import { Valuation409AEngine } from '../src/lib/equity/valuation409A';
import { Section83bEngine } from '../src/lib/equity/section83bEngine';
import { TreasurySweepsEngine } from '../src/lib/treasury/treasurySweepsEngine';
import { RunwayStressEngine } from '../src/lib/treasury/runwayStressEngine';
import { ThreeWayMatchingEngine } from '../src/lib/ap/threeWayMatchingEngine';
import { SpendPolicyController, DEFAULT_CORPORATE_POLICIES } from '../src/lib/ap/spendPolicyController';
import { SafeMultiSigService } from '../src/lib/web3/safeMultiSigService';
import { ContractVerificationService } from '../src/lib/web3/contractVerificationService';
import { MevGasOptimizer } from '../src/lib/web3/mevGasOptimizer';
import { FbarFatcaTracker } from '../src/lib/tax/fbarFatcaTracker';
import { GlobalVatGstEngine } from '../src/lib/tax/globalVatGstEngine';
import { TransferPricingEngine } from '../src/lib/tax/transferPricingEngine';
import { DualReportingEngine } from '../src/lib/compliance/dualReportingEngine';
import { SocAuditVault } from '../src/lib/compliance/socAuditVault';
import { NativeWidgetEngine } from '../src/lib/mobile/nativeWidgetEngine';
import { PushNotificationSentry } from '../src/lib/mobile/pushNotificationSentry';

function runInstitutionalVerificationSuite() {
  console.log('================================================================');
  console.log('   LIQUID SOVEREIGN INSTITUTIONAL EXPANSION VERIFICATION SUITE   ');
  console.log('================================================================\n');

  let passedAssertions = 0;

  function assert(condition: boolean, message: string) {
    if (!condition) {
      console.error(`❌ FAILED: ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
    passedAssertions++;
    console.log(`   ✓ ${message}`);
  }

  // 1. Cap Table & Liquidation Waterfall
  console.log('1. Testing Cap Table & Senior Liquidation Waterfall...');
  const capTable = new CapTableEngine();
  const totalShares = capTable.getTotalFullyDilutedShares();
  assert(totalShares === 10000000, `Fully diluted shares equal 10,000,000 (actual: ${totalShares})`);
  
  const waterfallLow = capTable.simulateWaterfall(5000000); // Below total pref
  assert(waterfallLow.commonSharePrice === 0, 'Common stock payout is $0 in downside scenario');
  assert(waterfallLow.distributions.some(p => p.shareClass === 'COMMON' && p.totalProceeds === 0), 'Founders receive $0 below pref');

  const waterfallHigh = capTable.simulateWaterfall(50000000);
  assert(waterfallHigh.commonSharePrice > 0, 'Common stock receives remaining proceeds in $50M exit');
  assert(waterfallHigh.totalDistributed === 50000000, 'Exact $50,000,000 distributed in waterfall');

  // 2. 409A OPM Backsolve Valuation
  console.log('2. Testing 409A Valuation & Black-Scholes OPM Backsolve...');
  const fmv = Valuation409AEngine.calculate409A({
    enterpriseValuation: 30000000,
    liquidationPreferenceTotal: 6000000,
    totalCommonShares: 7000000,
    totalPreferredShares: 2000000,
    timeToLiquidityYears: 2.5,
    riskFreeRate: 0.042,
    volatility: 0.65,
    dlomDiscountRate: 0.25
  });
  assert(fmv.final409AFairMarketValue > 0 && fmv.final409AFairMarketValue < 5, `Reasonable Common FMV calculated: $${fmv.final409AFairMarketValue}`);
  assert(fmv.dlomApplied === 25, 'DLOM discount correctly set to 25%');

  // 3. Section 83(b) Election Package
  console.log('3. Testing IRS Section 83(b) Election Engine...');
  const sec83b = Section83bEngine.generatePackage({
    taxpayerName: 'Sarah Jenkins',
    taxpayerSSN: 'XXX-XX-4892',
    taxpayerAddress: '450 Mission St, San Francisco, CA',
    companyName: 'Liquid Technologies Inc.',
    companyEIN: 'XX-XXXXXXX',
    companyAddress: '100 Montgomery St, San Francisco, CA',
    sharesCount: 500000,
    shareClassDescription: 'Common Stock',
    transferDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    fairMarketValuePerShare: 0.10,
    amountPaidPerShare: 0.001,
    vestingScheduleDescription: '4-year vesting with 1-year cliff'
  });
  assert(sec83b.daysRemaining >= 24 && sec83b.daysRemaining <= 26, `Statutory 30-day countdown accurate (${sec83b.daysRemaining} days left)`);
  assert(sec83b.electionLetterText.includes('Section 83(b) of the Internal Revenue Code'), 'Election letter generated with statutory citations');
  assert(sec83b.certifiedMailInstructions.length > 0, 'Certified mail instructions generated');

  // 4. Corporate Treasury Sweeps & ISO 20022 Wire
  console.log('4. Testing Treasury Sweeps & ISO 20022 Wire Engine...');
  const sweep = TreasurySweepsEngine.evaluateSweep({
    accountNumber: 'ACC-8839-441',
    bankName: 'JPMorgan Chase Treasury',
    currentBalance: 3500000,
    targetOperatingBalance: 1000000,
    sweepEnabled: true,
    designatedYieldId: 'yield-usdy'
  });
  assert(sweep !== null && sweep.sweepAmount === 2500000, 'Exact $2,500,000 sweep order created');
  assert(sweep !== null && sweep.destinationYield.apy === 5.10, 'Ondo USDY 5.10% yield selected');
  
  const isoXml = TreasurySweepsEngine.generateISO20022CreditTransfer(
    sweep?.iso20022InstructionId || 'ISO-TEST',
    sweep?.sweepAmount || 2500000,
    'US12345678901234',
    'Ondo Finance Primary Custody',
    'US98765432109876'
  );
  assert(isoXml.includes('pain.001.001.09'), 'ISO 20022 pain.001.001.09 compliant XML generated');

  // 5. Monte Carlo Runway Stress Engine
  console.log('5. Testing 1,000-Iteration Monte Carlo Runway Engine...');
  const runway = RunwayStressEngine.simulate({
    currentCashBalance: 5000000,
    monthlyRevenueBase: 100000,
    monthlyGrowthRateMean: 0.05,
    monthlyGrowthRateStdDev: 0.02,
    monthlyBurnBase: 250000,
    burnGrowthRatePerMonth: 0.01,
    scenarios: {
      macroDownturnActive: false,
      hiringFreezeActive: false
    },
    iterations: 1000
  });
  assert(runway.p50RunwayMonths >= 12, `Median P50 runway computed: ${runway.p50RunwayMonths} months`);
  assert(runway.zeroCashProbability24M >= 0 && runway.zeroCashProbability24M <= 100, 'Probability within [0, 100]% range');

  // 6. AP 3-Way Matching Engine
  console.log('6. Testing Accounts Payable 3-Way Matching Engine...');
  const matchResult = ThreeWayMatchingEngine.match(
    {
      poNumber: 'PO-100',
      vendorName: 'AWS',
      createdDate: '2026-11-01',
      currency: 'USD',
      totalAmount: 10000,
      items: [{ id: '1', sku: 'EC2', description: 'Instances', quantityOrdered: 10, unitPrice: 1000, totalPrice: 10000 }]
    },
    {
      grnNumber: 'GRN-100',
      poNumber: 'PO-100',
      receivedDate: '2026-11-05',
      receivedItems: [{ sku: 'EC2', quantityReceived: 10, condition: 'ACCEPTED' }]
    },
    {
      invoiceNumber: 'INV-100',
      poNumber: 'PO-100',
      vendorName: 'AWS',
      invoiceDate: '2026-11-10',
      dueDate: '2026-12-10',
      totalAmountBilled: 10000,
      billedItems: [{ sku: 'EC2', description: 'Instances', quantityBilled: 10, unitPriceBilled: 1000, totalBilled: 10000 }]
    }
  );
  assert(matchResult.matchStatus === 'APPROVED_FOR_PAYMENT', 'Clean PO/GRN/Invoice matches with APPROVED_FOR_PAYMENT');
  assert(matchResult.authorizedPayableAmount === 10000, 'Authorized exact $10,000 payment');

  // 7. Spend Policy Controller
  console.log('7. Testing Spend Policy & Virtual Card Controller...');
    const authAuto = SpendPolicyController.evaluateAuthorization(
    {
      cardId: 'c1',
      cardholderName: 'Alice',
      cardholderDepartment: 'Engineering',
      amount: 450,
      merchantName: 'GitHub Enterprise',
      mcc: '7372',
      currentMonthSpend: 1000,
      currency: 'USD'
    },
    DEFAULT_CORPORATE_POLICIES.ENGINEERING_SAAS
  );
  assert(authAuto.decision === 'APPROVED', 'Engineering SaaS purchase below limit is APPROVED');
  assert(authAuto.requiredApprovalTier === 'AUTO_APPROVED', 'Under threshold transaction is AUTO_APPROVED');

  const authBlocked = SpendPolicyController.evaluateAuthorization(
    {
      cardId: 'c1',
      cardholderName: 'Bob',
      cardholderDepartment: 'Engineering',
      amount: 150,
      merchantName: 'Casino Resort',
      mcc: '7995', // Gambling
      currentMonthSpend: 1000,
      currency: 'USD'
    },
    DEFAULT_CORPORATE_POLICIES.ENGINEERING_SAAS
  );
  assert(authBlocked.decision === 'DECLINED', 'Blocked gambling MCC 7995 is DECLINED');

  // 8. Safe Multi-Sig Service
  console.log('8. Testing Gnosis Safe Multi-Sig EIP-712 Hashing...');
  const safeHash = SafeMultiSigService.computeSafeTxHash(
    '0x71C836d5D0D3e061a7B77443F86D1217e13fe3a4',
    1,
    {
      to: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      value: '0',
      data: '0x',
      operation: 0,
      safeTxGas: '0',
      baseGas: '0',
      gasPrice: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
      refundReceiver: '0x0000000000000000000000000000000000000000',
      nonce: 1
    }
  );
  assert(safeHash.startsWith('0x') && safeHash.length === 66, 'Valid 32-byte EIP-712 SafeTxHash computed');

  const aggregated = SafeMultiSigService.aggregateSignatures([
    { signerAddress: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', signature: '0x12', signedAt: '' },
    { signerAddress: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', signature: '0x34', signedAt: '' }
  ]);
  assert(aggregated === '0x3412', 'Signatures correctly ordered in ascending address order (0xaaaa... then 0xbbbb...)');

  // 9. Contract Verification Service
  console.log('9. Testing Block Explorer Source Verification Formatter...');
  const payload = ContractVerificationService.buildVerificationPayload({
    contractAddress: '0x1234567890123456789012345678901234567890',
    contractName: 'TestToken',
    sourceCode: 'contract TestToken {}',
    compilerVersion: 'v0.8.20+commit.a1b79de6',
    chainId: 1
  });
  assert(payload.action === 'verifysourcecode', 'Etherscan payload action is verifysourcecode');
  assert(payload.contractname === 'TestToken', 'Contract name properly formatted in payload');

  // 10. MEV Gas Optimizer
  console.log('10. Testing MEV & EIP-1559 Dynamic Gas Optimizer...');
  const gasFees = MevGasOptimizer.calculateEip1559Fees('urgent');
  assert(gasFees.maxPriorityFeePerGasGwei >= 2.5, 'Urgent tier priority tip is at least 2.5 Gwei');
  assert(gasFees.maxFeePerGasGwei > gasFees.baseFeeGwei, 'Max fee exceeds base fee');

  // 11. FBAR / FATCA Tracker
  console.log('11. Testing FinCEN 114 (FBAR) & IRS 8938 (FATCA) Tracker...');
  const fbarExempt = FbarFatcaTracker.evaluate([
    { id: '1', institutionName: 'Bank A', countryCode: 'UK', accountType: 'FOREIGN_BANK', accountNumberMasked: '****1', currency: 'GBP', currentBalanceUSD: 4000, peakBalanceCalendarYearUSD: 4000 }
  ]);
  assert(fbarExempt.fbarFilingRequired === false, 'Below $10k aggregate peak is FBAR exempt');

  const fbarTriggered = FbarFatcaTracker.evaluate([
    { id: '1', institutionName: 'Bank A', countryCode: 'UK', accountType: 'FOREIGN_BANK', accountNumberMasked: '****1', currency: 'GBP', currentBalanceUSD: 7000, peakBalanceCalendarYearUSD: 7000 },
    { id: '2', institutionName: 'Binance BVI', countryCode: 'VG', accountType: 'FOREIGN_CRYPTO_EXCHANGE', accountNumberMasked: '****2', currency: 'USDT', currentBalanceUSD: 5000, peakBalanceCalendarYearUSD: 5000 }
  ]);
  assert(fbarTriggered.fbarFilingRequired === true, 'Aggregate peak $12,000 triggers mandatory FBAR filing');
  assert(fbarTriggered.aggregatePeakBalanceUSD === 12000, 'Aggregate peak balance matches $12,000');

  // 12. Global VAT / GST Nexus Engine
  console.log('12. Testing Global VAT / GST Digital Services Nexus Engine...');
  const vatResult = GlobalVatGstEngine.evaluateNexus([
    { countryCode: 'EU', salesVolumeUSD: 15000 },
    { countryCode: 'AU', salesVolumeUSD: 20000 }
  ]);
  const euStatus = vatResult.statuses.find(s => s.countryCode === 'EU');
  const auStatus = vatResult.statuses.find(s => s.countryCode === 'AU');
  assert(euStatus?.thresholdMet === true, 'EU OSS nexus triggered over statutory threshold');
  assert(euStatus?.registrationScheme === 'EU Non-Union One-Stop-Shop (OSS)', 'Identified EU OSS scheme');
  assert(auStatus?.thresholdMet === false, 'AU nexus not triggered under threshold');

  // 13. OECD Transfer Pricing Engine
  console.log('13. Testing OECD Transfer Pricing & Intercompany Engine...');
  const tpReport = TransferPricingEngine.calculate([
    {
      serviceId: 'S-1',
      description: 'R&D',
      providerEntity: 'US Inc',
      providerCountry: 'US',
      recipientEntity: 'Ireland Ltd',
      recipientCountry: 'IE',
      directCostUSD: 100000,
      indirectCostAllocatedUSD: 20000,
      markupPercent: 8.0,
      serviceType: 'SOFTWARE_RD'
    }
  ]);
  assert(tpReport.totalCostBasisUSD === 120000, 'Cost base correctly aggregated to $120,000');
  assert(tpReport.totalMarkupProfitUSD === 9600, '8% markup equals $9,600');
  assert(tpReport.totalIntercompanyChargesUSD === 129600, 'Total intercompany invoice equals $129,600');
  assert(tpReport.agreementContractText.toLowerCase().includes("arm's length"), 'Intercompany contract contains arm\'s length clause');

  // 14. Dual US GAAP vs IFRS Reporting Engine
  console.log('14. Testing Dual US GAAP vs IFRS Accounting Reconciler...');
  const dual = DualReportingEngine.reconcile({
    revenueGross: 10000000,
    softwareDevelopmentCostsTotal: 2000000,
    developmentPhaseQualifyingPercent: 80,
    annualOperatingLeaseRent: 300000,
    leasePresentValueROU: 1200000,
    discountRate: 0.05,
    otherOpex: 2000000
  });
  assert(dual.ifrsNetIncomeUSD > dual.gaapNetIncomeUSD, 'IFRS Net Income higher due to IAS 38 development capitalization');
  assert(dual.comparisonTable.length === 4, 'Comparison table contains all primary financial statement rows');

  // 15. SOC 1 & 2 Evidence Vault
  console.log('15. Testing Continuous SOC 1 & SOC 2 Cryptographic Evidence Vault...');
  const soc = SocAuditVault.generateDossier('Liquid Technologies Inc.');
  assert(soc.overallComplianceScore === 100, 'All AICPA Trust Services Criteria score 100%');
  assert(soc.dossierMerkleRoot.startsWith('0x') && soc.dossierMerkleRoot.length === 66, 'SHA-256 Merkle root integrity seal valid');
  assert(soc.evidenceItems.length === 4, '4 continuous trust controls validated');

  // 16. Native Mobile Widget Engine
  console.log('16. Testing Native iOS WidgetKit & Android Glance Serializer...');
  const widgetData = NativeWidgetEngine.generateWidgetData(4500000, 240000, 5.10, 3);
  assert(widgetData.cashRunwayMonths > 0, 'Runway months calculated');
  assert(widgetData.zkSolvencyStatus === '100%_VERIFIED', 'ZK Solvency status verified');

  // 17. Push Notification Sentry
  console.log('17. Testing Prioritized APNs & FCM Push Notification Sentry...');
  const notif83b = PushNotificationSentry.create83bDeadlineAlert('Sarah Jenkins', 5);
  assert(notif83b.priority === 'HIGH', 'High priority 83(b) alert dispatched');
  assert(notif83b.category === 'SECTION_83B_DEADLINE', 'Category matched');

  const notifMulti = PushNotificationSentry.createMultiSigSignRequest('Main Safe', 500000, '0x1234567890123456789012345678901234567890');
  assert(notifMulti.category === 'MULTISIG_SIGN_REQUEST', 'MultiSig sign request category matched');
  assert(notifMulti.priority === 'HIGH', 'MultiSig sign request is HIGH priority');

  console.log('\n================================================================');
  console.log(`🎉 ALL ${passedAssertions} INSTITUTIONAL ASSERTIONS PASSED WITH ZERO ERRORS!`);
  console.log('================================================================\n');
}

runInstitutionalVerificationSuite();
