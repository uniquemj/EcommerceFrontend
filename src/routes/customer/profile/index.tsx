import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCustomerProfile } from '@/hooks/customer.hooks'
import { useAuth } from '@/store/auth.store'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {initials, fullname, email} = useAuth()
  const {data: customer} = useGetCustomerProfile()
  return (
    <div>
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Customer Profile
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <Card className='p-5'>
        <div className='w-full flex flex-col items-center gap-6'>
          <Avatar className='p-20 bg-ternary-color flex justify-center items-center'>
            <AvatarFallback className="rounded-lg text-text-color font-semibold text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col space-y-1 text-center gap-2'>
              <h1 className='text-xl min-[460px]:text-2xl font-semibold text-center'>{fullname}</h1>
              <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{email}</h1>
              {
                customer?.data.phone_number ?
                <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>Phone Number: {customer.data.phone_number}</h1>:null
              }
              {
                customer?.data.date_of_birth ? 
                <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>DOB: {customer.data.date_of_birth ? customer.data.date_of_birth.split('T')[0]:'-'}</h1>:null
              }
              <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{customer?.data.is_email_verified ? (<span className='rounded-lg bg-blue-400 py-1 px-2 text-amber-50'>verified</span>):null}</h1>
            </div>
            <div className='flex gap-2'>
              <Link to='/customer/profile/update'>
                <Button className='bg-secondary-color '>Edit profile</Button>
              </Link>
              <Link to='/customer/update-password'>
                <Button className='bg-primary-color '>Update Password</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
