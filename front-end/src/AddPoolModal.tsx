import { parsePriceToSqrtPriceX96, getContractAddress } from "@/utils/common";
import { useWritePoolManagerCreateAndInitializePoolIfNecessary } from "@/utils/contracts";
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

const formSchema = z.object({
  token0: z.string().min(42, "Token 0 address must be 42 characters long"),
  token1: z.string().min(42, "Token 1 address must be 42 characters long"),
  fee: z.number().min(0, "Fee must be a positive number"),
  priceLower: z.number().min(0, "Price lower must be a positive number"),
  priceUpper: z.number().min(0, "Price upper must be a positive number"),
  price: z.number().min(0, "Price must be a positive number"),
});

interface FormParams {
  token0: `0x${string}`;
  token1: `0x${string}`;
  fee: number;
  priceLower: number;
  priceUpper: number;
  price: number;
}

interface AddPoolModalProps {
  refetch: () => void;
}

export const AddPoolModal = ({ refetch }: AddPoolModalProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const defaultParams: FormParams = {
    token1: getContractAddress("DebugTokenA") as `0x${string}`,
    token0: getContractAddress("DebugTokenB") as `0x${string}`,
    fee: 3000,
    priceLower: 1,
    priceUpper: 1.5,
    price: 1.2,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token0: defaultParams.token0,
      token1: defaultParams.token1,
      fee: defaultParams.fee,
      priceLower: defaultParams.priceLower,
      priceUpper: defaultParams.priceUpper,
      price: defaultParams.price,
    },
  });
  const { writeContractAsync } =
    useWritePoolManagerCreateAndInitializePoolIfNecessary();
  const handleAdd = async (values: z.infer<typeof formSchema>) => {
    const tickLower = Math.floor(Math.log(values.priceLower) / Math.log(1.0001));
    const tickUpper = Math.ceil(Math.log(values.priceUpper) / Math.log(1.0001));
    await writeContractAsync({
      address: getContractAddress("PoolManager"),
      args: [
        {
          token0: values.token0 as `0x${string}`,
          token1: values.token1 as `0x${string}`,
          fee: values.fee,
          tickLower: tickLower,
          tickUpper: tickUpper,
          sqrtPriceX96: parsePriceToSqrtPriceX96(values.price),
        },
      ],
    });
    toast({
      title: "Add pool success",
    });
    setOpen(false);
    refetch();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Pool</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Pool</DialogTitle>
          <DialogDescription>
            Add a new pool with the specified parameters
          </DialogDescription>
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
                          <SelectValue placeholder="Select token addres" />
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
                          <SelectValue placeholder="Select token addres" />
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
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="Fee" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Fee for the pool.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceLower"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Lower</FormLabel>
                  <FormControl>
                    <Input placeholder="Price Lower" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Lower price for the pool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceUpper"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Upper</FormLabel>
                  <FormControl>
                    <Input placeholder="Price Upper" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Upper price for the pool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    initial price for the pool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-end">
          <Button
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
