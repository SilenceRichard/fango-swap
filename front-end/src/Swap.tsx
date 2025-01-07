import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getContractAddress } from "@/utils/common";
import { useState } from "react";
const TOKENA_ADDRESS = getContractAddress("DebugTokenA");
const TOKENB_ADDRESS = getContractAddress("DebugTokenB");
const TOKENC_ADDRESS = getContractAddress("DebugTokenC");
const Swap = () => {
  const [tokenA, setTokenA] = useState(TOKENA_ADDRESS);
  const [tokenB, setTokenB] = useState(TOKENB_ADDRESS);
  const [amountIn, setAmountIn] = useState(0.0);
  const [amountOut, setAmountOut] = useState(0.0);
  
  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Swap</h2>
      <div className="p-5 bg-gray-50 rounded-md flex justify-between align-top">
        <div className="w-[70%]">
          <input
            value={amountIn}
            className="w-full bg-gray-50 text-2xl
          border-0 focus:outline-none focus:ring-0"
          />
          <div className="text-xl text-gray-500 text-opacity-70">$2</div>
        </div>
        <div className="w-[30%]">
          <Select
            onValueChange={(v) => {
              setTokenA(v as `0x${string}`);
            }}
            value={tokenA}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select token addres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={getContractAddress("DebugTokenA")}>
                DTA
              </SelectItem>
              <SelectItem value={getContractAddress("DebugTokenB")}>
                DTB
              </SelectItem>
              <SelectItem value={getContractAddress("DebugTokenC")}>
                DTC
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-5 bg-gray-50 rounded-md flex justify-between align-top">
        <div className="w-[70%]">
          <input
            value={amountOut}
            className="w-full bg-gray-50 text-2xl
          border-0 focus:outline-none focus:ring-0"
          />
          <div className="text-xl text-gray-500 text-opacity-70">$2</div>
        </div>
        <div className="w-[30%]">
          <Select
            onValueChange={(v) => {
              setTokenB(v as `0x${string}`);
            }}
            value={tokenB}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select token addres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TOKENA_ADDRESS}>DTA</SelectItem>
              <SelectItem value={TOKENB_ADDRESS}>DTB</SelectItem>
              <SelectItem value={TOKENC_ADDRESS}>DTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="w-full">Swap</Button>
    </div>
  );
};

export default Swap;
