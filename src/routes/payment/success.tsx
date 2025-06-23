import PaymentSuccessPage from '@/components/Card/PaymentSuccess'
import { createFileRoute, redirect } from '@tanstack/react-router'

type PaymentSuccessSearchParams = {
  session_id: string;
}

export const Route = createFileRoute('/payment/success')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): PaymentSuccessSearchParams =>{
    if(typeof search.session_id !== 'string'){
      throw redirect({to: '/'})
    }
    return {session_id: search.session_id}
  },
  beforeLoad: async ({ search }) => {

    const {session_id} = search
    if (!session_id) {
      throw redirect({ to: '/' }); // Block direct access
    }
  }
})

function RouteComponent() {
  return(
  <div className=''>
    <PaymentSuccessPage/>
  </div>
  )
}
