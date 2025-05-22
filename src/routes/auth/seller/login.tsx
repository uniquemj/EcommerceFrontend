import { createFileRoute } from '@tanstack/react-router'
import type { LoginCredentials } from "@/types/user.types";
import {useSellerLogin } from "@/hooks/auth.hooks";
import LoginForm from '@/components/Form/LoginForm';
import { UserRole } from '@/types/enum.types';
import Spinner from '@/components/ui/spinner';
import AuthLayout from '@/components/Layout/SellerAuth/AuthLayout';

export const Route = createFileRoute('/auth/seller/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, mutate} = useSellerLogin() 

  const handleLogin = (data: LoginCredentials) =>{
    mutate(data)
  }
  
  if(isPending) return <Spinner/>

  return(
    <AuthLayout>
      <LoginForm userType={UserRole.SELLER} handleLogin={handleLogin} registerLink='/auth/seller/register'/>
    </AuthLayout>
  )
}
