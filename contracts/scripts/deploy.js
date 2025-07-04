const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AIProxyNumber contract...");

  // Get the contract factory
  const AIProxyNumber = await ethers.getContractFactory("AIProxyNumber");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get network info
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;
  console.log("Network Chain ID:", chainId);

  // Deploy the contract
  const aiProxyNumber = await AIProxyNumber.deploy();
  await aiProxyNumber.waitForDeployment();

  const contractAddress = await aiProxyNumber.getAddress();
  console.log("AIProxyNumber deployed to:", contractAddress);

  // Get the price from the contract
  const price = await aiProxyNumber.price();
  const priceInEther = ethers.formatEther(price);
  
  console.log("Contract price:", priceInEther, "native tokens");
  console.log("Owner:", await aiProxyNumber.owner());

  // Network-specific information
  const networkNames = {
    11155111: "Sepolia",
    3567: "Flow EVM Testnet", // 0x221 in hex
    314159: "Filecoin Calibration" // 0x4cb2f in hex
  };

  const networkName = networkNames[chainId] || "Unknown Network";
  console.log("Network:", networkName);

  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    chainId: chainId,
    contractAddress: contractAddress,
    owner: deployer.address,
    price: priceInEther,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("Network:", deploymentInfo.network);
  console.log("Chain ID:", deploymentInfo.chainId);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Owner:", deploymentInfo.owner);
  console.log("Price:", deploymentInfo.price, "native tokens");
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Timestamp:", deploymentInfo.timestamp);

  // You can save this to a file if needed
  // const fs = require('fs');
  // fs.writeFileSync(`deployment-${chainId}.json`, JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 