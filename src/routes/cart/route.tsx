import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
  beforeLoad: ({context})=>{
      const {isAuthenticated} = context.auth.getState()
    
      if(!isAuthenticated){
        throw redirect({to: '/auth/login'})
      }
    }
})

function RouteComponent() {
  return <Outlet/>
}
