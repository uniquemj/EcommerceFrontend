import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRejectSeller } from "@/hooks/seller.hooks";
import {
  rejectReasonSchema,
  type RejectReasonType,
} from "@/validations/seller.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Spinner from "../ui/spinner";
import SheetLayout from "../Layout/SheetLayout/SheetLayout";

const RejectForm = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectReasonType>({
    defaultValues: {
      rejection_reason: "",
    },
    resolver: zodResolver(rejectReasonSchema),
  });

  const { isPending, mutate } = useRejectSeller();

  const onSubmit = (data: RejectReasonType) => {
    console.log(data);
    mutate({ id, reason: data.rejection_reason });
  };

  if (isPending) return <Spinner />;
  const button = <Button className="bg-secondary-color">Reject</Button>;
  return (
    <SheetLayout
      header="Seller Rejection"
      description="Enter Rejection Reason Properly"
      button={button}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="grid gap-7 px-3">
          <div className="grid w-full gap-4">
            <Label htmlFor="message">Rejection Reason</Label>
            <Textarea
              className="h-[150px]"
              {...register("rejection_reason")}
              placeholder="Type your message here."
              id="message"
            />
            {errors.rejection_reason ? (
              <p className="text-primary-color text-error-msg">
                {errors.rejection_reason.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-secondary-color hover:cursor-pointer w-3/5"
          >
          Submit
        </Button>
          </div>
      </form>
    </SheetLayout>
  );
};

export default RejectForm;
