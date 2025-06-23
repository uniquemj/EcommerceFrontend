import { OrderStatus, type OrderItem } from "@/types/order.types";
import React from "react";
import { Badge } from "../ui/badge";
import OrderReturnInitialize from "./OrderReturnInitialize";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getFormalStatus } from "@/utils/helper";

interface OrderItemCardProps {
  orderItem: OrderItem;
}

const OrderItemCard = ({ orderItem }: OrderItemCardProps) => {
  return (
    // <div className="flex justify-evenly items-center min-w-space-460">
    //   <div className="w-space-120 h-space-60 max-w-space-120 max-h-space-60 ">
    //     <div className="w-space-60 h-space-60">
    //       <img
    //         src={orderItem.item.productVariant.images.url}
    //         className="h-full w-full object-contain rounded-8"
    //       />
    //     </div>
    //   </div>
    //   <div className="max-w-space-120 h-full flex flex-col flex-wrap">
    //     <div className="w-space-60">
    //       <h1 className="truncate text-14 text-secondary-shade-dark font-medium">
    //         {orderItem.item.productVariant.product.name}
    //       </h1>
    //     </div>
    //     <div className="flex items-center flex-wrap gap-space-4">
    //       <p className="text-12 text-ternary-color">
    //         Color: {orderItem.item.productVariant.color}
    //       </p>
    //       {orderItem.item.productVariant.size && (
    //         <p className="text-12 text-ternary-color">
    //           Size: {orderItem.item.productVariant.size}
    //         </p>
    //       )}
    //     </div>
    //   </div>
    //   <div className="h-full max-w-space-120">
    //     <p className="font-medium text-secondary-color">
    //       Rs.{orderItem.item.quantity * orderItem.item.productVariant.price}
    //     </p>
    //   </div>
    //   <div className="h-space-52">
    //     <Badge
    //       className={`py-space-2 ${orderItem.order_status === OrderStatus.Pending ? `bg-ternary-color text-text-color` : orderItem.order_status === OrderStatus.Delivered ? `bg-secondary-shade-normal text-text-color` : orderItem.order_status == OrderStatus.Canceled ? `bg-error-color text-text-color` : `bg-amber-color`}`}
    //     >
    //       {getFormalStatus(orderItem.order_status)}
    //     </Badge>
    //   </div>
    //   {orderItem.order_status == OrderStatus.Delivered && (
    //     <OrderReturnInitialize orderItemId={orderItem._id} />
    //   )}
    //   {orderItem.return_reason?.length && (
    //     <Popover>
    //       <PopoverTrigger asChild>
    //         <Button
    //           className="rounded-none border-1 border-secondary-shade-normal text-secondary-shade-normal hover:text-secondary-shade-normal hover:cursor-pointer"
    //           variant={"outline"}
    //         >
    //           View Your Reason
    //         </Button>
    //       </PopoverTrigger>
    //       <PopoverContent className="mt-space-10 px-space-12 py-space-12 border-1 bg-amber-50">
    //         <div className="flex flex-col gap-space-10">
    //           <h1 className="text-14">Your Return Reason</h1>
    //           <Separator className="bg-little-dark" />
    //           <p className="text-wrap text-12 italic">
    //             "{orderItem.return_reason}"
    //           </p>
    //         </div>
    //       </PopoverContent>
    //     </Popover>
    //   )}
    // </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
  {/* Product Image */}
  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-md border border-gray-200 overflow-hidden">
    <img
      src={orderItem.item.productVariant.images.url}
      className="h-full w-full object-contain"
      alt={orderItem.item.productVariant.product.name}
    />
  </div>
  
  {/* Product Info */}
  <div className="flex-1 min-w-0">
    <h3 className="text-sm font-medium text-gray-900 truncate">
      {orderItem.item.productVariant.product.name}
    </h3>
    <div className="flex flex-wrap gap-2 mt-1">
      <span className="text-xs text-gray-500">
        Color: {orderItem.item.productVariant.color}
      </span>
      {orderItem.item.productVariant.size && (
        <span className="text-xs text-gray-500">
          Size: {orderItem.item.productVariant.size}
        </span>
      )}
    </div>
    <p className="text-sm font-medium text-gray-900 mt-1">
      Rs.{(orderItem.item.quantity * orderItem.item.productVariant.price).toLocaleString()}
    </p>
    <p className="text-xs text-gray-500 mt-1">
      Qty: {orderItem.item.quantity}
    </p>
  </div>
  
  {/* Status Section */}
  <div className="w-full sm:w-auto flex sm:flex-col items-start sm:items-end gap-3">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${
        orderItem.order_status === OrderStatus.Delivered ? 'bg-green-500' :
        orderItem.order_status === OrderStatus.Canceled || orderItem.order_status.endsWith("rejected")? 'bg-red-500' :
        orderItem.order_status.startsWith("return")? "bg-blue-500":"bg-amber-500"
        
      }`} />
      <span className="text-sm font-medium">
        {getFormalStatus(orderItem.order_status)}
      </span>
    </div>
    
    {orderItem.order_status === OrderStatus.Delivered && (
      <OrderReturnInitialize orderItemId={orderItem._id} />
    )}
    
    {orderItem.return_reason?.length && (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            View Return Reason
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 border border-gray-200 shadow-lg bg-white">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Return Reason</h4>
            <Separator className="bg-gray-200" />
            <p className="text-xs text-gray-700 italic">
              "{orderItem.return_reason}"
            </p>
          </div>
        </PopoverContent>
      </Popover>
    )}
  </div>
</div>
  );
};

export default OrderItemCard;
