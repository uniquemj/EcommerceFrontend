import {
  addressSchema,
  type AddressType,
} from "@/validations/shipment.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Province } from "@/types/shipment.type";
import { Loader2 } from "lucide-react";


interface ShipmentFormProps{
    onSuccess: (data: AddressType)=>void,
    isLoading: boolean
}

const ShipmentForm = ({onSuccess, isLoading} : ShipmentFormProps) => {

  const province = Object.values(Province);
  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      region: "",
      city: "",
      address: "",
    },
  });


  const onSubmit = (values: AddressType) => {
    onSuccess(values)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 min-940:grid-cols-2 gap-space-24 items-center">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Fullname"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 min-940:grid-cols-2 gap-space-24 items-center">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region/Province</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {province.map((p) => (
                      <SelectItem value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 min-940:grid-cols-2 gap-space-24">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Your City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Street Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-none w-5/5 bg-secondary-color hover:cursor-pointer text-text-color hover:bg-transparent border-1 hover:border-secondary-color hover:text-secondary-color"
          >
            {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Submit'
          )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShipmentForm;
