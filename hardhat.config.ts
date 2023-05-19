import { config as dotEnvConfig } from "dotenv";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-solhint";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "hardhat-etherscan-abi";
import "hardhat-contract-sizer";
import "@nomicfoundation/hardhat-toolbox";

import "./tasks";
import { compileSetting } from "./scripts/settings";

dotEnvConfig();
const exposedKey = process.env.EXPOSED_PRIVKEY;
const infuraKey = process.env.INFURA_API_KEY;
const etherscanKey = process.env.ETHERSCAN_API_KEY;
// tslint:disable-next-line:no-var-requires
const argv = require("yargs/yargs")()
  .env("")
  .options({
    hardhatChainId: {
      type: "number",
      default: 31337,
    },
  }).argv;

export default {
  defaultNetwork: "hardhat",
  networks: {
    ethereum: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      timeout: 99999,
      chainId: 1,
      gasMultiplier: 1.3,
      accounts: [exposedKey],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
      timeout: 99999,
      chainId: 137,
      gasMultiplier: 1.3,
      accounts: [exposedKey],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      timeout: 99999,
      accounts: [exposedKey],
    },
    metertest: {
      url: "http://rpctest.meter.io",
      chainId: 83,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [exposedKey],
    },
    metermain: {
      url: "http://rpc.meter.io",
      chainId: 82,
      timeout: 99999,
      gasPrice: 500000000000,
      accounts: [exposedKey],
    },
    basetest: {
      url: "https://goerli.base.org",
      chainId: 84531,
      accounts: [exposedKey],
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [exposedKey],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      chainId: 5,
      accounts: [exposedKey],
    },
  },
  etherscan: {
    apiKey: etherscanKey,
    customChains: [],
  },
  solidity: {
    compilers: [compileSetting("0.8.19", 200)],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 9999999999,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    gasPrice: 21,
  },
  typechain: {
    outDir: "typechain",
  },
};
