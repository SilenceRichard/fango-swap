import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/utils/contracts.ts",
  plugins: [
    hardhat({
      project: "../contract",
    }),
    react(),
  ],
});