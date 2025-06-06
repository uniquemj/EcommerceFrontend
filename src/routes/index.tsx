import Header from '@/components/Layout/Header/Header'
import { useAuth } from '@/store/auth.store'
import { UserRole } from '@/types/enum.types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: ({context}) =>{
    const {role} = context.auth.getState()
    const allowedRole: string[] = [UserRole.ANONYMOUS, UserRole.CUSTOMER]
    
    if(!allowedRole.includes(role)){
      useAuth.persist.clearStorage()
      useAuth.setState({
        isAuthenticated: false,
        role: UserRole.ANONYMOUS
      })
      throw redirect({to: '/auth/login'})
    }
  }
})

function RouteComponent() {
  return (
    <div className='max-sm:px-space-8 min-sm:px-space-42 py-space-20'>
      <Header/>
    </div>
  )
}
