import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http("https://fluffy-potato-g7qvx7wrgrrh9579-8545.app.github.dev/")
  },
})