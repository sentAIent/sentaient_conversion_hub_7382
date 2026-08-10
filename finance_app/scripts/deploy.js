const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Get balance via provider for ether v6
  const provider = hre.ethers.provider;
  const balance = await provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  console.log("Deploying TokenFactory...");
  
  // Note: Adjust the contract name to match your exact Solidity factory name
  const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
  const factory = await TokenFactory.deploy();
  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("TokenFactory deployed to:", address);
  
  console.log("Save this address in your frontend configuration!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
