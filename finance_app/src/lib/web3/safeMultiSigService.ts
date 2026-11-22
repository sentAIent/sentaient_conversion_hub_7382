/**
 * Gnosis Safe Multi-Sig Transaction Builder & Signature Aggregator
 * 
 * Complies with Gnosis Safe v1.3.0 / v1.4.1 EIP-712 execution specifications.
 * Enforces ascending signer address ordering, batch MultiSend encoding,
 * and threshold verification for institutional Web3 treasury wallets.
 */

import { ethers } from 'ethers';

export interface SafeTransactionData {
  to: string;
  value: string;             // in wei or '0'
  data: string;              // hex encoded calldata
  operation: 0 | 1;          // 0 = Call, 1 = DelegateCall
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: number;
}

export interface SignerConfirmation {
  signerAddress: string;
  signature: string;         // 65-byte hex signature (r, s, v)
  signedAt: string;
}

export interface MultiSigProposal {
  proposalId: string;
  safeAddress: string;
  chainId: number;
  threshold: number;
  owners: string[];
  txData: SafeTransactionData;
  confirmations: SignerConfirmation[];
  isExecutable: boolean;
  safeTxHash: string;
}

export class SafeMultiSigService {
  public static readonly MULTISEND_ADDRESS = '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526';

  /**
   * Computes the official EIP-712 SafeTxHash for signing
   */
  public static computeSafeTxHash(
    safeAddress: string,
    chainId: number,
    txData: SafeTransactionData
  ): string {
    const domain = {
      verifyingContract: ethers.getAddress(safeAddress.toLowerCase()),
      chainId: chainId
    };

    const types = {
      SafeTx: [
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'operation', type: 'uint8' },
        { name: 'safeTxGas', type: 'uint256' },
        { name: 'baseGas', type: 'uint256' },
        { name: 'gasPrice', type: 'uint256' },
        { name: 'gasToken', type: 'address' },
        { name: 'refundReceiver', type: 'address' },
        { name: 'nonce', type: 'uint256' }
      ]
    };

    const normalizedTx = {
      ...txData,
      to: ethers.getAddress(txData.to.toLowerCase()),
      gasToken: ethers.getAddress(txData.gasToken.toLowerCase()),
      refundReceiver: ethers.getAddress(txData.refundReceiver.toLowerCase())
    };

    return ethers.TypedDataEncoder.hash(domain, types, normalizedTx);
  }

  /**
   * Sorts and aggregates 65-byte signatures strictly by ascending signer address
   * as required by Gnosis Safe smart contract checkSignatures()
   */
  public static aggregateSignatures(confirmations: SignerConfirmation[]): string {
    const sorted = [...confirmations].sort((a, b) => 
      a.signerAddress.toLowerCase().localeCompare(b.signerAddress.toLowerCase())
    );

    let combined = '0x';
    for (const conf of sorted) {
      const cleanSig = conf.signature.startsWith('0x') ? conf.signature.slice(2) : conf.signature;
      combined += cleanSig;
    }

    return combined;
  }

  /**
   * Encodes multiple transactions into Gnosis Safe MultiSend byte payload:
   * Each tx: operation (1 byte) + to (20 bytes) + value (32 bytes) + data length (32 bytes) + data
   */
  public static encodeMultiSend(
    transactions: { to: string; value: string; data: string; operation: 0 | 1 }[]
  ): string {
    let payload = '0x';

    for (const tx of transactions) {
      const op = ethers.zeroPadValue(ethers.toBeHex(tx.operation), 1);
      const to = ethers.getAddress(tx.to);
      const val = ethers.zeroPadValue(ethers.toBeHex(BigInt(tx.value || '0')), 32);
      const dataBytes = ethers.getBytes(tx.data || '0x');
      const dataLen = ethers.zeroPadValue(ethers.toBeHex(dataBytes.length), 32);

      payload += op.slice(2);
      payload += to.slice(2).toLowerCase();
      payload += val.slice(2);
      payload += dataLen.slice(2);
      payload += (tx.data.startsWith('0x') ? tx.data.slice(2) : tx.data);
    }

    return payload;
  }

  /**
   * Evaluates proposal readiness against required threshold
   */
  public static evaluateProposal(proposal: MultiSigProposal): {
    isReady: boolean;
    missingSignaturesCount: number;
    aggregatedSignatures: string;
  } {
    const validSigners = new Set(proposal.owners.map(o => o.toLowerCase()));
    const uniqueConfirmed = new Map<string, SignerConfirmation>();

    for (const conf of proposal.confirmations) {
      if (validSigners.has(conf.signerAddress.toLowerCase())) {
        uniqueConfirmed.set(conf.signerAddress.toLowerCase(), conf);
      }
    }

    const uniqueList = Array.from(uniqueConfirmed.values());
    const isReady = uniqueList.length >= proposal.threshold;
    const missingSignaturesCount = Math.max(0, proposal.threshold - uniqueList.length);
    const aggregatedSignatures = this.aggregateSignatures(uniqueList);

    return {
      isReady,
      missingSignaturesCount,
      aggregatedSignatures
    };
  }
}
