import type { CartItem } from "./cart.types"
import type { ShipmentInfo } from "./shipment.type"
import type { Seller } from "./user.types"

export interface OrderInfo{
    readonly _id: string,
    customer_id: string,
    shipping_id: ShipmentInfo,
    payment_method: string,
    payment_status: string,
    isCanceled: false,
    isCompleted: false,
    orderTotal: number,
    order_timeStamp: string
    createdAt: string,
}

export interface OrderItem{
    createdAt: string,
    item: CartItem,
    _id: string,
    order_id: OrderInfo,
    seller_id: Pick<Seller,'store_name'>,
    order_status: string,
    return_reason: string,
}

export interface Order{
    order: OrderInfo,
    orderItems: OrderItem[]
}

export enum OrderStatus{
    Canceled = "canceled",
    Pending="pending",
    ToPack="to_pack",
    ToArrangeShipment = "to_arrange_shipment",
    ToHandOver = "to_handover",
    Shipping = "shipping",
    Delivered = "delivered",
    FailedDelivery = "faildelivery",
    ReturnInitialized = "return-initialized",
    ReturnAccepted = "return-accepted",
    ReturnRejected = "return-rejected"
}

export interface OrderItemFilter{
    isCanceled?: boolean,
    isCompleted?: boolean,
    order_status?: string,
}

export interface OrderItemInfo extends Omit<Order, 'order'>{
    count: number
}

export interface OrderSummaryDetail {
    orderInfo: OrderInfo,
    orderCount: {
        shipping: number,
        delivered: number,
        faildelivery: number,
        processing: number
    }
}

export enum PaymentMethod{
    CARD = 'card',
    COD = "cash-on-delivery"
}

export enum PaymentStatus{
    UnPaid = "unpaid",
    Paid = "paid"
}