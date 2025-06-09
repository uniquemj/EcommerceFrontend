import Banner from '@/components/Layout/Banner/Banner'
import FinalCTA from '@/components/Layout/Banner/FinalCTA'
import PromotionContent from '@/components/Layout/Banner/PromotionContent'
import Header from '@/components/Layout/Header/Header'
import FeaturedProduct from '@/components/Product/FeaturedProduct'
import NewArrival from '@/components/Product/NewArrival'
import TopSell from '@/components/Product/TopSell'
import { UserRole } from '@/types/enum.types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: ({context}) =>{
    const {role} = context.auth.getState()
    // const allowedRole: string[] = [UserRole.ANONYMOUS, UserRole.CUSTOMER]
    
    if(role == UserRole.SELLER){
      throw redirect({
        to: '/seller/dashboard'
      })
    }
    
    if(role == UserRole.ADMIN){
      throw redirect({
        to: '/admin/dashboard'
      })
    }
    // if(!allowedRole.includes(role)){
    //   useAuth.persist.clearStorage()
    //   useAuth.setState({
    //     isAuthenticated: false,
    //     role: UserRole.ANONYMOUS
    //   })
    //   throw redirect({to: '/auth/login'})
    // }
  }
})

function RouteComponent() {
  return (
    <div>
      <div className='max-sm:px-space-8 min-sm:px-space-42 pt-space-20'>
        <Header/>
        <Banner/>
        <NewArrival/>
        <PromotionContent/>
        <TopSell/>
        <FeaturedProduct/>
      </div>
      <FinalCTA/>
    </div>
  )
}
