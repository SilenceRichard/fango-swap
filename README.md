# fango-swap
fango's swap demo for fun

start local node
```
npx hardhat node
```

deploy contract
```
npx hardhat ignition deploy ./ignition/modules/fangoSwap.ts --network localhost
```

遇到部署问题：TransactionExecutionError: CreateContractSizeLimit

在部署的合约 PoolManager 的字节码大小超过了以太坊的合约创建大小限制（目前以太坊主网的大小限制是 24 KB）。这是一个常见的问题，特别是在复杂合约或多文件合约组合时。

在`hardhat.config.ts`中添加配置：
```diff
solidity: {
    version: "0.8.24",
+    settings: {
+      optimizer: {
+       enabled: true,
+       runs: 200, // 根据需要调整运行次数
+     },
+   },
  }
```

init wagmi

https://github.com/WTFAcademy/WTF-Dapp/blob/main/15_WagmiCli/readme.md

本地hardat网络CORS

在github codespace中将网络设置为公开