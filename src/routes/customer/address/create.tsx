import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader'
import ShipmentForm from '@/components/Shipment/ShipmentForm'
import { useCreateAddress } from '@/hooks/shipment.hooks';
import type { AddressType } from '@/validations/shipment.validate';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/address/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending: isCreating, mutate } = useCreateAddress();
  const navigate = useNavigate()
  const handleSubmit = (value: AddressType) => {
    mutate(value,{
      onSuccess: ()=>{
       navigate({
        to: '/customer/address'
       })
      }
    });
  };
  return(
    <DashboardHeader header='Create New Address' buttons={[]} backurl='/customer/address'>
      <ShipmentForm onSuccess={handleSubmit} isLoading={isCreating}/>
    </DashboardHeader>
  )
}
