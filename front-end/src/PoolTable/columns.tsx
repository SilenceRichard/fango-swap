"use client";

import { TOKEN_LIST } from "@/constant";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PoolList = {
  token0: `0x${string}`;
  token1: `0x${string}`;
  index: number;
  fee: number;
  feeProtocol: number;
  tickLower: number;
  tickUpper: number;
  tick: number;
  sqrtPriceX96: bigint;
};

export const columns: ColumnDef<PoolList>[] = [
  {
    accessorKey: "token0",
    header: "Token 0",
    cell: (cell) => {
      const tokenAddress: string = cell.getValue() as unknown as string;
      return <div>{TOKEN_LIST[tokenAddress]}</div>;
    },
  },
  {
    accessorKey: "token1",
    header: "Token 1",
    cell: (cell) => {
      const tokenAddress: string = cell.getValue() as unknown as string;
      return <div>{TOKEN_LIST[tokenAddress]}</div>;
    },
  },
  {
    accessorKey: "liquidity",
    header: () => <div className="whitespace-nowrap">Liquidity</div>,
    cell: (cell) => { 
      const liquidity: bigint = cell.getValue() as unknown as bigint;
      const formattedLiquidity = Number(liquidity) / 10 ** 18; // 假设流动性是以18位小数表示的
      return <div>{formattedLiquidity.toFixed(6)}</div>; // 展示6位小数
    },
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
  {
    accessorKey: "tickLower",
    header: "Price Lower",
    cell: (cell) => {
      const tickLower: number = cell.getValue() as unknown as number;
      const realPrice = Math.pow(1.0001, tickLower);
      return <div>{realPrice.toFixed(6)}</div>; // 展示6位小数
    },
  },
  {
    accessorKey: "tickUpper",
    header: "Price Upper",
    cell: (cell) => {
      const tickUpper: number = cell.getValue() as unknown as number;
      const realPrice = Math.pow(1.0001, tickUpper);
      return <div>{realPrice.toFixed(6)}</div>; // 展示6位小数
    },
  },
  {
    accessorKey: "sqrtPriceX96",
    header: "Price",
    cell: (cell) => {
      const sqrtPriceX96: bigint = cell.getValue() as unknown as bigint;
      const realPrice = (Number(sqrtPriceX96) ** 2) / (2 ** 192);
      return <div>{realPrice.toFixed(6)}</div>; // 展示6位小数
    },
  },
];
