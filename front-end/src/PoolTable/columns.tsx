"use client";

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
  },
  {
    accessorKey: "token1",
    header: "Token 1",
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
  {
    accessorKey: "tickLower",
    header: "Tick Lower",
  },
  {
    accessorKey: "tickUpper",
    header: "Tick Upper",
  },
  {
    accessorKey: "sqrtPriceX96",
    header: "Sqrt Price X96",
  }
];
