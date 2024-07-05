const hre = require("hardhat");

async function main() {
  const addressToImpersonate = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  console.log("Impersonating account:", addressToImpersonate);

  // Impersonate the account
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [addressToImpersonate],
  });

  // Get the impersonated signer
  const impersonatedSigner = await ethers.getSigner(addressToImpersonate);
  // Log initial balance
  const initialBalance = await ethers.provider.getBalance(addressToImpersonate);
  console.log("Initial balance:", ethers.formatEther(initialBalance), "ETH");

  console.log("Deploying SwapExamples contract...");

  // Deploy the contract
  const SwapExamples = await hre.ethers.getContractFactory("SwapExamples");
  const swapExamplesDeployTx = await SwapExamples.connect(
    impersonatedSigner
  ).deploy("0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45");

  // Wait for the transaction to be mined
  const swapExamples = await swapExamplesDeployTx.waitForDeployment();

  console.log("SwapExamples deployed to:", await swapExamples.getAddress());

  const daiAddress = await swapExamples.DAI();
  const usdcAddress = await swapExamples.USDC();

  console.log("DAI address:", daiAddress);
  console.log("USDC address:", usdcAddress);

  // Stop impersonating the account
  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [addressToImpersonate],
  });

  console.log("Stopped impersonating account");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
