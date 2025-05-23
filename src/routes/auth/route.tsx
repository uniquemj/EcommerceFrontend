import { UserRole } from '@/types/enum.types'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: ({context}) =>{
    const {isAuthenticated, role} = context.auth.getState()
    const route = role === UserRole.SELLER ? "/seller/dashboard" : role === UserRole.ADMIN ? "/admin/dashboard" : "/"
    if(isAuthenticated){
      throw redirect({to: route})
    }
  }
})

function RouteComponent() {
  return (
    <>
      <Outlet/>
    </>
  )
}
