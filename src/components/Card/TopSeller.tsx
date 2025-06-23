import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ProductInfo } from "@/types/product.types";
import { OrderStatus, type OrderItem } from "@/types/order.types";
import { getFormalStatus } from "@/utils/helper";
import { CheckCircle, Clock, Info, Truck, XCircle } from "lucide-react";

interface TopProductsProps {
  orderItems: OrderItem[];
}

export function TopProductsCard({ orderItems }: TopProductsProps) {
  console.log(orderItems);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Received Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orderItems?.map((order) => {
            const status = order.order_status;
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
              <div key={order._id} className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage
                    src={order.item.productVariant.images.url}
                    alt={order.item.productVariant.product.name}
                  />
                  <AvatarFallback>
                    {order.item.productVariant.product.name
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {order.item.productVariant.product.name} (
                    {order.item.productVariant.color})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.item.quantity} × Rs.{" "}
                    {order.item.productVariant.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
                  >
                    {config.icon}
                    {formalStatus}
                  </span>
                  {order.order_status === "canceled" && (
                    <p className="text-xs text-muted-foreground">
                      Canceled on{" "}
                      {new Date(order.order_id.cancelAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
