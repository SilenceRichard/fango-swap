import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  computeSqrtPriceLimitX96,
  getContractAddress,
  parseAmountToBigInt,
  parseBigIntToAmount,
} from "@/utils/common";
import { useEffect, useState } from "react";
import {
  swapRouterAbi,
  useReadIPoolManagerGetAllPools,
  useWriteErc20Approve,
  useWriteSwapRouterExactInput,
  useWriteSwapRouterExactOutput,
} from "./utils/contracts";
import { useAccount, usePublicClient } from "wagmi";
import { ArrowDownUp } from "lucide-react";
import { useToast } from "./hooks/use-toast";
const TOKENA_ADDRESS = getContractAddress("DebugTokenA");
const TOKENB_ADDRESS = getContractAddress("DebugTokenB");
const TOKENC_ADDRESS = getContractAddress("DebugTokenC");
const Swap = () => {
  const { address } = useAccount();
  const [tokenA, setTokenA] = useState<`0x${string}`>(TOKENA_ADDRESS);
  const [tokenB, setTokenB] = useState<`0x${string}`>(TOKENB_ADDRESS);
  const [loading, setLoading] = useState(false);
  const [amountA, setAmountA] = useState(0.0);
  const [amountB, setAmountB] = useState(0.0);
  // 是否是指定输入（否则就是指定输出）
  const [isExactInput, setIsExactInput] = useState(true);
  // 按照地址大小排序
  const [token0, token1] =
    tokenA && tokenB && tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
  // 是否是 token0 来交换 token1
  const zeroForOne = token0 === tokenA;
  const { toast } = useToast();
  const { writeContractAsync: writeExactInput } =
    useWriteSwapRouterExactInput();
  const { writeContractAsync: writeExactOutput } =
    useWriteSwapRouterExactOutput();
  const { writeContractAsync: writeApprove } = useWriteErc20Approve();
  const handleAmountAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountA(parseFloat(e.target.value));
    setIsExactInput(true);
  };
  const handleAmountBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountB(parseFloat(e.target.value));
    setIsExactInput(false);
  };

  // 获取所有的交易池
  const { data: pools = [] } = useReadIPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });

  // 计算交易池的交易顺序
  const swapPools = pools.filter((pool) => {
    return (
      pool.token0 === token0 && pool.token1 === token1 && pool.liquidity > 0
    );
  });
  const swapIndexPath: number[] = swapPools
    .sort((a, b) => {
      // 简单处理，按照价格排序，再按照手续费排序，优先在价格低的池子中交易（按照 tick 判断），如果价格一样，就在手续费低的池子里面交易
      if (a.tick !== b.tick) {
        if (zeroForOne) {
          // token0 交换 token1 时，tick 越大意味着 token0 价格越高，所以要把 tick 大的放前面
          return b.tick > a.tick ? 1 : -1;
        }
        return a.tick > b.tick ? 1 : -1;
      }
      return a.fee - b.fee;
    })
    .map((pool) => pool.index);
  const publicClient = usePublicClient();
  // 计算本次交易的价格限制
  const sqrtPriceLimitX96 = computeSqrtPriceLimitX96(swapPools, zeroForOne);

  const updateAmountBWithAmountA = async (value: number) => {
    if (!publicClient || !tokenA || !tokenB || isNaN(value) || value === 0) {
      return;
    }
    if (tokenA === tokenB) {
      toast({
        title: "Please select different tokens",
      });
      return;
    }
    try {
      const newAmountB = await publicClient.simulateContract({
        address: getContractAddress("SwapRouter"),
        abi: swapRouterAbi,
        functionName: "quoteExactInput",
        args: [
          {
            tokenIn: tokenA,
            tokenOut: tokenB,
            indexPath: swapIndexPath,
            amountIn: parseAmountToBigInt(value),
            sqrtPriceLimitX96,
          },
        ],
      });
      setAmountB(parseBigIntToAmount(newAmountB.result));
      setIsExactInput(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Failed to get quote",
        description: e.message,
      });
    }
  };

  const updateAmountAWithAmountB = async (value: number) => {
    if (!publicClient || !tokenA || !tokenB || isNaN(value)) {
      return;
    }
    try {
      const newAmountA = await publicClient.simulateContract({
        address: getContractAddress("SwapRouter"),
        abi: swapRouterAbi,
        functionName: "quoteExactOutput",
        args: [
          {
            tokenIn: tokenA,
            tokenOut: tokenB,
            indexPath: swapIndexPath,
            amountOut: parseAmountToBigInt(value),
            sqrtPriceLimitX96,
          },
        ],
      });
      setAmountA(parseBigIntToAmount(newAmountA.result));
      setIsExactInput(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Failed to get quote",
        description: e.message,
      });
    }
  };
  const handleSwitch = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
    setAmountA(amountB);
    setAmountB(amountA);
    setIsExactInput(!isExactInput);
  };
  const handleSwap = async () => {
    setLoading(true);
    try {
      if (isExactInput) {
        const swapParams = {
          tokenIn: tokenA!,
          tokenOut: tokenB!,
          amountIn: parseAmountToBigInt(amountA),
          amountOutMinimum: parseAmountToBigInt(amountB),
          recipient: address as `0x${string}`,
          deadline: BigInt(Math.floor(Date.now() / 1000) + 1000),
          sqrtPriceLimitX96,
          indexPath: swapIndexPath,
        };
        console.log("swapParams", swapParams);
        await writeApprove({
          address: tokenA!,
          args: [getContractAddress("SwapRouter"), swapParams.amountIn],
        });
        await writeExactInput({
          address: getContractAddress("SwapRouter"),
          args: [swapParams],
        });
      } else {
        const swapParams = {
          tokenIn: tokenA!,
          tokenOut: tokenB!,
          amountOut: parseAmountToBigInt(amountB),
          amountInMaximum: parseAmountToBigInt(Math.ceil(amountA)),
          recipient: address as `0x${string}`,
          deadline: BigInt(Math.floor(Date.now() / 1000) + 1000),
          sqrtPriceLimitX96,
          indexPath: swapIndexPath,
        };
        console.log("swapParams", swapParams);
        await writeApprove({
          address: tokenA!,
          args: [getContractAddress("SwapRouter"), swapParams.amountInMaximum],
        });
        await writeExactOutput({
          address: getContractAddress("SwapRouter"),
          args: [swapParams],
        });
      }
      toast({
        title: "Swap success",
      })
      // message.success("Swap success");

      setAmountA(0);
      setAmountB(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Swap failed",
        description: e.message,
      })
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // 当用户输入发生变化时，重新请求报价接口计算价格
    if (isExactInput) {
      updateAmountBWithAmountA(amountA);
    } else {
      updateAmountAWithAmountB(amountB);
    }
  }, [isExactInput, tokenA, tokenB, amountA, amountB]);

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Swap</h2>
      <div className="p-5 bg-gray-50 rounded-md flex justify-between align-top">
        <div className="w-[70%]">
          <input
            value={amountA}
            min={0}
            onChange={handleAmountAChange}
            type="number"
            className="w-full bg-gray-50 text-2xl
          border-0 focus:outline-none focus:ring-0"
          />
          {/* <div className="text-xl text-gray-500 text-opacity-70">$2</div> */}
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
      <div className="flex justify-center">
        <ArrowDownUp
          onClick={handleSwitch}
          className="cursor-pointer hover:opacity-50"
          size={24}
        />
      </div>
      <div className="p-5 bg-gray-50 rounded-md flex justify-between align-top">
        <div className="w-[70%]">
          <input
            value={amountB}
            onChange={handleAmountBChange}
            type="number"
            className="w-full bg-gray-50 text-2xl
          border-0 focus:outline-none focus:ring-0"
          />
          {/* <div className="text-xl text-gray-500 text-opacity-70">$2</div> */}
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
      <Button className="w-full" onClick={handleSwap}>Swap</Button>
    </div>
  );
};

export default Swap;
