/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { getContractAddress } from "./utils/common";

interface FaucetProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  formSchema: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FaucetForm({ form }: FaucetProps) {
  // 2. Define a submit handler.

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="tokenAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Address</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token addres" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={getContractAddress("DebugTokenA")}>DTA</SelectItem>
                  <SelectItem value={getContractAddress("DebugTokenB")}>DTB</SelectItem>
                  <SelectItem value={getContractAddress("DebugTokenC")}>DTC</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Fill in the address of the token you want to mint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="input amount" {...field} />
              </FormControl>
              <FormDescription>
                Fill in the amount of tokens you want to mint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
