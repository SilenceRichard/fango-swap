import { encodeSqrtRatioX96 } from "@uniswap/v3-sdk";

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
      ? "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E"
      : "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E";
  }
  if (contract === "PositionManager") {
    return isProd
      ? "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690"
      : "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
  }
  if (contract === "SwapRouter") {
    return isProd
      ? "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB"
      : "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";
  }
  if (contract === "DebugTokenA") {
    return isProd
      ? "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      : "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  if (contract === "DebugTokenB") {
    return isProd
      ? "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      : "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  }
  if (contract === "DebugTokenC") {
    return isProd
      ? "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
      : "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  }
  throw new Error("Invalid contract");
};

export const parsePriceToSqrtPriceX96 = (price: number): bigint => {
  return BigInt(encodeSqrtRatioX96(price * 1000000, 1000000).toString());
};
