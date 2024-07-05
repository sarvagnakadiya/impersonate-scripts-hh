const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployedAddress = "0x0E3a4c6b38AB6fb0c57704785532435949644A9F";

  //   const addressToImpersonate = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  //   console.log("Impersonating account:", addressToImpersonate);
  //   await hre.network.provider.request({
  //     method: "hardhat_impersonateAccount",
  //     params: [addressToImpersonate],
  //   });

  //   const impersonatedSigner = await ethers.getSigner(addressToImpersonate);
  //   const initialBalance = await ethers.provider.getBalance(addressToImpersonate);
  //   console.log("Initial balance:", ethers.formatEther(initialBalance), "ETH");

  // --------
  console.log("Interacting with SwapExamples at:", deployedAddress);

  // Get the contract instance
  const SwapExamples = await hre.ethers.getContractFactory("SwapExamples");
  const swapExamples = SwapExamples.attach(deployedAddress);

  // Call functions
  const daiAddress = await swapExamples.DAI();
  const usdcAddress = await swapExamples.USDC();

  console.log("DAI address:", daiAddress);
  console.log("USDC address:", usdcAddress);

  // You can add more function calls here
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
