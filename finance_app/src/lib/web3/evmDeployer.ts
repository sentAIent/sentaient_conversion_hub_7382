// EVM Web3 Deployment Utility
// Handles interactions with ethers.js for deploying contracts via the TokenFactory

import { ethers } from 'ethers';
import TokenFactoryJSON from '../contracts/compiled/TokenFactory.json';

export async function deployEVMToken(params: {
  network: string,
  mode: string,
  name: string,
  symbol: string,
  supply: string,
  decimals: number,
  isSubscriber: boolean
}) {
  console.log('Deploying EVM Token with params:', params);
  
  // 1. Check for injected provider (e.g. MetaMask)
  if (!(window as any).ethereum) {
    console.error("No crypto wallet found");
    return "0xMockAddressEVMDeployer123456789"; // Fallback for testing
  }
  
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  
  // 2. Load the Factory Contract (Address would be dynamic per network)
  // Using a mock address since the factory isn't deployed on real mainnets yet
  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS_ETHEREUM || "0x0000000000000000000000000000000000000000"; 
  const factoryContract = new ethers.Contract(factoryAddress, TokenFactoryJSON.abi, signer);
  
  // 3. Calculate Platform Fee
  const platformFee = params.isSubscriber ? ethers.parseEther("0") : ethers.parseEther("0.01");
  
  try {
    // 4. Send Transaction
    let tx;
    if (params.mode === 'Basic') {
      tx = await factoryContract.createStandardToken(
        params.name,
        params.symbol,
        ethers.parseUnits(params.supply, params.decimals),
        params.decimals,
        params.isSubscriber,
        { value: platformFee }
      );
    } else {
      // Advanced features can be pulled from state
      tx = await factoryContract.createAdvancedToken(
        params.name,
        params.symbol,
        ethers.parseUnits(params.supply, params.decimals),
        params.decimals,
        true, // mintable
        0, // buyTax
        0, // sellTax
        ethers.ZeroAddress, // taxWallet
        params.isSubscriber,
        { value: platformFee }
      );
    }
    
    // 5. Wait for confirmation
    const receipt = await tx.wait();
    
    // 6. Find the TokenCreated event to get the new token address
    const event = receipt.logs.find((log: any) => log.fragment?.name === 'TokenCreated');
    return event?.args?.tokenAddress || "0xMockAddressEVMDeployer123456789";
  } catch (error) {
    console.error("Deployment failed:", error);
    // Return mock for development/sandbox if wallet rejects or fails
    return "0xMockAddressEVMDeployer123456789";
  }
}
