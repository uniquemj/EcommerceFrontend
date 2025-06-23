import ActionOrderListMenu from "@/components/DropDown/orderCompleteMenu";
import ActionOrderMenu from "@/components/DropDown/orderMenu";
import TableDropdown from "@/components/DropDown/table-dropdown";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/store/auth.store";
import {
  OrderStatus,
  type OrderInfo,
  type OrderItem,
  type OrderSummaryDetail,
} from "@/types/order.types";
import { getFormalStatus } from "@/utils/helper";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import {
  CheckCircle,
  Clock,
  Eye,
  Info,
  RotateCw,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";


export const sellerOrderColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "item.productVariant.product.name",
    header: () => <div className="px-4 py-3 font-semibold">PRODUCT</div>,
    cell: ({ row }) => {
      const imgUrl = row.original.item.productVariant.images.url
      const name = row.original.item.productVariant.product.name;
      const { color, size } = row.original.item.productVariant;
      return (
        // <div className="flex items-center gap-3 min-w-[180px] px-4 py-3">
        //   <div className="w-10 h-10 flex-shrink-0">
        //     <img
        //       src={row.original.item.productVariant.images.url}
        //       className="w-full h-full object-cover rounded-md"
        //       alt={name}
        //     />
        //   </div>
        //   <div>
        //     <p className="font-medium text-sm line-clamp-1">{name}</p>
        //     <div className="flex items-center gap-2 mt-1">
        //       <span className="text-xs text-muted-foreground">
        //         Color: {color}
        //       </span>
        //       {size && (
        //         <span className="text-xs text-muted-foreground">
        //           Size: {size}
        //         </span>
        //       )}
        //     </div>
        //   </div>
        // </div>
        <div className="flex items-center max-w-[220px] gap-2 p-2">
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-md"
              alt={name}
            />
          </div>
          <div className="overflow-hidden">
            <div className="font-medium text-gray-900 truncate text-sm">
              {name}
            </div>
            <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
              {color && (
                <span className="inline-flex items-center max-w-[80px] truncate">
                  {/* <span
                    className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  /> */}
                  <span className="truncate">Color: {color}</span>
                </span>
              )}
              {size && (
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs truncate">
                  Size: {size}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "item.quantity",
    header: () => <div className="px-4 py-3 font-semibold">QTY</div>,
    cell: ({ row }) => {
      const quantity = row.original.item.quantity;
      return (
        <div className=" px-4 py-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
            {quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: () => <div className="px-4 py-3 font-semibold">ORDER STATUS</div>,
    cell: ({ row }) => {
      const status = row.original.order_status;
      const formalStatus = getFormalStatus(status);

      const statusConfig = {
        [OrderStatus.Pending]: {
          color: "bg-amber-100 text-amber-800",
          icon: <Clock className="h-3 w-3" />,
          label: "Pending",
        },
        [OrderStatus.Delivered]: {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-3 w-3" />,
          label: "Delivered",
        },
        [OrderStatus.Shipping]: {
          color: "bg-blue-100 text-blue-800",
          icon: <Truck className="h-3 w-3" />,
          label: "Shipping",
        },
        [OrderStatus.Canceled]: {
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="h-3 w-3" />,
          label: "Cancelled",
        },
        default: {
          color: "bg-gray-100 text-gray-800",
          icon: <Info className="h-3 w-3" />,
          label: "Unknown",
        },
      };

      const config = statusConfig[status] || statusConfig.default;

      return (
        <div className="flex items-center gap-2 px-4 py-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
          >
            {config.icon}
            {formalStatus}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_id.payment_status",
    header: () => <div className="px-4 py-3 font-semibold">PAYMENT</div>,
    cell: ({ row }) => {
      const status = row.original.order_id.payment_status;
      return (
        <div className="flex items-center gap-2 px-4 py-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              status === "paid"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status === "paid" ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_id.shipping_id.region",
    header: () => <div className="px-4 py-3 font-semibold">REGION</div>,
    cell: ({ row }) => {
      const region = row.original.order_id.shipping_id.region;
      return (
        <div className="flex items-center px-4 py-3">
          <span className="text-sm text-muted-foreground truncate max-w-[120px]">
            {region}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="px-4 py-3 font-semibold">ACTIONS</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end px-4 py-3">
          <ActionOrderMenu row={row} />
        </div>
      );
    },
  },
];

export const adminOrderItemColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "item.productVariant.product.name",
    header: "PRODUCT",
    cell: ({ row }) => {
      const name = row.original.item.productVariant.product.name;
      const color = row.original.item.productVariant.color;
      const size = row.original.item.productVariant.size ?? undefined;
      const imgUrl = row.original.item.productVariant.images.url;

      return (
        <div className="flex items-center max-w-[220px] gap-2 p-2">
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-md"
              alt={name}
            />
          </div>
          <div className="overflow-hidden">
            <div className="font-medium text-gray-900 truncate text-sm">
              {name}
            </div>
            <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
              {color && (
                <span className="inline-flex items-center max-w-[80px] truncate">
                  <span
                    className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
                    // style={{ backgroundColor: color }}
                  />
                  <span className="truncate">Color: {color}</span>
                </span>
              )}
              {size && (
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs truncate">
                  Size: {size}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    },
    size: 220, // Set explicit column size
  },
  {
    accessorKey: "item.quantity",
    header: "QTY",
    cell: ({ row }) => {
      const quantity = row.original.item.quantity;
      return (
        <div className="text-center p-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-medium text-sm">
            x{quantity}
          </span>
        </div>
      );
    },
    size: 80, // Fixed width for quantity
  },
  {
    accessorKey: "order_status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.order_status;
      const obtainStatus = getFormalStatus(status);

      const statusClasses = {
        [OrderStatus.Pending]: "bg-yellow-100 text-yellow-800",
        [OrderStatus.Delivered]: "bg-green-100 text-green-800",
        default: "bg-blue-100 text-blue-800",
        rejected: "bg-red-100 text-red-800",
        failed: "bg-red-100 text-red-800",
      };

      const className =
        status.endsWith("rejected") || status.startsWith("fail")
          ? statusClasses.rejected
          : status.startsWith("return")
            ? statusClasses.default
            : statusClasses[status as unknown] || statusClasses.default;

      return (
        <div className="p-2 max-w-[120px]">
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium truncate ${className}`}
          >
            {obtainStatus}
          </span>
        </div>
      );
    },
    size: 120, // Fixed width for status
  },
  {
    accessorKey: "order_id.payment_status",
    header: "PAYMENT",
    cell: ({ row }) => {
      const status = row.original.order_id.payment_status;
      return (
        <div className="p-2 max-w-[100px]">
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium truncate ${
              status === "unpaid"
                ? "bg-gray-100 text-gray-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      );
    },
    size: 100, // Fixed width for payment
  },
  {
    accessorKey: "order_id.shipping_id.region",
    header: "REGION",
    cell: ({ row }) => {
      const delivery_region = row.original.order_id.shipping_id.region;
      return (
        <div className="p-2 max-w-[100px]">
          <span className="text-sm text-gray-700 truncate">
            {delivery_region}
          </span>
        </div>
      );
    },
    size: 100, // Fixed width for region
  },
  {
    accessorKey: "seller_id.store_name",
    header: "STORE",
    cell: ({ row }) => {
      const store_name = row.original.seller_id.store_name;
      return (
        <div className="p-2 max-w-[120px]">
          <span className="text-sm font-medium text-gray-900 truncate">
            {store_name}
          </span>
        </div>
      );
    },
    size: 120, // Fixed width for store
  },
  {
    accessorKey: "order_id.shipping_id.full_name",
    header: "RECEIVER",
    cell: ({ row }) => {
      const receiver_name = row.original.order_id.shipping_id.full_name;
      return (
        <div className="p-2 max-w-[120px]">
          <span className="text-sm text-gray-700 truncate">
            {receiver_name}
          </span>
        </div>
      );
    },
    size: 120, // Fixed width for receiver
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center p-2 w-[80px]">
          <ActionOrderMenu row={row} />
        </div>
      );
    },
    size: 80, // Fixed width for actions
  },
];

export const sellerReturnOrderColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "item.productVariant.product.name",
    header: "Product",
    cell: ({ row }) => {
      const name = row.original.item.productVariant.product.name;
      const color = row.original.item.productVariant.color;
      const size = row.original.item.productVariant.size ?? undefined;

      return (
        <div className="w-space-120 h-space-58 max-w-space-120 flex flex-col flex-wrap gap-space-8">
          <div className="w-space-60">
            <h1 className="truncate text-14 text-secondary-shade-dark font-medium">
              {name}
            </h1>
          </div>
          <div className="flex items-center flex-wrap gap-space-4">
            <p className="text-12 text-ternary-color">Color: {color}</p>
            {size && <p className="text-12 text-ternary-color">Size: {size}</p>}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "item.productVariant.images.url",
    header: "Image",
    cell: ({ row }) => {
      const imgUrl = row.original.item.productVariant.images.url;
      return (
        <div className="w-space-60 h-space-60">
          <img
            src={imgUrl}
            className="w-auto h-full object-contain rounded-8"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "item.quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.original.item.quantity;
      return (
        <p className="font-normal text-size-14 leading-space-20 space-y-space-14">
          x{quantity}
        </p>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.original.order_status;
      const obtainStatus = getFormalStatus(status);
      return (
        <Badge
          className={`font-medium text-14 leading-space-20 space-y-space-14 ${status == OrderStatus.Pending ? "bg-ternary-color text-text-color" : status == OrderStatus.Delivered ? "bg-secondary-shade-normal text-text-color" : status.startsWith("return") ? "bg-blue-500 text-text-color" : status.endsWith("rejected") ? "bg-error-color text-text-color" : "bg-amber-color text-text-color"}`}
        >
          {obtainStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order_id.payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.order_id.payment_status;
      return (
        <Badge
          className={`font-medium text-14 leading-space-20 space-y-space-14 ${status == "unpaid" ? "bg-ternary-color text-text-color" : "bg-green-color text-text-color"}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order_id.shipping_id.region",
    header: "Delivery Region",
    cell: ({ row }) => {
      const delivery_region = row.original.order_id.shipping_id.region;
      return (
        <p
          className={`font-normal text-size-14 leading-space-20 space-y-space-14`}
        >
          {delivery_region}
        </p>
      );
    },
  },
  {
    accessorKey: "return_reason",
    header: "Return Reason",
    cell: ({ row }) => {
      const reason = row.original.return_reason;
      return (
        <p
          className={`font-normal truncate text-size-14 leading-space-20 space-y-space-14 line-clamp-2`}
        >
          {reason}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionOrderMenu row={row} />;
    },
  },
];

// export const adminOrderColumns: ColumnDef<OrderSummaryDetail>[] = [
//   {
//     accessorKey: "orderInfo._id",
//     header: "Order Id",
//     cell: ({ row }) => {
//       const orderId = row.original.orderInfo._id

//       return (
//         <div className="w-space-120 h-space-58 max-w-space-120 flex flex-col flex-wrap gap-space-8">
//           <div className="w-space-90">
//             <h1 className="truncate text-14 text-secondary-shade-dark font-medium">
//               Order#{orderId}
//             </h1>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "orderInfo.shipping_id.full_name",
//     header: "Receiver Info",
//     cell: ({ row }) => {
//       const receiver = row.original.orderInfo.shipping_id.full_name
//       const address = row.original.orderInfo.shipping_id.address

//       return (
//         <div className="w-space-120 h-space-58 max-w-space-120 flex flex-col flex-wrap gap-space-8">
//           <div className="w-space-60">
//             <h1 className="truncate text-14 text-secondary-shade-dark font-medium">
//               {receiver}
//             </h1>
//           </div>
//           <div className="w-space-90">
//             <h1 className="line-clamp-2 truncate text-12 text-ternary-color font-medium">
//               {address}
//             </h1>
//           </div>
//         </div>

//       );
//     },
//   },
//   {
//     accessorKey: "orderCount.processing",
//     header: "In Process",
//     cell: ({ row }) => {
//       const processing = row.original.orderCount.processing

//       return (
//         <p className="font-normal text-amber-color text-size-14 leading-space-20 space-y-space-14">
//           {processing}
//         </p>
//       );
//     },
//   },
//   {
//     accessorKey: "orderCount.shipping",
//     header: "Ready To Ship",
//     cell: ({ row }) => {
//       const shipping = row.original.orderCount.shipping

//       return (
//         <p className="font-normal text-secondary-color text-size-14 leading-space-20 space-y-space-14">
//           {shipping}
//         </p>
//       );
//     },
//   },
//   {
//     accessorKey: "orderCount.delivered",
//     header: "Delivered",
//     cell: ({ row }) => {
//       const delivered = row.original.orderCount.delivered

//       return (
//         <p className="font-normal text-green-color text-size-14 leading-space-20 space-y-space-14">
//           {delivered}
//         </p>
//       );
//     },
//   },
//   {
//     accessorKey: "orderCount.faildelivery",
//     header: "Fail Delivery",
//     cell: ({ row }) => {
//       const faildelivered = row.original.orderCount.faildelivery

//       return (
//         <p className="font-normal text-error-color text-size-14 leading-space-20 space-y-space-14">
//           {faildelivered}
//         </p>
//       );
//     },
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       return <ActionOrderListMenu row={row}/>
//     },
//   },
// ]

export const adminOrderColumns: ColumnDef<OrderSummaryDetail>[] = [
  {
    accessorKey: "orderInfo._id",
    header: "ORDER ID",
    cell: ({ row }) => {
      const orderId = row.original.orderInfo._id;
      return (
        <div className="min-w-[120px] p-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 font-medium text-xs">
            #{orderId}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderInfo.shipping_id.full_name",
    header: "CUSTOMER",
    cell: ({ row }) => {
      const receiver = row.original.orderInfo.shipping_id.full_name;
      const address = row.original.orderInfo.shipping_id.address;
      return (
        <div className="min-w-[180px] p-2">
          <div className="font-medium text-gray-900">{receiver}</div>
          <div className="text-xs text-gray-500 line-clamp-2">{address}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "orderCount",
    header: "ORDER STATUS",
    cell: ({ row }) => {
      const { processing, shipping, delivered, faildelivery } =
        row.original.orderCount;

      return (
        <div className="min-w-[180px] p-2">
          <div className="flex items-center justify-between gap-2">
            {/* Processing */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{processing}</span>
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Processing</TooltipContent>
            </Tooltip>

            {/* Shipping */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{shipping}</span>
                  <Truck className="h-5 w-5 text-blue-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Shipping</TooltipContent>
            </Tooltip>

            {/* Delivered */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{delivered}</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Delivered</TooltipContent>
            </Tooltip>

            {/* Failed */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{faildelivery}</span>
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Failed</TooltipContent>
            </Tooltip>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center p-2">
          <ActionOrderListMenu row={row} />
        </div>
      );
    },
  },
];
