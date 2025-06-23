import { OrderStatus, PaymentStatus, type Order } from "@/types/order.types";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import OrderItemCard from "./OrderItemCard";
import { useCancelOrder } from "@/hooks/order.hooks";
import { CheckCircle, Loader2, Truck } from "lucide-react";
import { Badge } from "../ui/badge";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { isPending, mutate } = useCancelOrder();

  const isCancelAble = order.orderItems.every((item)=>item.order_status == OrderStatus.Pending)

  const handleCancel = () => {
    mutate(order.order._id);
  };



  return (
    // <div className=" flex flex-col border-1 w-full px-space-12 py-space-24 gap-space-24 overflow-x-auto">
    //   <div className="flex items-start justify-between border-b-1 py-space-12 min-w-space-460">
    //     <Link to="/customer/order" className="w-1/5 group/order">
    //       <h1 className=" truncate text-18 underline group-hover/order:text-secondary-shade-normal">
    //         Order#{order.order._id}
    //       </h1>
    //     </Link>
    //     <div>
    //       <h1 className="text-12">
    //         Total:{" "}
    //         <span className="text-secondary-color font-medium text-14">
    //           Rs.{order.order.orderTotal}
    //         </span>
    //       </h1>
    //       <h1 className="text-12">
    //         Items:{" "}
    //         <span className="text-secondary-color font-medium">
    //           {order.orderItems.length}x
    //         </span>
    //       </h1>
    //     </div>
    //     <div>
    //       <Badge
    //       className={`py-space-2 ${order.order.payment_status === PaymentStatus.UnPaid ? `bg-ternary-color text-text-color` : `bg-green-color`}`}
    //     >
    //       {order.order.payment_status}
    //     </Badge>
    //     </div>
    //     <div className="flex gap-space-24">
    //       <div className="flex flex-col items-end">
    //         <h1 className="text-12">
    //           Receiver: {order.order.shipping_id.full_name}
    //         </h1>
    //         <p className="text-12 text-ternary-color">
    //           {order.order.shipping_id.phone_number}
    //         </p>
    //       </div>
    //       {!order.order.isCompleted && isCancelAble && (
    //         <Button
    //           className="rounded-none hover:bg-transparent border-1 border-secondary-color hover:text-secondary-color bg-secondary-color text-text-color hover:cursor-pointer"
    //           onClick={handleCancel}
    //         >
    //           {isPending ? (
    //             <Loader2 className="animate-spin w-4 h-4 mr-2" />
    //           ) : (
    //             "Cancel Order"
    //           )}
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    //   <div className="px-space-12 flex flex-col gap-space-24">
    //     {order.orderItems.map((item) => (
    //       <OrderItemCard orderItem={item} />
    //     ))}
    //   </div>
    // </div>
    <div className="flex flex-col border border-gray-200 rounded-lg w-full p-6 gap-6 shadow-sm hover:shadow-md transition-shadow">
  {/* Order Header */}
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 gap-4">
    <div className="flex-1 min-w-0">
      <div
      
      >
        <h1 className="text-lg font-semibold truncate underline decoration-2 underline-offset-4 group-hover/order:text-blue-600 transition-colors">
          Order #{order.order._id.slice(-8).toUpperCase()}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Placed on {new Date(order.order.order_timeStamp).toLocaleDateString()}
        </p>
      </div>
    </div>
    
    <div className="flex flex-col items-end">
      <div className="text-sm font-medium">
        Total: <span className="text-green-600 ml-1">Rs.{order.order.orderTotal.toLocaleString()}</span>
      </div>
      <div className="text-xs text-gray-500">
        {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        order.order.payment_status === PaymentStatus.UnPaid 
          ? 'bg-red-100 text-red-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {order.order.payment_status}
      </div>
      
      {!order.order.isCompleted && isCancelAble && (
        <Button
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleCancel}
        >
          {isPending ? (
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
          ) : (
            "Cancel Order"
          )}
        </Button>
      )}
    </div>
  </div>
  
  {/* Delivery Info */}
  <div className={`p-3 rounded-lg flex items-center gap-4 ${
  order.order.isCompleted ? 'bg-green-50' : 'bg-blue-50'
}`}>
  {order.order.isCompleted ? (
    <CheckCircle className="w-5 h-5 text-green-500" />
  ) : (
    <Truck className="w-5 h-5 text-blue-500" />
  )}
  
  <div>
    <p className="text-sm font-medium">
      {order.order.isCompleted ? 'Delivered to' : 'Delivering to'} {order.order.shipping_id.full_name}
    </p>
    <p className="text-xs text-gray-600">{order.order.shipping_id.phone_number}</p>
  </div>
  
  <div className="ml-auto">
      <>
        <p className="text-xs text-gray-500">Estimated delivery</p>
        <p className="text-sm font-medium">
          {new Date(new Date(order.order.order_timeStamp).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </p>
      </>
  </div>
</div>
  
  {/* Order Items */}
  <div className="space-y-4">
    {order.orderItems.map((item) => (
      <OrderItemCard key={item._id} orderItem={item} />
    ))}
  </div>
</div>
  );
};

export default OrderCard;
