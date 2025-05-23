import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/ui/spinner'
import { useGetAdminProfile, useUpdateAdminProfile } from '@/hooks/admin.hooks'
import {updateAdminInfo, type UpdateAdminInfoType } from '@/validations/admin.validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/admin/dashboard/account-settings')({
  component: RouteComponent,
})

function RouteComponent() {

  const {data: admin} = useGetAdminProfile()

  const {register, handleSubmit, formState: {errors}} = useForm<UpdateAdminInfoType>({
    values: {
      fullname: admin?.data.fullname
    },
    defaultValues: {
      fullname: admin?.data.fullname
    },
    resolver: zodResolver(updateAdminInfo)
  })

  const {isPending, mutate} = useUpdateAdminProfile()

  const handleUpdate = (data: UpdateAdminInfoType) =>{
    mutate(data)
  }

  if(isPending) return <div className='w-full h-full flex items-center justify-center'> <Spinner/> </div>
  return (
  <div className="">
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Update Your Account Information
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
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
                    placeholder="Your full name"
                  />
                  {errors.fullname ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.fullname.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                
              </div>

            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-red-400 hover:cursor-pointer">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
    )
}
