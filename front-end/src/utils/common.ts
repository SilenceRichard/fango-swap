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
      ? "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
      : "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
  }
  if (contract === "PositionManager") {
    return isProd
      ? "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"
      : "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  }
  if (contract === "SwapRouter") {
    return isProd
      ? "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
      : "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
  }
  if (contract === "DebugTokenA") {
    return isProd
      ? "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
      : "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  }
  if (contract === "DebugTokenB") {
    return isProd
      ? "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
      : "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  }
  if (contract === "DebugTokenC") {
    return isProd
      ? "0x0165878A594ca255338adfa4d48449f69242Eb8F"
      : "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  }
  throw new Error("Invalid contract");
};

export const parsePriceToSqrtPriceX96 = (price: number): bigint => {
  return BigInt(encodeSqrtRatioX96(price * 1000000, 1000000).toString());
};
