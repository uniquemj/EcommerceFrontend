import SellerProfile from '@/components/Profile/SellerProfile'
import Spinner from '@/components/ui/spinner'
import { useGetSellerProfile } from '@/hooks/seller.hooks'
import { useAuth } from '@/store/auth.store'
import { useSellerState } from '@/store/seller.store'
import type { SellerProfileInfo } from '@/types/user.types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/profile/')({
  component: RouteComponent,
})


function RouteComponent() {
  const {isPending, data:seller} = useGetSellerProfile()
  const {initials, fullname, email} = useAuth()
  const {avatar} = useSellerState()
  if(isPending) return <div className='flex w-full h-full justify-center items-center'><Spinner/></div>

  const profileInfo: Partial<SellerProfileInfo> = {
    initials, 
    fullname: fullname as string,
    email: email as string, 
    avatar: avatar as string,
    store_name: seller?.data.store_name,
    city: seller?.data.city,
    country: seller?.data.country,
    address: seller?.data.address,
    phone_number: seller?.data.phone_number,
    legal_documents: seller?.data.legal_document,
    verification_status: seller?.data.verification_status,
    rejection_reason: seller?.data.rejection_reason
  }

  return(
    <>
      <SellerProfile heading={"Seller Profile"} profileInfo={profileInfo} buttons={[]}/>
    </>
  )
}
