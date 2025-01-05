"use client";

import { TOKEN_LIST } from "@/constant";
import { ColumnDef } from "@tanstack/react-table";

// Define the shape of our data.
export type PositionList = {
  id: bigint;
  owner: `0x${string}`;
  token0: `0x${string}`;
  token1: `0x${string}`;
  liquidity: bigint;
  index: number;
  fee: number;
  tickLower: number;
  tickUpper: number;
  tokensOwed0: bigint;
  tokensOwed1: bigint;
  feeGrowthInside0LastX128: bigint;
  feeGrowthInside1LastX128: bigint;
};

export const columns: ColumnDef<PositionList>[] = [
  {
    accessorKey: "id",
    header: () => <div className="whitespace-nowrap">ID</div>,
  },
  {
    accessorKey: "owner",
    header: () => <div className="whitespace-nowrap">Owner</div>,
  },
  {
    accessorKey: "token0",
    header: () => <div className="whitespace-nowrap">Token 0</div>,
    cell: (cell) => {
      const tokenAddress: string = cell.getValue() as unknown as string;
      return <div>{TOKEN_LIST[tokenAddress]}</div>;
    },
  },
  {
    accessorKey: "token1",
    header: () => <div className="whitespace-nowrap">Token 1</div>,
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
    accessorKey: "index",
    header: () => <div className="whitespace-nowrap">Index</div>,
  },
  {
    accessorKey: "fee",
    header: () => <div className="whitespace-nowrap">Fee</div>,
  },
  {
    accessorKey: "tickLower",
    header: () => <div className="whitespace-nowrap">Tick Lower</div>,
  },
  {
    accessorKey: "tickUpper",
    header: () => <div className="whitespace-nowrap">Tick Upper</div>,
  },
 
  {
    accessorKey: "tokensOwed0",
    header: () => <div className="whitespace-nowrap">Tokens Owed 0</div>,
  },
  {
    accessorKey: "tokensOwed1",
    header: () => <div className="whitespace-nowrap">Tokens Owed 1</div>,
  },
  {
    accessorKey: "feeGrowthInside0LastX128",
    header: () => <div className="whitespace-nowrap">Fee Growth Inside 0 Last X128</div>,
  },
  {
    accessorKey: "feeGrowthInside1LastX128",
    header: () => <div className="whitespace-nowrap">Fee Growth Inside 1 Last X128</div>,
  },
];
