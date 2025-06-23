import Container from "@/components/Layout/Container/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { status_style } from "@/config/status.config";
import { OrderStatus, type OrderItem } from "@/types/order.types";
import { getFormalStatus } from "@/utils/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Seller } from "@/types/user.types";
import { InfoItem } from "@/components/Card/InfoDisplay";
import { CheckCircle, Clock, Info, RotateCw, Store, Truck, User, XCircle } from "lucide-react";

interface OrderItemProps {
  sellerDetail: Seller;
  orderItemDetail: OrderItem;
}

const OrderItemDetail = ({ sellerDetail, orderItemDetail }: OrderItemProps) => {
  const orderStatus = getFormalStatus(orderItemDetail.order_status);
    const totalPrice = (orderItemDetail?.item?.quantity as number) * 
                    (orderItemDetail?.item?.productVariant?.price as number);

  // Status configuration
  const statusConfig = {
    [OrderStatus.Pending]: {
      className: 'bg-amber-100 text-amber-800',
      icon: <Clock className="h-4 w-4" />
    },
    [OrderStatus.Delivered]: {
      className: 'bg-green-100 text-green-800',
      icon: <CheckCircle className="h-4 w-4" />
    },
    [OrderStatus.Shipping]: {
      className: 'bg-blue-100 text-blue-800',
      icon: <Truck className="h-4 w-4" />
    },
    [OrderStatus.Canceled]: {
      className: 'bg-red-100 text-red-800',
      icon: <XCircle className="h-4 w-4" />
    },
    return: {
      className: 'bg-purple-100 text-purple-800',
      icon: <RotateCw className="h-4 w-4" />
    },
    rejected: {
      className: 'bg-gray-100 text-gray-800',
      icon: <XCircle className="h-4 w-4" />
    },
    default: {
      className: 'bg-gray-100 text-gray-800',
      icon: <Info className="h-4 w-4" />
    }
  };

  const getStatusConfig = (status: string) => {
    if (status.startsWith("return")) return statusConfig.return;
    if (status === "rejected") return statusConfig.rejected;
    return statusConfig[status] || statusConfig.default;
  };

  const currentStatus = getStatusConfig(orderItemDetail.order_status);
  // return (
  //   <div className="w-full h-full  grid grid-cols-1 min-940:grid-cols-2 gap-space-24">
  //     <div className="">
  //       <div className="px-space-24 py-space-12 border-b-1 flex justify-between">
  //         <h1 className="truncate text-20 font-semibold">
  //           Product Information
  //         </h1>
  //         <Badge
  //           className={
  //             orderItemDetail?.order_status == OrderStatus.Pending
  //               ? status_style[OrderStatus.Pending].className
  //               : orderItemDetail?.order_status == OrderStatus.Delivered
  //                 ? status_style[OrderStatus.Delivered].className
  //                 : orderItemDetail?.order_status.startsWith("return")
  //                   ? status_style["return"].className
  //                   : orderItemDetail?.order_status == "rejected"
  //                     ? status_style["rejected"].className
  //                     : status_style["other"].className
  //           }
  //         >
  //           {orderStatus}
  //         </Badge>
  //       </div>
  //       <Container>
  //         <div className="grid grid-cols-2 gap-space-24">
  //           <div className=" flex justify-center  w-full h-space-220">
  //             <div className="w-space-180 h-full border-1">
  //               <img
  //                 src={orderItemDetail?.item.productVariant.images.url}
  //                 className="w-full h-full object-contain"
  //               />
  //             </div>
  //           </div>
  //           <div className="flex flex-col gap-space-10">
  //             <h1 className="text-secondary-shade-dark font-medium text-20 line-clamp-1">
  //               {orderItemDetail?.item.productVariant.product.name}
  //             </h1>
  //             <Separator />
  //             <div className="flex flex-col gap-space-10">
  //               <div>
  //                 <h1 className="text-14 font-medium">Product Detail:</h1>
  //                 <div className="pl-space-24 py-space-4">
  //                   <ul>
  //                     <li className="text-12 list-disc">
  //                       Color: {orderItemDetail?.item.productVariant.color}
  //                     </li>
  //                     {orderItemDetail?.item.productVariant.size ? (
  //                       <li className="text-12 list-disc">
  //                         Size: {orderItemDetail?.item.productVariant.size}
  //                       </li>
  //                     ) : null}
  //                   </ul>
  //                 </div>
  //               </div>
  //               <h1 className="font-medium text-14">
  //                 Qty: x{orderItemDetail?.item.quantity}
  //               </h1>
  //               <h1 className="font-medium text-14">
  //                 Price:{" "}
  //                 <span className="text-18 text-secondary-shade-normal">
  //                   Rs.
  //                   {(orderItemDetail?.item?.quantity as number) *
  //                     (orderItemDetail?.item?.productVariant?.price as number)}
  //                 </span>
  //               </h1>
  //               <h1 className="text-14 font-medium text-wrap">
  //                 Payment Method:{" "}
  //                 <span className="font-normal underline">
  //                   {orderItemDetail?.order_id.payment_method}
  //                 </span>
  //               </h1>
  //               <div className="flex gap-space-10">
  //                 <h1 className="text-14 font-medium">Payment Status:</h1>
  //                 <Badge
  //                   className={`${orderItemDetail?.order_id.payment_status == "unpaid" ? status_style["pending"].className : "bg-green-color text-text-color"}`}
  //                 >
  //                   {orderItemDetail?.order_id.payment_status}
  //                 </Badge>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {orderItemDetail.order_status.startsWith("return") && (
  //           <div className="w-full px-space-24 py-space-24">
  //             <h1 className="text-18 font-medium">Return Reason:</h1>
  //             <div className="px-space-12 py-space-12 border-1 border-secondary-color">
  //               <p>{orderItemDetail.return_reason}</p>
  //             </div>
  //           </div>
  //         )}
  //       </Container>
  //     </div>
  //     <div className="max-940:border-t-1 min-940:border-l-1">

  //       <Tabs defaultValue="sender">
  //         <div className=" border-b-1 px-space-24  flex justify-between items-center">
  //           <div className="flex  gap-space-12 max-sm:flex-col justify-between items-center border-b-1 w-full py-space-12">
  //             <h1 className="truncate text-20 font-semibold">
  //               Delivery Information
  //             </h1>
  //             <TabsList>
  //               <TabsTrigger
  //                 value="sender"
  //                 className="data-[state=active]:text-text-color"
  //               >
  //                 Store
  //               </TabsTrigger>
  //               <TabsTrigger
  //                 value="reciever"
  //                 className="data-[state=active]:text-text-color"
  //               >
  //                 Reciever
  //               </TabsTrigger>
  //             </TabsList>
  //           </div>
  //         </div>
  //         <TabsContent value="sender">
  //          <div className="px-space-24 py-space-24 flex flex-col gap-space-24">
  //             <div>
  //               <h1 className=" text-18 font-medium underline">
  //                 Store Information
  //               </h1>
  //               <div className="py-space-12 grid grid-cols-1 min-940:grid-cols-2">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-14 font-normal">Store Name:</h1>
  //                   <p className="text-16 font-medium">
  //                     {sellerDetail.store_name}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Full Name:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.fullname}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div>
  //               <h1 className="text-18 font-medium underline">
  //                 Contact Information
  //               </h1>
  //               <div className="py-space-12 flex flex-wrap gap-x-space-24 gap-y-space-12">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Email:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.email}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Phone Number:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.phone_number}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div>
  //               <h1 className="text-18 font-medium underline">
  //                 Address Information
  //               </h1>
  //               <div className="py-space-12 flex flex-wrap gap-x-space-24 gap-y-space-12">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">City:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.city}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Country:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.country}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Street Address:</h1>
  //                   <p className="text-18 font-medium">
  //                     {sellerDetail.address}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </TabsContent>
  //         <TabsContent value="reciever">
  //           <div className="px-space-24 py-space-24 flex flex-col gap-space-24">
  //             <div>
  //               <h1 className=" text-18 font-medium underline">
  //                 Receiver Information
  //               </h1>
  //               <div className="py-space-12 grid min-sm:grid-cols-2">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-14 font-normal">FullName:</h1>
  //                   <p className="text-16 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.full_name}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div>
  //               <h1 className="text-18 font-medium underline">
  //                 Contact Information
  //               </h1>
  //               <div className="py-space-12 grid grid-cols-1 min-sm:grid-cols-2">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Email:</h1>
  //                   <p className="text-18 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.email}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Phone Number:</h1>
  //                   <p className="text-18 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.phone_number}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div>
  //               <h1 className="text-18 font-medium underline">
  //                 Address Information
  //               </h1>
  //               <div className="py-space-12 flex flex-wrap gap-x-space-24 gap-y-space-12">
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Region:</h1>
  //                   <p className="text-18 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.region}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">City:</h1>
  //                   <p className="text-18 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.city}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-space-10 items-center">
  //                   <h1 className="text-16 font-normal">Street Address:</h1>
  //                   <p className="text-18 font-medium">
  //                     {orderItemDetail?.order_id.shipping_id.address}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </TabsContent>
  //       </Tabs>
  //     </div>
  //   </div>
  // );
   return (
    <div className="w-full h-full grid grid-cols-1 min-940:grid-cols-2 gap-6 p-4">
      {/* Product Information Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Product Information
          </h1>
          <Badge className={`flex items-center gap-1 ${currentStatus.className}`}>
            {currentStatus.icon}
            {orderStatus}
          </Badge>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="w-64 h-64 border rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={orderItemDetail?.item.productVariant.images.url}
                  className="w-full h-full object-contain p-2"
                  alt={orderItemDetail?.item.productVariant.product.name}
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {orderItemDetail?.item.productVariant.product.name}
              </h1>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-700 mb-2">Product Details</h2>
                  <ul className="space-y-1 pl-4">
                    <li className="text-sm text-gray-600 list-disc">
                      Color: {orderItemDetail?.item.productVariant.color}
                    </li>
                    {orderItemDetail?.item.productVariant.size && (
                      <li className="text-sm text-gray-600 list-disc">
                        Size: {orderItemDetail?.item.productVariant.size}
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Quantity</p>
                    <p className="text-base font-semibold">x{orderItemDetail?.item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Price</p>
                    <p className="text-lg font-semibold text-blue-600">
                      Rs. {totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Payment Method</p>
                  <p className="text-base font-medium">
                    {orderItemDetail?.order_id.payment_method}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">Payment Status:</p>
                  <Badge className={
                    orderItemDetail?.order_id.payment_status === "unpaid" 
                      ? "bg-amber-100 text-amber-800" 
                      : "bg-green-100 text-green-800"
                  }>
                    {orderItemDetail?.order_id.payment_status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Return Reason (if applicable) */}
          {orderItemDetail.order_status.startsWith("return") && (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Return Reason</h2>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-700">{orderItemDetail.return_reason}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delivery Information Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Tabs defaultValue="sender">
          <div className="px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Delivery Information
            </h1>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="sender" className="data-[state=active]:bg-gray-100">
                <Store className="h-4 w-4 mr-2" />
                Store
              </TabsTrigger>
              <TabsTrigger value="receiver" className="data-[state=active]:bg-gray-100">
                <User className="h-4 w-4 mr-2" />
                Receiver
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Store Information */}
          <TabsContent value="sender" className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Store Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Store Name" value={sellerDetail.store_name} />
                  <InfoItem label="Owner Name" value={sellerDetail.fullname} />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Email" value={sellerDetail.email} />
                  <InfoItem label="Phone" value={sellerDetail.phone_number} />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="City" value={sellerDetail.city} />
                  <InfoItem label="Country" value={sellerDetail.country} />
                  <InfoItem 
                    label="Address" 
                    value={sellerDetail.address} 
                    className="md:col-span-2" 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Receiver Information */}
          <TabsContent value="receiver" className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Receiver Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem 
                    label="Full Name" 
                    value={orderItemDetail?.order_id.shipping_id.full_name} 
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem 
                    label="Email" 
                    value={orderItemDetail?.order_id.shipping_id.email} 
                  />
                  <InfoItem 
                    label="Phone" 
                    value={orderItemDetail?.order_id.shipping_id.phone_number} 
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem 
                    label="Region" 
                    value={orderItemDetail?.order_id.shipping_id.region} 
                  />
                  <InfoItem 
                    label="City" 
                    value={orderItemDetail?.order_id.shipping_id.city} 
                  />
                  <InfoItem 
                    label="Address" 
                    value={orderItemDetail?.order_id.shipping_id.address} 
                    className="md:col-span-2" 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderItemDetail;
