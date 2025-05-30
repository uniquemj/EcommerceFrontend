import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAdminState } from '@/store/admin.store'
import { useAuth } from '@/store/auth.store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {fullname, email, initials} = useAuth()
  const {username, isSuperAdmin} = useAdminState()
  return(
    <div>
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Admin Profile
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <Card className='p-5'>
        <div className='w-full flex flex-col items-center gap-6'>
          <Avatar className='p-20 bg-ternary-color flex justify-center items-center'>
            <AvatarFallback className="rounded-lg text-text-color font-semibold text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div className=''>
            <div className='flex flex-col space-y-1 text-center gap-4'>
              <h1 className='text-sm min-[460px]:text-md font-medium '>@{username}</h1>
              <h1 className='text-xl min-[460px]:text-2xl font-semibold text-center'>{fullname}</h1>
              <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{email}</h1>
              <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{isSuperAdmin ? (<span className='rounded-lg bg-secondary-color py-1 px-2 text-amber-50'>Super Admin</span>): (<span className='rounded-lg bg-ternary-color py-1 px-2 text-amber-50'>Normal Admin</span>)}</h1>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
