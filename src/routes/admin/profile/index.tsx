import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAdminState } from '@/store/admin.store'
import { useAuth } from '@/store/auth.store'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Star } from 'lucide-react'

export const Route = createFileRoute('/admin/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {fullname, email, initials} = useAuth()
  const {username, isSuperAdmin} = useAdminState()
  return(
    // <div>
    //   <div className="flex flex-col gap-3 mb-4">
    //     <h1 className="max-[410px]:text-2xl text-3xl font-bold">
    //       Admin Profile
    //     </h1>
    //     <Separator className="bg-[rgba(0,0,0,0.3)]" />
    //   </div>
    //   <Card className='p-5'>
    //     <div className='w-full flex flex-col items-center gap-6'>
    //       <Avatar className='p-20 bg-ternary-color flex justify-center items-center'>
    //         <AvatarFallback className="rounded-lg text-text-color font-semibold text-2xl">{initials}</AvatarFallback>
    //       </Avatar>
    //       <div className=''>
    //         <div className='flex flex-col space-y-1 text-center gap-4'>
    //           <h1 className='text-sm min-[460px]:text-md font-medium '>@{username}</h1>
    //           <h1 className='text-xl min-[460px]:text-2xl font-semibold text-center'>{fullname}</h1>
    //           <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{email}</h1>
    //           <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{isSuperAdmin ? (<span className='rounded-lg bg-secondary-color py-1 px-2 text-amber-50'>Super Admin</span>): (<span className='rounded-lg bg-ternary-color py-1 px-2 text-amber-50'>Normal Admin</span>)}</h1>
    //         </div>
    //       </div>
    //     </div>
    //   </Card>
    // </div>

    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Profile
        </h1>
        <Separator className="mt-3 bg-gray-200" />
      </div>

      {/* Profile Card */}
      <Card className="p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 bg-gray-100">
              <AvatarFallback className="text-4xl sm:text-5xl font-semibold text-gray-700 bg-gray-200 rounded-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            {isSuperAdmin && (
              <div className="absolute -bottom-2 -right-2">
                <Badge className="flex items-center gap-1 bg-purple-100 hover:bg-amber-100 text-purple-800">
                  <Star className="h-3 w-3" />
                  <span>Super Admin</span>
                </Badge>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {fullname}
              </h2>
              <p className="text-gray-500">@{username}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{email}</span>
              </div>

              <div>
                <Badge
                  variant={isSuperAdmin ? "default" : "secondary"}
                  className={`text-sm ${
                    isSuperAdmin
                      ? "bg-purple-100  text-purple-800 hover:bg-amber-100"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
