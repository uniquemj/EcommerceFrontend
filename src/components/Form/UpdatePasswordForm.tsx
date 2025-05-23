import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";
import {
    updateAdminPasswordSchema,
  updatePasswordSchema,
  type UpdatePasswordType,
} from "@/validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdatePasswordForm = ({handleUpdate}: {handleUpdate: (data: UpdatePasswordType) => void}) => {
    const {role} = useAuth()
    const validateSchema = role === UserRole.ADMIN ? updateAdminPasswordSchema : updatePasswordSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });


  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Update Your Account Password
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Card>
          <CardContent>
            <div className="grid min-[800px]:w-2/5 items-center gap-4">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="old_password">Old Password</Label>
                  <Input
                    type="password"
                    {...register("old_password")}
                    id="old_password"
                    placeholder="Old Password"
                  />
                  {errors.old_password ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.old_password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    type="password"
                    {...register("new_password")}
                    id="new_password"
                    placeholder="New Password"
                  />
                  {errors.new_password ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.new_password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    type="password"
                    {...register("confirm_password")}
                    id="confirm_password"
                    placeholder="Confirm New Password"
                  />
                  {errors.confirm_password ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.confirm_password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-red-400 hover:cursor-pointer">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default UpdatePasswordForm