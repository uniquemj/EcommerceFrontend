import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCustomerOrderReturn } from "@/hooks/order.hooks";
import { Textarea } from "@/components/ui/textarea";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  returnInitializeSchema,
  type ReturnInitializeType,
} from "@/validations/order.validate";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";

interface OrderReturnInitializeProps {
  orderItemId: string;
}

const OrderReturnInitialize = ({ orderItemId }: OrderReturnInitializeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReturnInitializeType>({
    resolver: zodResolver(returnInitializeSchema),
    defaultValues: {
      return_reason: "",
    },
  });
  const { isPending, mutate } = useCustomerOrderReturn();

  const handleReturn = (data: ReturnInitializeType) => {
    mutate({ orderItemId, return_reason: data.return_reason });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-none border-1 border-secondary-shade-normal bg-secondary-shade-normal text-text-color hover:bg-transparent hover:cursor-pointer hover:text-secondary-shade-normal">
          Return Initialize
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Initialize Your Order Return Request</SheetTitle>
          <SheetDescription>
            Describe your return reason for order item, and seller will get in
            touch with you over call.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(handleReturn)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Return Reason</Label>
              <Textarea
                placeholder="Type your return reason."
                className="h-space-180"
                {...register("return_reason")}
              />
              {errors.return_reason ? (
                  <p className="text-error-color text-error-msg">{errors.return_reason.message}</p>
                ) : (
                  ""
                )}
            </div>
          </div>
          <SheetFooter>
            <Button
              type="submit"
              className="rounded-none bg-secondary-color text-text-color hover:bg-secondary-color hover:cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Request Reason"
              )}
            </Button>
            <SheetClose asChild>
              <Button className="rounded-none border-1 bg-transparent text-secondary-color border-secondary-color hover:bg-transparent hover:cursor-pointer">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default OrderReturnInitialize;
