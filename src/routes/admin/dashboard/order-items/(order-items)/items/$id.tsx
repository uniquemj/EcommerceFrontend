import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import OrderItemDetail from '@/components/Order/Dashboard/OrderitemDetail';
import OrderStatusSheet from '@/components/Order/Dashboard/OrderStatus';
import { Button } from '@/components/ui/button';
import type { adminOrderStatus} from '@/config/status.config';
import { useGetOrderItemDetail, useUpdatePaymentStatus } from '@/hooks/order.hooks';
import type { OrderItem } from '@/types/order.types';
import type { Seller } from '@/types/user.types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/dashboard/order-items/(order-items)/items/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();

  const { isPending, data: orderItemDetail } = useGetOrderItemDetail(id);

  const {mutate} = useUpdatePaymentStatus()

  const handleUpdatePayment = () =>{
    mutate(orderItemDetail?.data.order_id._id as string)
  }
  if (isPending) return <LoadingScreen description="Loading . . ." />;

  const orderItemButton = [
    orderItemDetail?.data.order_status === "shipping" && (
      <OrderStatusSheet
        id={id}
        currentStatus={orderItemDetail?.data?.order_status as adminOrderStatus}
      />
    ),
    orderItemDetail?.data.order_status === 'delivered' && orderItemDetail.data.order_id.payment_status == 'unpaid' && (
      <Button className='rounded-none bg-transparent border-1 border-secondary-color text-secondary-color hover:bg-transparent hover:cursor-pointer' onClick={handleUpdatePayment}>
        Mark As Paid
      </Button>
    )
  ];
  return (
    <DashboardHeader
      backurl="/admin/dashboard/order-items/all"
      header={"Item Detail"}
      buttons={orderItemButton}
    >
      <OrderItemDetail sellerDetail={orderItemDetail?.data.seller_id as Seller} orderItemDetail={orderItemDetail?.data as OrderItem} />
    </DashboardHeader>
  );
}