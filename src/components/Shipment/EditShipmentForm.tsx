import { useGetAddressById, useUpdateAddress } from "@/hooks/shipment.hooks";
import { Province } from "@/types/shipment.type";
import {
  updateAddressSchema,
  type UpdateAddressType,
} from "@/validations/shipment.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
    Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const EditShipmentForm = ({ id }: { id: string }) => {
  const province = Object.values(Province);
  const { data: addressData } = useGetAddressById(id);

  const form = useForm<UpdateAddressType>({
    values: {
      full_name: addressData?.data.full_name,
      email: addressData?.data.email,
      phone_number: addressData?.data.phone_number,
      region: addressData?.data.region,
      city: addressData?.data.city,
      address: addressData?.data.address,
    },
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      region: "",
      city: "",
      address: "",
    },
  });

  const { isPending, mutate } = useUpdateAddress();

  const onSubmit = (values: UpdateAddressType) => {
    mutate({ addressId: id, updateShipmentInfo: values });
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
                      <SelectValue placeholder={field.value? field.value: "Select your region"} />
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
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditShipmentForm;
