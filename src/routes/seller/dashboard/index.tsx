import { DashboardLineChart } from "@/components/Card/DashboardBarChart";
import { StatCard } from "@/components/Card/DashboardCard";
import { TopProductsCard } from "@/components/Card/TopSeller";
import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { useGetSellerOrderItems } from "@/hooks/order.hooks";
import {
  useGetSellerProductCount,
  useGetSellerTotalSale,
} from "@/hooks/product.hooks";
import { useAuth } from "@/store/auth.store";
import type { OrderItem } from "@/types/order.types";
import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Package, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/seller/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { fullname } = useAuth();

  const { data: productCount } = useGetSellerProductCount();
  const { data: orderDetail } = useGetSellerOrderItems({pagination: {page: 1, limit: 5}});
  const { data: orderCount } = useGetSellerOrderItems({pagination: {page: 0, limit: 0}});

  const { data: sellCount } = useGetSellerTotalSale();
  
  const order = orderCount?.data?.length || 0;
  return (
    <DashboardHeader header={`Welcome! ${fullname}`} buttons={[]}>
      <div className="max-sm:px-space-12 max-sm:py-space-12 px-space-24 py-space-24">
        <div className="w-full flex flex-wrap max-940:gap-space-24 max-940:justify-center min-940:justify-evenly">
          <StatCard
            title="Total Products"
            value={productCount?.data as number}
            icon={Package}
            iconColor="text-secondary-shade-normal"
            bgColor="bg-secondary-shade-lightest"
          />
          <StatCard
            title="Orders Received"
            value={order}
            icon={ShoppingCart}
            iconColor="text-blue-500"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Products Sold"
            value={sellCount?.data.totalSale as number}
            icon={DollarSign}
            iconColor="text-green-600"
            bgColor="bg-green-100"
          />
        </div>
      </div>
      <div className="w-full px-space-24 py-space-24">
        <DashboardLineChart/>
      </div>
      <div className="w-full px-space-24 py-space-24">
        <TopProductsCard orderItems={orderDetail?.data as OrderItem[]}/>
      </div>
    </DashboardHeader>
  );
}
