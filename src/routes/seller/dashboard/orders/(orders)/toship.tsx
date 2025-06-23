import LoadingScreen from "@/components/Loading/LoadingScreen";
import { sellerOrderColumns } from "@/components/Table/Columns/order.columns";
import { OrderDataTable } from "@/components/Table/OrderDataTable";
import { Button } from "@/components/ui/button";

import { useGetSellerOrderItems } from "@/hooks/order.hooks";
import { OrderStatus, type OrderItem } from "@/types/order.types";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute(
  "/seller/dashboard/orders/(orders)/toship"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [status, setStatus] = useState("to_pack");
  const [pageIndex, setPageIndex] = React.useState(0); // zero-based for table
  const [filterValue, setFilterValue] = React.useState(" "); // for future search

  const pageSize = 10;

  const { isPending, data: orderItemData } = useGetSellerOrderItems({
    orderFilter: status,
    pagination: {
      page: pageIndex + 1,
      limit: pageSize,
    },
  });

  const handleChangeStatus = (status: string) => {
    setStatus(status);
  };
 const filteredData =
    filterValue === " "
      ? orderItemData?.data
      : orderItemData?.data?.filter((item) => item.order_id.payment_status === filterValue);

 
  if (isPending) return <LoadingScreen description="Loading . . ." />;

  return (
    <div className="flex flex-col gap-space-24">
      <div className="flex justify-center flex-wrap gap-space-10">
        <div>
          <Button
            variant={"outline"}
            className={`rounded-none hover:cursor-pointer ${status == OrderStatus.ToPack && `bg-secondary-color text-text-color`} `}
            onClick={() => handleChangeStatus(OrderStatus.ToPack)}
          >
            To Pack
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            className={`rounded-none hover:cursor-pointer ${status == OrderStatus.ToArrangeShipment && `bg-secondary-color text-text-color`} `}
            onClick={() => handleChangeStatus(OrderStatus.ToArrangeShipment)}
          >
            To Arrange Shipment
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            className={`rounded-none hover:cursor-pointer ${status == OrderStatus.ToHandOver && `bg-secondary-color text-text-color`} `}
            onClick={() => handleChangeStatus(OrderStatus.ToHandOver)}
          >
            To Handover
          </Button>
        </div>
      </div>
      <div>
        <OrderDataTable
          columns={sellerOrderColumns}
          data={filteredData as OrderItem[]}
          totalCount={orderItemData?.paginationData?.total_items || 0} // required for pagination
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
    </div>
  );
}
