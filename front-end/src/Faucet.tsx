import { useWriteDebugTokenMint } from "@/utils/contracts";
import { useAccount,  useSwitchChain  } from "wagmi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getContractAddress } from "@/utils/common";
import { hardhat } from "viem/chains";

const Faucet = () => {
  const { writeContractAsync } = useWriteDebugTokenMint({});
  const { address, chain, chainId } = useAccount();
  console.log("chain", chain, chainId);
  const { switchChain } = useSwitchChain();
  // const chainId = useChainId();
  // const [loading, setLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(
    getContractAddress("DebugTokenA")
  );
  const amount = 1000000000000000000;
  return (
    <>
      <Button
        onClick={async () => {
          if (!address) {
            // message.warning("Please connect wallet");
            return;
          }
          console.log("Mint start");
          if (chainId !== hardhat.id) {
            try {
              await switchChain?.({
                chainId: hardhat.id,
              });
            } catch (error) {
              console.error('Failed to switch network', error);
              return;
            }
          }
      
          // console.log("mint", tokenAddress, account?.address, amount);
          // setLoading(true);
          try {
            await writeContractAsync({
              address: tokenAddress,
              chainId: 31337,
              args: [address as `0x${string}`, BigInt(amount)],
            });
            // message.success("Mint success");
          } catch (err: unknown) {
            console.log(err);
            // message.error(error.message);
          }
          // setLoading(false);
        }}
      >
        Mint
      </Button>
    </>
  );
};

export default Faucet;
