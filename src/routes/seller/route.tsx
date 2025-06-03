import SideLayout from '@/components/Layout/SideNavbar/SideLayout'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { navRoute } from '@/config/route.constant'
import type { DataType } from '@/types/navbar.typs'
import { useAuth } from '@/store/auth.store'
import { UserRole } from '@/types/enum.types'
import { useSellerState } from '@/store/seller.store'
import { useEffect } from 'react'
import { useGetSellerProfile } from '@/hooks/seller.hooks'

export const Route = createFileRoute('/seller')({
  component: RouteComponent,
  beforeLoad: ({context}) =>{
    const {isAuthenticated, role} = context.auth.getState()
    if(!isAuthenticated || role !== UserRole.SELLER){
      throw redirect({to: '/auth/login'})
    }
  }
})

function RouteComponent() {
  const {fullname, email, role,  initials} = useAuth()
  const {avatar} = useSellerState()
  const sellerRoute = navRoute.seller
  const { data: seller } = useGetSellerProfile();
  const {setRole} = useAuth()
  const { setIsVerified } = useSellerState();

  useEffect(() => {
    if (seller) {
      setIsVerified(seller?.data.is_verified);
      setRole(seller.data.role)
    }
  }, [seller, setIsVerified, setRole]);

  const data: DataType = {
    heading: "BajarHub Seller",
    menu: sellerRoute,
    user: {
      name: fullname as string,
      email: email as string,
      role: role as string,
      initials: initials,
      avatar: avatar
    }
  }
  return (
  <SideLayout data = {data}>
    <div className='my-2 mx-8'>
      <Outlet/>
    </div>
  </SideLayout>)
}
