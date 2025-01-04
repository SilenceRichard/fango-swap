import { useWriteDebugTokenMint } from "@/utils/contracts";
import { useAccount, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { getContractAddress } from "@/utils/common";
import { hardhat } from "viem/chains";
import { z } from "zod";
import { FaucetForm } from "./FaucetForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  tokenAddress: z.string(),
  amount: z.string().nonempty("Amount is required"),
});

const Faucet = () => {
  const { writeContractAsync } = useWriteDebugTokenMint({});
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: getContractAddress("DebugTokenA"),
      amount: "1000000000000000000",
    },
  });
  const formVal = form.getValues();
  const tokenAddress = formVal.tokenAddress as `0x${string}`;
  const amount = formVal.amount;
  return (
    <>
      <FaucetForm form={form} formSchema={formSchema} />
      <Button
        className="mt-4"
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
              console.error("Failed to switch network", error);
              return;
            }
          }
          try {
            await writeContractAsync({
              address: tokenAddress,
              chainId: hardhat.id,
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
