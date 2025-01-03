import { useWriteDebugTokenMint } from "@/utils/contracts";
import { useAccount } from "@ant-design/web3";

const Faucet = () => {
  const { writeContractAsync } = useWriteDebugTokenMint();
  const { account } = useAccount();
  return <></>;
};

export default Faucet;