import { parsePriceToSqrtPriceX96, getContractAddress } from "@/utils/common";
import {
  useReadPoolManagerGetAllPools,
  useWritePoolManagerCreateAndInitializePoolIfNecessary,
} from "@/utils/contracts";
import { Button } from "./components/ui/button";
import { useToast } from "./hooks/use-toast";
interface CreatePoolParams {
  token0: `0x${string}`;
  token1: `0x${string}`;
  fee: number;
  tickLower: number;
  tickUpper: number;
  sqrtPriceX96: bigint;
}

export const AddPoolModal = () => {
  const { toast } = useToast();
  const { data = [], refetch } = useReadPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });
  console.log("data--", data);
  const createParams = {
    token1: getContractAddress("DebugTokenA"),
    token0: getContractAddress("DebugTokenB"),
    fee: 3000,
    tickLower: -887272,
    tickUpper: 887272,
    price: 3000,
  };
  const { writeContractAsync } =
    useWritePoolManagerCreateAndInitializePoolIfNecessary();
  const handleAdd = async () => {
    await writeContractAsync({
      address: getContractAddress("PoolManager"),
      args: [
        {
          token0: createParams.token0,
          token1: createParams.token1,
          fee: createParams.fee,
          tickLower: createParams.tickLower,
          tickUpper: createParams.tickUpper,
          sqrtPriceX96: parsePriceToSqrtPriceX96(createParams.price),
        },
      ],
    });
    toast({
      title: "Add pool success",
    });
    refetch();
  };
  return <Button onClick={handleAdd}>Add Pool</Button>;
};
