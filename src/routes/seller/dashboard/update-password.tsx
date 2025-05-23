import UpdatePasswordForm from "@/components/Form/UpdatePasswordForm";
import Spinner from "@/components/ui/spinner";
import { useUpdateSellerPassword } from "@/hooks/seller.hooks";
import {
  type UpdatePasswordType,
} from "@/validations/auth.validate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/dashboard/update-password")({
  component: RouteComponent,
});

function RouteComponent() {

  const { isPending, mutate } = useUpdateSellerPassword();

  const handleUpdate = (data: UpdatePasswordType) => {
    console.log(data)
    const passwordInfo = {
      old_password: data.old_password,
      new_password: data.new_password,
    };
    mutate(passwordInfo);
  };

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="">
      <UpdatePasswordForm handleUpdate={handleUpdate}/>
    </div>
  );
}
