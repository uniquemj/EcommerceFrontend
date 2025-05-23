import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/ui/spinner'
import { useGetSellerProfile } from '@/hooks/seller.hooks'
import { useAuth } from '@/store/auth.store'
import { useSellerState } from '@/store/seller.store'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, data:seller} = useGetSellerProfile()
  const {initials, fullname, email} = useAuth()
  const {avatar} = useSellerState()
  if(isPending) return <div className='flex w-full h-full justify-center items-center'><Spinner/></div>
  return(
    <div>
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">
          Seller Profile
        </h1>
        <Separator className="bg-[rgba(0,0,0,0.3)]" />
      </div>
      <Card className='p-5'>
        <div className='w-full flex flex-col items-center gap-6'>
          <Avatar className='max-[1200px]:w-[60%] w-[15%] h-auto flex justify-center items-center'>
            <AvatarImage src={avatar as string} alt={initials}/>
            <AvatarFallback className="rounded-lg text-red-400 font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div className=''>
            <div className='flex flex-col space-y-1'>
              <h1 className='text-xl min-[460px]:text-2xl font-semibold text-center'>{fullname}</h1>
              <h1 className='text-sm min-[460px]:text-md font-medium text-gray-400'>{email}</h1>
            </div>
          </div>
        </div>
        <Separator/>
        <CardContent className='w-full flex flex-col justify-center items-center'>
          <div className=' w-full min-[550px]:w-4/5 min-[950px]:w-2/5 flex flex-col justify-center items-center gap-10'>
              <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
                <h1 className='w-[50%] max-[365px]:text-sm font-semibold text-left'>Store Name:</h1>
                <h2 className='w-[50%] max-[365px]:text-sm  font-medium text-right'>{seller?.data.store_name}</h2>
              </div>

              <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
                <h1 className='w-[50%] max-[365px]:text-sm font-semibold text-left'>City:</h1>
                <h2 className='w-[50%] max-[365px]:text-sm  font-medium text-right'>{seller?.data.city}</h2>
              </div>

              <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
                <h1 className='w-[50%] max-[365px]:text-sm font-semibold text-left'>County:</h1>
                <h2 className='w-[50%] max-[365px]:text-sm  font-medium text-right'>{seller?.data.country}</h2>
              </div>

              <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
                <h1 className='w-[50%] max-[365px]:text-sm font-semibold text-left'>Address:</h1>
                <h2 className='w-[50%] max-[365px]:text-sm  font-medium text-right'>{seller?.data.address}</h2>
              </div>

              <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
                <h1 className='w-[50%] max-[365px]:text-sm font-semibold text-left'>Phone Number:</h1>
                <h2 className='w-[50%] max-[365px]:text-sm  font-medium text-right'>{seller?.data.phone_number}</h2>
              </div>

          </div>
        </CardContent>
        <Separator/>
        <CardFooter className='w-full'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-semibold text-center bg-amber-200'>Legal Documents:</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-10'>
              {
                seller?.data.legal_document.map((image) => (
                  <div key={image._id} className='w-[150px]'>
                    <img src={image.url} />
                  </div>
                ))
              }
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
