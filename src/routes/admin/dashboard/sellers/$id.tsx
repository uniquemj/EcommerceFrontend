import SellerProfile from '@/components/Profile/SellerProfile'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { useGetSellerById, useVerifySeller } from '@/hooks/seller.hooks'
import type { SellerProfileInfo } from '@/types/user.types'
import { getInitialName } from '@/utils/helper'
import { createFileRoute} from '@tanstack/react-router'
import RejectForm from '@/components/Form/RejectForm'

export const Route = createFileRoute('/admin/dashboard/sellers/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()
  const {isPending, data: seller} = useGetSellerById(id)
  const {isPending: verificationPending, mutate} = useVerifySeller()

  if(isPending) return <Spinner/>

  const sellerInfo: Partial<SellerProfileInfo> = {
    initials: getInitialName(seller?.data.fullname as string), 
    fullname: seller?.data.fullname as string,
    email: seller?.data.email as string, 
    avatar: seller?.data.store_logo.length as number > 0 ? seller?.data.store_logo[0].url as string: undefined,
    store_name: seller?.data.store_name,
    city: seller?.data.city,
    country: seller?.data.country,
    address: seller?.data.address,
    phone_number: seller?.data.phone_number,
    legal_documents: seller?.data.legal_document,
    verification_status: seller?.data.verification_status
  }


  const handleVerify = (id: string) =>{
    mutate(id)
  }

  if(verificationPending) return <Spinner/>

  let buttons:React.ReactNode[] = []


  buttons = [(<Button className='bg-blue-400 text-text-color' onClick={()=>handleVerify(id)}>Accept</Button>), (<RejectForm id={id}/>)]


  return(
    <>
      <SellerProfile heading = "Seller Review" profileInfo={sellerInfo} buttons={buttons}/>
    </>
  )
}
