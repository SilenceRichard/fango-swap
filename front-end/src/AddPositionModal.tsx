import { getContractAddress } from "@/utils/common";
import {
  useWriteErc20Approve,
  useWritePositionManagerMint,
} from "@/utils/contracts";
import { Button } from "./components/ui/button";
import { useToast } from "./hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useState } from "react";
import { useAccount } from "wagmi";

const formSchema = z.object({
  token0: z.string().min(42, "Token 0 address must be 42 characters long"),
  token1: z.string().min(42, "Token 1 address must be 42 characters long"),
  index: z.number().min(0, "Index must be a positive number"),
  amount0Desired: z
    .string()
    .min(1, "Amount 0 desired must be a positive number"),
  amount1Desired: z
    .string()
    .min(1, "Amount 1 desired must be a positive number"),
});

interface FormParams {
  token0: `0x${string}`;
  token1: `0x${string}`;
  index: number;
  amount0Desired: string;
  amount1Desired: string;
}

interface AddPositionModalProps {
  refetch: () => void;
}

export const AddPositionModal = ({ refetch }: AddPositionModalProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const defaultParams: FormParams = {
    token0: getContractAddress("DebugTokenB") as `0x${string}`,
    token1: getContractAddress("DebugTokenA") as `0x${string}`,
    index: 0,
    amount0Desired: "1000000000000000000",
    amount1Desired: "1000000000000000000",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token0: defaultParams.token0,
      token1: defaultParams.token1,
      index: defaultParams.index,
      amount0Desired: defaultParams.amount0Desired,
      amount1Desired: defaultParams.amount1Desired,
    },
  });
  const { writeContractAsync } = useWritePositionManagerMint();
  const { writeContractAsync: writeErc20Approve } = useWriteErc20Approve();
  const handleAdd = async (values: z.infer<typeof formSchema>) => {
    await writeErc20Approve({
      address: values.token0 as `0x${string}`,
      args: [
        getContractAddress("PositionManager"),
        BigInt(values.amount0Desired),
      ],
    });
    await writeErc20Approve({
      address: values.token1 as `0x${string}`,
      args: [
        getContractAddress("PositionManager"),
        BigInt(values.amount1Desired),
      ],
    });
    await writeContractAsync({
      address: getContractAddress("PositionManager"),
      args: [
        {
          token0: values.token0 as `0x${string}`,
          token1: values.token1 as `0x${string}`,
          index: values.index,
          amount0Desired: BigInt(values.amount0Desired),
          amount1Desired: BigInt(values.amount1Desired),
          recipient: address as `0x${string}`,
          deadline: BigInt(Date.now() + 100000),
        },
      ],
    });
    toast({
      title: "Add position success",
    });
    setOpen(false);
    refetch();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Positions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Positions</DialogTitle>
          <DialogDescription>Add a position to a pool</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="space-y-2 max-h-[60vh] overflow-y-auto"
          >
            <FormField
              control={form.control}
              name="token0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token 0</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select token address" />
                        </SelectTrigger>
                      </FormControl>
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
                  </FormControl>
                  <FormDescription>
                    Address of the first token in the pool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token 1</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select token address" />
                        </SelectTrigger>
                      </FormControl>
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
                  </FormControl>
                  <FormDescription>
                    Address of the second token in the pool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Index</FormLabel>
                  <FormControl>
                    <Input placeholder="Index" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Index of the pool.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount0Desired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount 0 Desired</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount 0 Desired"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Desired amount of the first token.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount1Desired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount 1 Desired</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount 1 Desired"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Desired amount of the second token.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-end">
          <Button
            type="submit"
            onClick={() => {
              const values = form.getValues();
              handleAdd(values);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
