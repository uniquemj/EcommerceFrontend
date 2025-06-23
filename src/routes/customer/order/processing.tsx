
import LoadingScreen from "@/components/Loading/LoadingScreen";
import EmptyOrder from "@/components/Order/EmptyOrder";
import OrderCard from "@/components/Order/OrderCard";
import { useGetCustomerOrderList } from "@/hooks/order.hooks";
import { createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/customer/order/processing")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending: isOrderLoading, data: customerOrder } =
    useGetCustomerOrderList({ query: { isCompleted: false } });

  if (isOrderLoading)
    return <LoadingScreen description="Loading orders . . ." />;


  return (
    // <div>
    //   {customerOrder?.data?.length ? (
    //     <div className="h-full px-space-12 py-space-12 flex flex-col gap-space-18">
    //       {customerOrder?.data?.map((order) => <OrderCard order={order} />)}
    //     </div>
    //   ) : (
    //     <EmptyOrder text="You haven’t placed any orders yet" wantButton={true}/>
    //   )}
    // </div>
    <div className="min-h-[400px]">
  {customerOrder?.data?.length ? (
    <div className="h-full px-4 py-6 flex flex-col gap-6">
      {customerOrder?.data?.map((order) => (
        <OrderCard key={order.order._id} order={order} />
      ))}
    </div>
  ) : (
    <EmptyOrder 
      text="You haven't placed any orders yet" 
      wantButton={true}
    />
  )}
</div>
  );
}
