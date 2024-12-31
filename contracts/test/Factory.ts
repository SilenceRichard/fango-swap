import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Factory", function () {
  // 这里定义了一个fixture function，用于设置测试环境的初始状态
  // 部署一个名为 "Factory" 的智能合约，并获取一个公共客户端实例
  // https://hardhat.org/hardhat-runner/docs/advanced/using-viem
  async function deployFixture() {
    const factory = await hre.viem.deployContract("Factory");
    const publicClient = await hre.viem.getPublicClient();

    return {
      factory,
      publicClient,
    };
  }

  it("createPool", async function () {
    // 通过loadFixture函数加载夹具函数，获取部署的Factory合约实例和公共客户端实例
    const { factory, publicClient } = await loadFixture(deployFixture);
    const tokenA: `0x${string}` = "0xEcd0D12E21805803f70de03B72B1C162dB0898d9";
    const tokenB: `0x${string}` = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    const hash = await factory.write.createPool([
      tokenA,
      tokenB,
      1, // tickLower
      100000, // tickUpper
      3000, // fee
    ]);
    await publicClient.waitForTransactionReceipt({ hash });
    const createEvents = await factory.getEvents.PoolCreated();
    // simulate for test return address
    const poolAddress = await factory.simulate.createPool([
      tokenA,
      tokenB,
      1,
      100000,
      3000,
    ]);
    expect(poolAddress.result).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(poolAddress.result).to.equal(createEvents[0].args.pool);
    expect(createEvents).to.have.lengthOf(1);
    //  0x 开头，后面跟随 40 个十六进制字符（即 0-9 和 a-f 或 A-F）的字符串。
    expect(createEvents[0].args.pool).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(createEvents[0].args.token0).to.equal(tokenB);
    expect(createEvents[0].args.token1).to.equal(tokenA);
    expect(createEvents[0].args.tickLower).to.equal(1);
    expect(createEvents[0].args.tickUpper).to.equal(100000);
    expect(createEvents[0].args.fee).to.equal(3000);
  });
  it("createPool with same token", async function () {
    const { factory } = await loadFixture(deployFixture);
    const tokenA: `0x${string}` = "0xEcd0D12E21805803f70de03B72B1C162dB0898d9";
    const tokenB: `0x${string}` = "0xEcd0D12E21805803f70de03B72B1C162dB0898d9";
    await expect(
      factory.write.createPool([tokenA, tokenB, 1, 100000, 3000])
    ).to.be.rejectedWith("IDENTICAL_ADDRESSES");
  
    await expect(factory.read.getPool([tokenA, tokenB, 3])).to.be.rejectedWith(
      "IDENTICAL_ADDRESSES"
    );
  });
});
