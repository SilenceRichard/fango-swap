import { useWriteDebugTokenMint } from "@/utils/contracts";
import { useAccount, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { getContractAddress } from "@/utils/common";
import { sepolia } from "viem/chains";
import { z } from "zod";
import { FaucetForm } from "./FaucetForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  tokenAddress: z.string(),
  amount: z.number().min(1),
});

const Faucet = () => {
  const { toast } = useToast();
  const { writeContractAsync } = useWriteDebugTokenMint({});
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: getContractAddress("DebugTokenA"),
      amount: 100,
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
          if (chainId !== sepolia.id) {
            try {
              await switchChain?.({
                chainId: sepolia.id,
              });
            } catch (error) {
              console.error("Failed to switch network", error);
              toast({
                title: "Failed to switch network",
                description: (error as Error).message,
              });
              return;
            }
          }
          try {
            await writeContractAsync({
              address: tokenAddress,
              chainId: sepolia.id,
              args: [address as `0x${string}`, BigInt(amount * 10 ** 18)],
            });
            toast({
              title: "Mint success",
              description: `Mint ${amount} tokens to ${address}`,
            });
            // message.success("Mint success");
          } catch (err: unknown) {
            console.log(err);
            toast({
              title: "Mint failed",
              description: (err as Error).message,
            });
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
