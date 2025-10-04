const hre = require("hardhat");

async function main() {
  const networkName = hre.network.name;
  console.log(`\n🚀 Deploying CommentWall to ${networkName}...`);

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`📝 Deploying with account: ${deployer.address}`);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`💰 Account balance: ${hre.ethers.formatEther(balance)} ETH`);

  // Deploy the contract
  const CommentWall = await hre.ethers.getContractFactory("CommentWall");
  const commentWall = await CommentWall.deploy();

  await commentWall.waitForDeployment();
  const address = await commentWall.getAddress();

  console.log(`\n✅ CommentWall deployed to: ${address}`);
  console.log(`🔗 Network: ${networkName}`);
  console.log(`📋 Transaction hash: ${commentWall.deploymentTransaction().hash}`);

  // Network-specific explorer URLs
  const explorers = {
    celo: `https://celoscan.io/address/${address}`,
    celoTestnet: `https://alfajores.celoscan.io/address/${address}`,
    arbitrum: `https://arbiscan.io/address/${address}`,
    arbitrumSepolia: `https://sepolia.arbiscan.io/address/${address}`,
  };

  if (explorers[networkName]) {
    console.log(`🔍 View on explorer: ${explorers[networkName]}`);
  }

  console.log(`\n📝 Save this address to your .env file:`);
  console.log(`NEXT_PUBLIC_${networkName.toUpperCase()}_CONTRACT_ADDRESS=${address}`);

  // Wait for block confirmations before verification
  if (networkName !== "localhost" && networkName !== "hardhat") {
    console.log("\n⏳ Waiting for block confirmations...");
    await commentWall.deploymentTransaction().wait(5);

    console.log("\n🔍 Verifying contract on block explorer...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
      console.log("You can verify manually later using:");
      console.log(`npx hardhat verify --network ${networkName} ${address}`);
    }
  }

  console.log("\n🎉 Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
