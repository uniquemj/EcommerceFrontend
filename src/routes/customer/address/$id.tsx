import EditShipmentForm from '@/components/Shipment/EditShipmentForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/address/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()

  return(
    <EditShipmentForm id={id}/>
  )
}
