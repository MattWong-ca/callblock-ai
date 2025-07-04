const { ethers } = require("hardhat");

// Network-specific configurations
const NETWORK_CONFIG = {
  11155111: { // Sepolia
    name: "Sepolia",
    price: ethers.parseEther("0.01"), // 0.01 ETH
    symbol: "ETH"
  },
  3567: { // Flow EVM Testnet (0x221)
    name: "Flow EVM Testnet", 
    price: ethers.parseEther("25"), // 25 FLOW
    symbol: "FLOW"
  },
  314159: { // Filecoin Calibration (0x4cb2f)
    name: "Filecoin Calibration",
    price: ethers.parseEther("0.01"), // 0.01 FIL
    symbol: "FIL"
  }
};

async function main() {
  console.log("Deploying AIProxyNumber contract with network-specific configuration...");

  // Get the contract factory
  const AIProxyNumber = await ethers.getContractFactory("AIProxyNumber");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get network info
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;
  console.log("Network Chain ID:", chainId);

  // Get network configuration
  const networkConfig = NETWORK_CONFIG[chainId];
  if (!networkConfig) {
    console.error("Unsupported network. Supported networks:", Object.keys(NETWORK_CONFIG).map(id => `${id} (${NETWORK_CONFIG[id].name})`));
    process.exit(1);
  }

  console.log("Network:", networkConfig.name);
  console.log("Price:", ethers.formatEther(networkConfig.price), networkConfig.symbol);

  // Deploy the contract
  const aiProxyNumber = await AIProxyNumber.deploy();
  await aiProxyNumber.waitForDeployment();

  const contractAddress = await aiProxyNumber.getAddress();
  console.log("AIProxyNumber deployed to:", contractAddress);

  // Verify the price in the contract
  const contractPrice = await aiProxyNumber.price();
  const contractPriceInEther = ethers.formatEther(contractPrice);
  
  console.log("Contract price:", contractPriceInEther, "native tokens");
  console.log("Owner:", await aiProxyNumber.owner());

  // Save deployment info
  const deploymentInfo = {
    network: networkConfig.name,
    chainId: chainId,
    contractAddress: contractAddress,
    owner: deployer.address,
    price: contractPriceInEther,
    symbol: networkConfig.symbol,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("Network:", deploymentInfo.network);
  console.log("Chain ID:", deploymentInfo.chainId);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Owner:", deploymentInfo.owner);
  console.log("Price:", deploymentInfo.price, deploymentInfo.symbol);
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Timestamp:", deploymentInfo.timestamp);

  // Save deployment info to file
  const fs = require('fs');
  const fileName = `deployment-${networkConfig.name.toLowerCase().replace(/\s+/g, '-')}-${chainId}.json`;
  fs.writeFileSync(fileName, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\nDeployment info saved to: ${fileName}`);

  // Update frontend config
  const frontendConfig = {
    [`0x${chainId.toString(16)}`]: {
      name: networkConfig.name,
      symbol: networkConfig.symbol,
      contractAddress: contractAddress
    }
  };

  console.log("\nFrontend Config (add to your NETWORK_CONFIG):");
  console.log("==============================================");
  console.log(JSON.stringify(frontendConfig, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 