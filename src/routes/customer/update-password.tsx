import UpdatePasswordForm from '@/components/Form/UpdatePasswordForm'
import Spinner from '@/components/ui/spinner'
import { useUpdateCustomerPassword } from '@/hooks/customer.hooks'
import type { UpdatePasswordType } from '@/validations/auth.validate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/update-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, mutate} = useUpdateCustomerPassword()

  const handleUpdate = (data: UpdatePasswordType) =>{
    const passwordInfo = {
      old_password: data.old_password,
      new_password: data.new_password
    }
    mutate(passwordInfo)
  }

  if(isPending) return <Spinner/>
  return (
  <div>
    <UpdatePasswordForm handleUpdate={handleUpdate}/>
  </div>
  )
}
