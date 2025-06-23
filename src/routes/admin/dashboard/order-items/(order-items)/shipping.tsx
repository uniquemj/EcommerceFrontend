import LoadingScreen from "@/components/Loading/LoadingScreen";
import { adminOrderItemColumns } from "@/components/Table/Columns/order.columns";
import { OrderDataTable } from "@/components/Table/OrderDataTable";
import { useGetAllOrderItems } from "@/hooks/order.hooks";
import type { OrderItem } from "@/types/order.types";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute(
  "/admin/dashboard/order-items/(order-items)/shipping"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = React.useState(0); // zero-based for table
  const [filterValue, setFilterValue] = React.useState(" "); // for future search
  const pageSize = 10;

  const { isPending, data: allShippingOrderItems } = useGetAllOrderItems({
    query: { order_status: "shipping" },
    pagination: {
      page: pageIndex + 1,
      limit: pageSize,
    },
  });

const filteredData =
    filterValue === " "
      ? allShippingOrderItems?.data?.orderItems
      : allShippingOrderItems?.data?.orderItems?.filter((item) => item.order_id.payment_status === filterValue);


  if (isPending) return <LoadingScreen description="Loading . . ." />;
  return (
    <div>
      <OrderDataTable
        data={filteredData as OrderItem[]}
        columns={adminOrderItemColumns}
        totalCount={allShippingOrderItems?.paginationData?.total_items || 0} // required for pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        filterValue={filterValue}
        onFilterChange={(value) => {
          setFilterValue(value);
          setPageIndex(0); // reset to first page on filter
        }}
      />
    </div>
  );
}
