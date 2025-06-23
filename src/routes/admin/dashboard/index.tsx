import { StatCard } from "@/components/Card/DashboardCard";
import { SimpleBarChart } from "@/components/Card/SimpleBarGraph";
import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetAuditLog } from "@/hooks/audit.hooks";
import { useGetCustomerCount } from "@/hooks/customer.hooks";
import { useGetOrderItemsForAdmin } from "@/hooks/order.hooks";
import { useGetProductCount } from "@/hooks/product.hooks";
import { useGetSllerCount } from "@/hooks/seller.hooks";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Package, ShoppingCart, Store, User } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: sellerCount } = useGetSllerCount();
  const { data: customerCount } = useGetCustomerCount();
  const { data: productCount } = useGetProductCount();
  const { data: orderItems } = useGetOrderItemsForAdmin({ page: 0, limit: 0 });
  const {data: auditLogs} = useGetAuditLog()
  return (
    <DashboardHeader header={`Welcome!`} buttons={[]}>
      <div className="max-sm:px-space-12 max-sm:py-space-12 px-space-24 py-space-24">
        <div className="w-full flex flex-wrap max-940:gap-space-24 max-940:justify-center min-940:justify-evenly">
          <StatCard
            title="Verified Stores"
            value={sellerCount?.data as number}
            icon={Store}
            iconColor="text-secondary-shade-normal"
            bgColor="bg-secondary-shade-lightest"
          />
          <StatCard
            title="Active Users"
            value={customerCount?.data as number}
            icon={User}
            iconColor="text-blue-500"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Active Products"
            value={productCount?.data as number}
            icon={Package}
            iconColor="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Order Volume"
            value={orderItems?.data.length || 0}
            icon={ShoppingCart}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-100"
          />
        </div>
      </div>
      <div className="w-full px-space-24 py-space-24">
        {/* <DashboardLineChart/> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
  {/* 1. User Distribution Graph (Left Side) */}
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle>User Analysis</CardTitle>
      <CardDescription>Platform user distribution</CardDescription>
    </CardHeader>
    <CardContent>
      <SimpleBarChart
        data={[
          { name: 'Customers', value: customerCount?.data || 0 },
          { name: 'Sellers', value: sellerCount?.data || 0 }
        ]}
      />
    </CardContent>
  </Card>

  {/* 2. Audit Log Summary (Right Side) */}
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Activity monitoring</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Recent Activities</h4>
        <div className="space-y-3">
          {auditLogs?.data
            ?.slice(0, 3)
            ?.map(log => (
              <div key={log._id} className="flex items-start gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">
                    {log.activity.replace(/,/g, ' • ')}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {new Date(log.createdAt).toLocaleTimeString()} • {log.userId}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="font-medium">Response Status</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          {['success', 'error', 'pending'].map(status => (
            <div key={status}>
              <div className="text-xl font-bold">
                {auditLogs?.data?.filter(log => {
                  try {
                    const res = JSON.parse(log.response);
                    return status === 'success' 
                      ? res.success 
                      : status === 'error'
                      ? !res.success
                      : false;
                  } catch {
                    return false;
                  }
                }).length || 0}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
</div>
      </div>
      <div className="w-full px-space-24 py-space-24">
        {/* <TopProductsCard products={topSellProduct?.data as ProductInfo[]}/> */}
      </div>
    </DashboardHeader>
  );
}
