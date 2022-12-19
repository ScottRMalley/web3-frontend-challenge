import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-deploy';
import fs from "fs";

let TESTNET_KEY = "";
if (fs.existsSync('./testnet-deploy.key')) {
  TESTNET_KEY = fs.readFileSync('./testnet-deploy.key').toString().trim();
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    avax_fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [TESTNET_KEY]
    }
  },
};

export default config;
