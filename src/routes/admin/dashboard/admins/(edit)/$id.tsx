import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetAdminById, useUpdateOtherAdmin } from '@/hooks/admin.hooks'
import { updateNormalAdminInfoSchema, type UpdateNormalAdminType } from '@/validations/admin.validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/admin/dashboard/admins/(edit)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()

  const {data: admin} = useGetAdminById(id)

  const {register, handleSubmit, formState: {errors}} = useForm<UpdateNormalAdminType>({
    values: {
      fullname: admin?.data.fullname,
      isSuperAdmin: admin?.data.isSuperAdmin ?? false
    },
    defaultValues: {
      fullname: admin?.data.fullname,
      password: undefined,
      isSuperAdmin: admin?.data.isSuperAdmin ?? false
    },
    resolver: zodResolver(updateNormalAdminInfoSchema)
  })

  const {isPending, mutate} = useUpdateOtherAdmin(id)

  const handleUpdate = (data: UpdateNormalAdminType) =>{
    mutate(data)
  }

  return (
    <DashboardHeader header='Update Admin Information' buttons={[]}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Card>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="fullname">Fullname</Label>
                  <Input
                    type="text"
                    {...register("fullname", {required: false})}
                    id="fullname"
                    placeholder="New Full name"
                  />
                  {errors.fullname ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.fullname.message}
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
                    placeholder="New Password"
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
