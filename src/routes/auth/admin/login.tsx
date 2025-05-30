import LoginForm from '@/components/Form/LoginForm'
import Spinner from '@/components/ui/spinner'
import { useAdminLogin } from '@/hooks/auth.hooks'
import { UserRole } from '@/types/enum.types'
import type { LoginCredentials } from '@/types/user.types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const {isPending, mutate} = useAdminLogin()

  const handleLogin = (data: LoginCredentials) =>{
    mutate(data)
  }

  if(isPending) return <Spinner/>

  return (
    <div className='w-full h-full flex justify-center items-center bg-customer-auth bg-cover bg-center'>
      <LoginForm userType={UserRole.ADMIN} handleLogin={handleLogin} registerLink='' />
    </div>
  )
}
