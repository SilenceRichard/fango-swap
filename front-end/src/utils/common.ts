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
      ? "0x7969c5eD335650692Bc04293B07F5BF2e7A673C0"
      : "0x7969c5eD335650692Bc04293B07F5BF2e7A673C0";
  }
  if (contract === "PositionManager") {
    return isProd
      ? "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650"
      : "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650";
  }
  if (contract === "SwapRouter") {
    return isProd
      ? "0xc351628EB244ec633d5f21fBD6621e1a683B1181"
      : "0xc351628EB244ec633d5f21fBD6621e1a683B1181";
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
