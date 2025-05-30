import AuthLayout from "@/components/Layout/SellerAuth/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSellerRegister } from "@/hooks/auth.hooks";
import type { sellerRegister } from "@/types/auth.types";
import { upperCase } from "@/utils/helper";
import { sellerRegisterSchema } from "@/validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/auth/seller/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      store_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(sellerRegisterSchema),
  });

  const { isPending, mutate } = useSellerRegister();

  const handleRegistration = (data: sellerRegister) => {
    const sellerInfo = {
      fullname: upperCase(data.firstname) + " " + upperCase(data.lastname),
      store_name: upperCase(data.store_name),
      email: data.email,
      password: data.password,
    };
    mutate(sellerInfo);
  };

  return (
    <AuthLayout>
      <Card className="w-[320px] min-[500px]:w-[500px] ">
        <CardHeader className="text-center space-y-0.4">
          <CardTitle className="text-2xl font-bold">Sign up as Seller</CardTitle>
          <CardDescription className="font-semibold">Create Your Account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    {...register("firstname")}
                    id="firstname"
                    placeholder="Your Frist Name"
                  />
                  {errors.firstname ? (
                    <p className="text-error-color text-error-msg">{errors.firstname.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    id="lastname"
                    {...register("lastname")}
                    placeholder="Your Last Name"
                  />
                  {errors.lastname ? (
                    <p className="text-error-color text-error-msg">{errors.lastname.message}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="store_name">Store Name</Label>
                <Input
                  type="text"
                  id="store_name"
                  {...register("store_name")}
                  placeholder="Your Store Name..."
                />
                {errors.store_name ? (
                  <p className="text-error-color text-error-msg">{errors.store_name.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Your Email..."
                />
                {errors.email ? (
                  <p className="text-error-color text-error-msg">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="grid max-[500px]:grid-cols-1 grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Your Password..."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm_password"> Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirm_password"
                    {...register("confirm_password")}
                    placeholder="Your Password..."
                  />
                  {errors.password ? (
                    <p className="text-error-color text-error-msg">{errors.password.message}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-7 flex flex-col space-y-5">
            <Button
              type="submit"
              className="w-full bg-secondary-color hover:cursor-pointer hover:bg-transparent hover:text-secondary-color hover:border hover:border-secondary-color"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <CardDescription>
              Already have account?{" "}
              <Link to="/auth/seller/login" className="text-secondary-color font-medium">
                Log in
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
}
