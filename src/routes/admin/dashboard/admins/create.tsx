import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminRegister } from '@/hooks/auth.hooks'
import { upperCase } from '@/utils/helper'
import { adminRegisterSchema, type AdminRegisterType } from '@/validations/admin.validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/admin/dashboard/admins/create')({
  component: RouteComponent,
})

function RouteComponent() {

  const {register, handleSubmit, formState: {errors}} = useForm<AdminRegisterType>({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "", 
      password: "",
      isSuperAdmin: false
    },
    resolver: zodResolver(adminRegisterSchema)
  })

  const {isPending, mutate} = useAdminRegister()

  const onSubmit = (data: AdminRegisterType) =>{
    const adminInfo = {
      ...data,
      fullname: upperCase(data.firstname)+" "+upperCase(data.lastname)
    }
    mutate(adminInfo)
  }

  return (
    <DashboardHeader header='Create Admin' buttons={[]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="firstname">Firstname</Label>
                  <Input
                    type="text"
                    {...register("firstname", {required: false})}
                    id="firstname"
                    placeholder="Enter Full name"
                  />
                  {errors.firstname ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.firstname.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="lastname">Lastname</Label>
                  <Input
                    type="text"
                    {...register("lastname", {required: false})}
                    id="lastname"
                    placeholder="Enter Full name"
                  />
                  {errors.lastname ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.lastname.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="fullname">Username</Label>
                  <Input
                    type="text"
                    {...register("username", {required: false})}
                    id="username"
                    placeholder="Enter Username"
                  />
                  {errors.username ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.username.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="fullname">Email</Label>
                  <Input
                    type="email"
                    {...register("email", {required: false})}
                    id="email"
                    placeholder="Enter Email"
                  />
                  {errors.email ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.email.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password", {required: false})}
                    id="password"
                    placeholder="Enter Password"
                  />
                  {errors.password ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="isSuperAdmin">SuperAdmin Status</Label>
                  <Input
                    type="checkbox"
                    {...register("isSuperAdmin", {required: false})}
                    id="isSuperAdmin"
                    className='w-[20px] h-[18px]'
                  />
                  {errors.isSuperAdmin ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.isSuperAdmin.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                
              </div>

            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-primary-color hover:cursor-pointer">
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardHeader>
  )
}
