import SideLayout from '@/components/Layout/SideNavbar/SideLayout'
import { navRoute } from '@/config/route.constant'
import { useAuth } from '@/store/auth.store'
import { useSellerState } from '@/store/seller.store'
import { UserRole } from '@/types/enum.types'
import type { DataType } from '@/types/navbar.typs'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
   beforeLoad: ({context}) =>{
      const {isAuthenticated, role} = context.auth.getState()
      if(!isAuthenticated || role !== UserRole.ADMIN){
        throw redirect({to: '/auth/login'})
      }
    }
})


function RouteComponent() {
  const {fullname, email, role,  initials} = useAuth()
  const {avatar} = useSellerState()
  const adminRoute = navRoute.admin

  const data: DataType = {
    heading: "BajarHub Admin",
    menu: adminRoute,
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
