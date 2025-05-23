import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/ui/spinner'
import { useGetSellerProfile, useUpdateSellerInfo } from '@/hooks/seller.hooks'
import type { SellerAccountType } from '@/validations/seller.validate'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/seller/dashboard/account-settings')({
  component: RouteComponent,
})

function RouteComponent() {

  const {data} = useGetSellerProfile()


  const {handleSubmit, register, formState: {errors}} = useForm<SellerAccountType>({
    values: {
      store_name: data?.data.store_name,
      address: data?.data.address,
      city: data?.data.city,
      country: data?.data.country,
      phone_number: data?.data.phone_number
    },
    defaultValues: {
      store_name: data?.data.store_name,
      address: data?.data.address,
      city: data?.data.city,
      country: data?.data.country,
      phone_number: data?.data.phone_number
    }
  })

  const {isPending, mutate} = useUpdateSellerInfo()

  const handleUpdate = (data: SellerAccountType) =>{
    mutate(data)
  }

  if(isPending) return <div className="w-full h-full flex justify-center items-center"><Spinner/></div>

  return(
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
                  <Label htmlFor="store_name">Store Name</Label>
                  <Input
                    type="text"
                    {...register("store_name", {required: false})}
                    id="store_name"
                    placeholder="Your Store Name"
                  />
                  {errors.store_name ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.store_name.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="city">Store City</Label>
                  <Input
                    type="text"
                    {...register("city", {required: false})}
                    id="city"
                    placeholder="Your Store City"
                  />
                  {errors.city ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.city.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="country">Store Country</Label>
                  <Input
                    type="text"
                    {...register("country", {required: false})}
                    id="country"
                    placeholder="Your Store Country"
                  />
                  {errors.country ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.country.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="address">Store Address</Label>
                  <Input
                    type="text"
                    {...register("address", {required: false})}
                    id="address"
                    placeholder="Your Store Address"
                  />
                  {errors.address ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.address.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>



                <div className="flex flex-col space-y-3">
                  <Label htmlFor="country">Phone Number</Label>
                  <Input
                    type="text"
                    {...register("phone_number", {required: false})}
                    id="country"
                    placeholder="Your Phone Number"
                  />
                  {errors.phone_number ? (
                    <p className="text-red-400 max-[600px]:text-sm">
                      {errors.phone_number.message}
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
