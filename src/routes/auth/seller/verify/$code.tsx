import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useResendVerificationEmail, useVerifySellerEmail } from "@/hooks/seller.hooks";
import { UserRole } from "@/types/enum.types";
import { resendEmailSchema } from "@/validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/auth/seller/verify/$code")({
  component: RouteComponent,
  beforeLoad: ({context})=>{
    const {isAuthenticated, role} = context.auth.getState()
    if(isAuthenticated){
      const redirectRoute = role == UserRole.CUSTOMER ? '/' : role == UserRole.SELLER ? '/seller/dashboard' : role == UserRole.ADMIN ? '/admin/dashboard' : '/login'
      throw redirect({to: redirectRoute})
    }
  }
});

function RouteComponent() {
  const { code } = Route.useParams();
  const { isPending, mutate } = useVerifySellerEmail();
  const {isPending: resendPending, mutate:resend} = useResendVerificationEmail()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resendEmailSchema)
  });

  const handleVerify = () => {
    mutate(code);
  };

  const handleResend = (data:{email: string}) =>{
    resend(data.email)
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="p-6 w-[350px] md:max-w-md text-center">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="mb-4">
            Click the button below to verify your email address.
          </p>
          <Button
            onClick={handleVerify}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Verify Email"
            )}
          </Button>
        </CardContent>
          <Separator/>
        <CardFooter className="flex flex-col w-full space-y-4">
          <h1 className="text-2xl font-bold mb-4">Did your Verification code exipired?</h1>
          <form className="w-full space-y-4" onSubmit={handleSubmit(handleResend)}>
          <Label htmlFor="email" className="text-sm">
            Enter Registered Email
          </Label>
            <div className="space-y-5 grid grid-cols-1">
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Your Email"
              />
              <Button className="">{resendPending ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Resend"
            )}</Button>
            {errors.email? <p className="text-red-400">{errors.email.message}</p>: ""}
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
