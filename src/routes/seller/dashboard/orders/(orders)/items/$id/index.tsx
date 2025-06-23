
import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import OrderItemDetail from "@/components/Order/Dashboard/OrderitemDetail";
import OrderStatusSheet from "@/components/Order/Dashboard/OrderStatus";

import {  type sellerOrderStatus } from "@/config/status.config";
import { useGetOrderItemDetail } from "@/hooks/order.hooks";
import {  type OrderItem } from "@/types/order.types";
import type { Seller } from "@/types/user.types";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute(
  "/seller/dashboard/orders/(orders)/items/$id/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { isPending, data: orderItemDetail } = useGetOrderItemDetail(id);

  if (isPending) return <LoadingScreen description="Loading . . ." />;

  const orderItemButton = [
    orderItemDetail?.data.order_status !== "delivered" && (
      <OrderStatusSheet
        id={id}
        currentStatus={orderItemDetail?.data?.order_status as sellerOrderStatus}
      />
    ),
  ];
  return (
    <DashboardHeader
      backurl="/seller/dashboard/orders"
      header={"Item Detail"}
      buttons={orderItemButton}
    >
      <OrderItemDetail sellerDetail={orderItemDetail?.data.seller_id as Seller} orderItemDetail={orderItemDetail?.data as OrderItem} />
    </DashboardHeader>
  );
}
