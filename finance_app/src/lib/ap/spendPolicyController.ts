/**
 * Corporate Spend Policy & Virtual Card Authorization Controller
 * 
 * Enforces real-time transaction limits, Merchant Category Code (MCC) restrictions,
 * single-merchant subscription locks, and Segregation of Duties (SOD) approval tiers.
 */

export interface SpendPolicy {
  policyId: string;
  name: string;
  singleTransactionLimit: number;
  monthlyLimit: number;
  allowedMCCs: string[];          // e.g. ['5734', '7372', '4816']
  blockedMCCs: string[];          // e.g. ['5813', '7995', '5944']
  allowedMerchants?: string[];    // For single-vendor locked cards (e.g. AWS)
  requireReceiptThreshold: number;// Transactions >= this amount require receipt within 48h
}

export interface SpendAuthorizationRequest {
  cardId: string;
  cardholderName: string;
  cardholderDepartment: string;
  amount: number;
  merchantName: string;
  mcc: string;
  currentMonthSpend: number;
  currency: string;
}

export type ApprovalTier = 'AUTO_APPROVED' | 'DEPARTMENT_LEAD' | 'VP_DIRECTOR' | 'CFO_DUAL_AUTH';

export interface AuthorizationResult {
  decision: 'APPROVED' | 'DECLINED' | 'REQUIRES_APPROVAL';
  requiredApprovalTier: ApprovalTier;
  reasons: string[];
  receiptRequired: boolean;
}

export const DEFAULT_CORPORATE_POLICIES: Record<string, SpendPolicy> = {
  ENGINEERING_SAAS: {
    policyId: 'pol-eng-saas',
    name: 'Engineering Infrastructure & Dev Tools',
    singleTransactionLimit: 5000,
    monthlyLimit: 25000,
    allowedMCCs: ['5734', '7372', '4816', '7379'], // Computer Software, Data Processing
    blockedMCCs: ['5813', '7995', '5944', '5921'], // Liquor, Gambling, Jewelry, Package Stores
    requireReceiptThreshold: 100
  },
  EXECUTIVE_TRAVEL: {
    policyId: 'pol-exec-travel',
    name: 'Executive Travel & Client Entertainment',
    singleTransactionLimit: 10000,
    monthlyLimit: 50000,
    allowedMCCs: ['3000', '4112', '7011', '5812'], // Airlines, Rail, Hotels, Eating Places
    blockedMCCs: ['7995', '5944'],
    requireReceiptThreshold: 50
  }
};

export class SpendPolicyController {
  public static evaluateAuthorization(
    request: SpendAuthorizationRequest,
    policy: SpendPolicy
  ): AuthorizationResult {
    const reasons: string[] = [];
    let isDeclined = false;

    // Check 1: MCC Blocklist
    if (policy.blockedMCCs.includes(request.mcc)) {
      isDeclined = true;
      reasons.push(`DECLINED: Merchant Category Code ${request.mcc} is strictly prohibited under corporate policy.`);
    }

    // Check 2: Single Transaction Limit
    if (request.amount > policy.singleTransactionLimit) {
      isDeclined = true;
      reasons.push(`DECLINED: Amount $${request.amount.toLocaleString()} exceeds single transaction limit ($${policy.singleTransactionLimit.toLocaleString()}).`);
    }

    // Check 3: Monthly Limit
    if (request.currentMonthSpend + request.amount > policy.monthlyLimit) {
      isDeclined = true;
      reasons.push(`DECLINED: Total monthly spend will exceed cycle budget of $${policy.monthlyLimit.toLocaleString()}.`);
    }

    // Check 4: Dedicated Merchant Lock
    if (policy.allowedMerchants && policy.allowedMerchants.length > 0) {
      const isAllowedMerchant = policy.allowedMerchants.some(m => 
        request.merchantName.toLowerCase().includes(m.toLowerCase())
      );
      if (!isAllowedMerchant) {
        isDeclined = true;
        reasons.push(`DECLINED: Virtual card is merchant-locked to [${policy.allowedMerchants.join(', ')}]. Attempted: ${request.merchantName}`);
      }
    }

    if (isDeclined) {
      return {
        decision: 'DECLINED',
        requiredApprovalTier: 'AUTO_APPROVED',
        reasons,
        receiptRequired: false
      };
    }

    // Check Segregation of Duties (SOD) Approval Routing
    let requiredTier: ApprovalTier = 'AUTO_APPROVED';
    if (request.amount > 10000) {
      requiredTier = 'CFO_DUAL_AUTH';
      reasons.push(`Amount > $10,000 requires CFO & Board dual-authorization before settlement.`);
    } else if (request.amount > 2500) {
      requiredTier = 'VP_DIRECTOR';
      reasons.push(`Amount between $2,500 and $10,000 routed to Department VP for signoff.`);
    } else if (request.amount > 500) {
      requiredTier = 'DEPARTMENT_LEAD';
      reasons.push(`Amount > $500 routed to Department Lead for confirmation.`);
    } else {
      reasons.push(`Transaction automatically authorized under policy threshold.`);
    }

    const receiptRequired = request.amount >= policy.requireReceiptThreshold;

    return {
      decision: requiredTier === 'AUTO_APPROVED' ? 'APPROVED' : 'REQUIRES_APPROVAL',
      requiredApprovalTier: requiredTier,
      reasons,
      receiptRequired
    };
  }
}
