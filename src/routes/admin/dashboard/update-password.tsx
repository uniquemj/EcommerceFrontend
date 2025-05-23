import UpdatePasswordForm from '@/components/Form/UpdatePasswordForm';
import Spinner from '@/components/ui/spinner';
import { useUpdateAdminPassword } from '@/hooks/admin.hooks';
import type { UpdatePasswordType } from '@/validations/auth.validate';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/admin/dashboard/update-password')({
  component: RouteComponent,
})

function RouteComponent() {

  const { isPending, mutate } = useUpdateAdminPassword();

  const handleUpdate = (data: UpdatePasswordType) => {
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
