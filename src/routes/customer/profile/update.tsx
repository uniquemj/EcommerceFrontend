import LoadingScreen from '@/components/Loading/LoadingScreen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/ui/spinner'
import { useGetCustomerProfile, useUpdateCustomerInfo } from '@/hooks/customer.hooks'
import type { CustomerProfileUpdateType } from '@/validations/customer.validate'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/customer/profile/update')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending: isLoading ,data: customer} = useGetCustomerProfile()
  const {register, handleSubmit, formState: {errors}} = useForm<CustomerProfileUpdateType>({
    values: {
      fullname: customer?.data.fullname,
      phone_number: customer?.data.phone_number,
      date_of_birth: customer?.data?.date_of_birth ?  customer.data.date_of_birth.split('T')[0] : ""
    },
    defaultValues: {
      fullname: customer?.data.fullname,
      phone_number: customer?.data.phone_number,
      date_of_birth: customer?.data.date_of_birth
    }
  })

  const {isPending, mutate} = useUpdateCustomerInfo()

  const handleUpdate = (data: CustomerProfileUpdateType) =>{
    mutate(data)
  }

  if(isPending) return <div className='w-full h-full flex items-center justify-center'><Spinner/></div>
  if(isLoading) return <LoadingScreen description='Loading. . .'/>
  return  (
  <div className="">
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Your Account Information
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Card className='rounded-none shadow-none border-none'>
          <CardContent className='flex justify-center items-center'>
            <div className="grid w-full items-center gap-4 ">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col space-y-3 w-[50%]">
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
                <div className="flex flex-col space-y-3 w-[50%]">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    type="text"
                    {...register("phone_number", {required: false})}
                    id="phone_number"
                    placeholder="Your Phone Number"
                  />
                  {errors.phone_number? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.phone_number.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3 w-[50%]">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    type="date"
                    {...register("date_of_birth", {required: false})}
                    id="date_of_birth"
                    placeholder="Your Date of birth"
                  />
                  {errors.date_of_birth ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.date_of_birth.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                
              </div>

            </div>
          </CardContent>
          <CardFooter className='flex items-center'>
            <Button type="submit" className="bg-secondary-color rounded-none w-1/5 hover:cursor-pointer">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
    )
}
