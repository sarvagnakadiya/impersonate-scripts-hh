require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/9-2O3J1H0d0Z-xDdDwZHHCBM2mwzVMwT",
      },
    },
    local: {
      url: "http://127.0.0.1:8545/",
    },
  },
};
