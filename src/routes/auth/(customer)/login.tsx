import { createFileRoute } from "@tanstack/react-router";

import type { LoginCredentials } from "@/types/user.types";
import { useCustomerLogin } from "@/hooks/auth.hooks";
import Spinner from "@/components/ui/spinner";
import LoginForm from "@/components/Form/LoginForm";
import { UserRole } from "@/types/enum.types";

export const Route = createFileRoute("/auth/(customer)/login")({
  component: RouteComponent
});

function RouteComponent() {

  const { isPending, mutate } = useCustomerLogin();

  const handleLogin = (data: LoginCredentials) => {
    mutate(data);
  };

  if (isPending) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-full">
      <LoginForm userType={UserRole.CUSTOMER} handleLogin={handleLogin} registerLink="/auth/register"/>
    </div>
  );
}
