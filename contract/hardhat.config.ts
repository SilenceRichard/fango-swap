import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { PRIVATE_KEY } from './.key';

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.g.alchemy.com/v2/cEALgnMYS1N0l6ZOp7JawQmDytmSfLpJ",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for deployment size
      },
    },
  },
};

export default config;
