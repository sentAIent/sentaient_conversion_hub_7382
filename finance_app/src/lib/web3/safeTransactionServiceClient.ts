/**
 * Gnosis Safe Transaction Service REST Client
 * 
 * Interacts with the official Safe Transaction Service across Ethereum, Base, Arbitrum,
 * and Polygon to query multisig wallet state, fetch queued transactions, and propose/confirm executions.
 */

import { SafeTransactionData, SignerConfirmation } from './safeMultiSigService';

export interface SafeServiceProposalRequest {
  safeAddress: string;
  chainId: number;
  txData: SafeTransactionData;
  safeTxHash: string;
  senderAddress: string;
  signature: string;
  origin?: string;
}

export interface QueuedSafeTransaction {
  safeTxHash: string;
  to: string;
  value: string;
  data: string;
  operation: number;
  nonce: number;
  submissionDate: string;
  executionDate: string | null;
  isExecuted: boolean;
  confirmationsRequired: number;
  confirmations: SignerConfirmation[];
}

export class SafeTransactionServiceClient {
  public static readonly SERVICE_BASE_URLS: Record<number, string> = {
    1: 'https://safe-transaction-mainnet.safe.global',
    8453: 'https://safe-transaction-base.safe.global',
    42161: 'https://safe-transaction-arbitrum.safe.global',
    137: 'https://safe-transaction-polygon.safe.global',
    11155111: 'https://safe-transaction-sepolia.safe.global'
  };

  public static getBaseUrl(chainId: number): string {
    return this.SERVICE_BASE_URLS[chainId] || this.SERVICE_BASE_URLS[1];
  }

  /**
   * Formats the payload to propose a transaction to the Safe Transaction Service
   */
  public static buildProposalPayload(req: SafeServiceProposalRequest): Record<string, any> {
    return {
      to: req.txData.to,
      value: req.txData.value,
      data: req.txData.data,
      operation: req.txData.operation,
      gasToken: req.txData.gasToken,
      safeTxGas: req.txData.safeTxGas,
      baseGas: req.txData.baseGas,
      gasPrice: req.txData.gasPrice,
      refundReceiver: req.txData.refundReceiver,
      nonce: req.txData.nonce,
      contractTransactionHash: req.safeTxHash,
      sender: req.senderAddress,
      signature: req.signature,
      origin: req.origin || 'Liquid Autonomous Multi-Sig Treasury'
    };
  }

  /**
   * Evaluates if a queued transaction meets the threshold to be executed on-chain
   */
  public static isExecutable(tx: QueuedSafeTransaction): boolean {
    return !tx.isExecuted && tx.confirmations.length >= tx.confirmationsRequired;
  }
}
