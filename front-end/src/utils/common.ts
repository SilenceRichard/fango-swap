/* eslint-disable @typescript-eslint/no-explicit-any */
import { encodeSqrtRatioX96, TickMath } from "@uniswap/v3-sdk";
import { minBy, maxBy } from "lodash-es";

export const getContractAddress = (
  contract:
    | "PoolManager"
    | "PositionManager"
    | "SwapRouter"
    | "DebugTokenA"
    | "DebugTokenB"
    | "DebugTokenC"
): `0x${string}` => {
  const isProd = process.env.NODE_ENV === "production";
  if (contract === "PoolManager") {
    return isProd
      ? "0x36b58F5C1969B7b6591D752ea6F5486D069010AB"
      : "0x36b58F5C1969B7b6591D752ea6F5486D069010AB";
  }
  if (contract === "PositionManager") {
    return isProd
      ? "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7"
      : "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7";
  }
  if (contract === "SwapRouter") {
    return isProd
      ? "0x0355B7B8cb128fA5692729Ab3AAa199C1753f726"
      : "0x0355B7B8cb128fA5692729Ab3AAa199C1753f726";
  }
  if (contract === "DebugTokenA") {
    return isProd
      ? "0xD8a5a9b31c3C0232E196d518E89Fd8bF83AcAd43"
      : "0xD8a5a9b31c3C0232E196d518E89Fd8bF83AcAd43";
  }
  if (contract === "DebugTokenB") {
    return isProd
      ? "0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD"
      : "0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD";
  }
  if (contract === "DebugTokenC") {
    return isProd
      ? "0x51A1ceB83B83F1985a81C295d1fF28Afef186E02"
      : "0x51A1ceB83B83F1985a81C295d1fF28Afef186E02";
  }
  throw new Error("Invalid contract");
};

export const parsePriceToSqrtPriceX96 = (price: number): bigint => {
  return BigInt(encodeSqrtRatioX96(price * 1000000, 1000000).toString());
};

export const computeSqrtPriceLimitX96 = (
  pools: {
    token0: `0x${string}`;
    token1: `0x${string}`;
    index: number;
    fee: number;
    feeProtocol: number;
    tickLower: number;
    tickUpper: number;
    tick: number;
    sqrtPriceX96: bigint;
    liquidity: bigint;
}[],
  zeroForOne: boolean
): bigint => {
  if (zeroForOne) {
    // 如果是 token0 交换 token1，那么交易完成后价格 token0 变多，价格下降下限
    // 先找到交易池的最小 tick
    const minTick =
      minBy(pools, (pool: any) => pool.tick)?.tick ?? TickMath.MIN_TICK;
    // 价格限制为最小 tick - 10000，避免价格过低，在实际项目中应该按照用户设置的滑点来调整
    const limitTick = Math.max(minTick - 10000, TickMath.MIN_TICK);
    return BigInt(TickMath.getSqrtRatioAtTick(limitTick).toString());
  } else {
    // 反之，设置一个最大的价格
    // 先找到交易池的最大 tick
    const maxTick =
      maxBy(pools, (pool: any) => pool.tick)?.tick ?? TickMath.MAX_TICK;
    // 价格限制为最大 tick + 10000，避免价格过高，在实际项目中应该按照用户设置的滑点来调整
    const limitTick = Math.min(maxTick + 10000, TickMath.MAX_TICK);
    return BigInt(TickMath.getSqrtRatioAtTick(limitTick).toString());
  }
};

const DECIMAL = 18;

// 把数字转化为大整数，支持 4 位小数
export const parseAmountToBigInt = (amount: number): bigint => {
  return (
    BigInt(Math.floor(amount * 10000)) *
    BigInt(10 ** ((DECIMAL || 18) - 4))
  );
};

// 把大整数转化为数字，支持 4 位小数
export const parseBigIntToAmount = (amount: bigint): number => {
  return (
    Number((amount / BigInt(10 ** ((DECIMAL || 18) - 4))).toString()) /
    10000
  );
};
export const formatBalance = (value: bigint | number, decimals: number, fixed?: number): string => {
  const bigValue = typeof value === 'bigint' ? value : BigInt(value);
  const divisor = BigInt(10 ** decimals);
  const displayValue = bigValue / divisor;
  const fraction = bigValue % divisor;

  if (fraction === 0n && fixed === undefined) {
    return `${displayValue}`;
  }

  let fractionStr = fraction.toString().padStart(decimals, '0');
  if (fixed === undefined) {
    return `${displayValue}.${fractionStr.replace(/0+$/, '')}`;
  }
  fractionStr = fractionStr.substring(0, fixed).padEnd(fixed, '0');
  return `${displayValue}.${fractionStr}`;
};