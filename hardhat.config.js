require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomicfoundation/hardhat-verify");
// require("./tasks/block-number");
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FRAX_PRIVATE_KEY = process.env.FRAX_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetworks: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    frax: {
      url: "https://rpc.testnet.frax.com",
      accounts: [FRAX_PRIVATE_KEY],
      chainId: 2522,
    },
  },
  solidity: "0.8.17",
};
