import LoadingScreen from '@/components/Loading/LoadingScreen';
import EmptyOrder from '@/components/Order/EmptyOrder';
import OrderCard from '@/components/Order/OrderCard';
import { useGetCustomerOrderList } from '@/hooks/order.hooks';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/order/completed')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending: isOrderLoading, data: customerOrder } =
    useGetCustomerOrderList({ query: { isCompleted: true } });

  if (isOrderLoading)
    return <LoadingScreen description="Loading orders . . ." />;


  return (
    <div>
      {customerOrder?.data?.length ? (
        <div className=" h-full px-space-12 py-space-12">
          {customerOrder?.data.map((order) => <OrderCard order={order} />)}
        </div>
      ) : (
        <EmptyOrder text="No any completed products." wantButton={false}/>
      )}
    </div>
  );
}