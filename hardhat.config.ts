import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-deploy';
import fs from "fs";

// not a real key, just for example
let TESTNET_KEY = "5a1f79a620a138efe808996ae89e42e3a17d4e672ef8727c51c85af704b4faea";
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
