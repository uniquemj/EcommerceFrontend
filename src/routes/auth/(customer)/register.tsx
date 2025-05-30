import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { customerRegisterSchema } from "@/validations/auth.validate";
import type { customerRegister } from "@/types/auth.types";
import { useCustomerRegister } from "@/hooks/auth.hooks";
import { upperCase } from "@/utils/helper";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/(customer)/register")({
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
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(customerRegisterSchema),
  });

  const { isPending, mutate } = useCustomerRegister();

  const handleRegistration = (data: customerRegister) => {
    const customerInfo = {
      fullname: upperCase(data.firstname) + " " + upperCase(data.lastname),
      email: data.email,
      password: data.password,
    };
    mutate(customerInfo);
  };

  return (
    <div className="flex justify-center items-center h-full bg-customer-auth bg-cover bg-center">
      <Card className=" w-[350px] md:w-[450px]">
        <CardHeader className="text-center space-y-0.4">
          <CardTitle className="text-xl font-bold">Sign up</CardTitle>
          <CardDescription>Create Your Account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <Link to="/auth/login" className="text-secondary-color font-medium">
                Log in
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
