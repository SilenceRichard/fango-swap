import { useWriteDebugTokenMint } from "@/utils/contracts";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

const Faucet = () => {
  const { writeContractAsync } = useWriteDebugTokenMint();
  const { account } = useAccount();
  return <>
    <Button>Mint</Button>
  </>;
};

export default Faucet;