import {type OrderSummaryDetail, type Order, type OrderInfo, type OrderItem, type OrderItemFilter, type OrderItemInfo } from "@/types/order.types";
import type { OrderStatCount, PaginationField } from "@/types/pagination.types";
import type { SuccessResponse } from "@/types/response.types";
import { api } from "@/utils/api";


// Customer
export const createOrder = async(shipping_id: string, payment_method: string, paymentIntentId?: string):Promise<SuccessResponse<Order>> =>{
    const stripeData = {payment_intent_id: paymentIntentId}
    const response = await api.post<SuccessResponse<Order>>(`/orders/`, {shipping_id, payment_method, ...stripeData})
    return response.data
} 

export const getCustomerOrderList = async(pagination?: PaginationField, query?: OrderItemFilter):Promise<SuccessResponse<Order[]>> => {
    const response = await api.get<SuccessResponse<Order[]>>(`/orders/customer`, {params: {...pagination, ...query}})
    return response.data
}

export const getCustomerOrderDetail = async(orderId: string):Promise<SuccessResponse<Order>> => {
    const response = await api.get<SuccessResponse<Order>>(`/orders/customer/${orderId}`)
    return response.data
}

export const cancelOrder = async(orderId: string):Promise<SuccessResponse<Order>> =>{
    const response = await api.put<SuccessResponse<Order>>(`/orders/cancel/${orderId}`)
    return response.data
}

export const customerOrderReturn = async(orderItemId: string, return_reason:string ): Promise<SuccessResponse<OrderItem>> =>{
    const response = await api.put<SuccessResponse<OrderItem>>(`/orders/return/init/${orderItemId}`, {return_reason})
    return response.data
}


//Seller
export const getSellerOrderItems = async(orderFilter?:string, pagination?: PaginationField):Promise<SuccessResponse<OrderItem[]>> =>{
    const response = await api.get<SuccessResponse<OrderItem[]>>(`/orders/seller`, {params: {order_status: orderFilter, ...pagination}})
    return response.data
}

export const getOrderItemDetail = async(orderItemId: string):Promise<SuccessResponse<OrderItem>> =>{
    const response = await api.get<SuccessResponse<OrderItem>>(`/orders/detail/items/${orderItemId}`)
    return response.data
} 

export const updateSellerOrderStatus = async(orderItemId: string, order_status: string):Promise<SuccessResponse<OrderItem>> =>{
    const response = await api.put<SuccessResponse<OrderItem>>(`/orders/seller/status/${orderItemId}`, {order_status})
    return response.data
}

export const updateSellerReturnStatus = async(orderItemId: string, order_status: string):Promise<SuccessResponse<OrderItem>> =>{
    const response = await api.put<SuccessResponse<OrderItem>>(`/orders/return/update/${orderItemId}`, {order_status})
    return response.data
}

export const getCompletedOrderStat = async():Promise<SuccessResponse<OrderStatCount[]>>=>{
    const response = await api.get<SuccessResponse<OrderStatCount[]>>(`/orders/items/count`)
    return response.data
}


//Admin
export const getAllOrderList = async(pagination?: PaginationField, query?:OrderItemFilter ): Promise<SuccessResponse<OrderInfo[]>> => {
    const response = await api.get<SuccessResponse<OrderInfo[]>>(`/orders`, {params: {...query , ...pagination} })
    return response.data
}

export const getOrderItemOfOrder = async(orderId: string): Promise<SuccessResponse<OrderItemInfo>> => {
    const response = await api.get<SuccessResponse<OrderItemInfo>>(`/orders/${orderId}`)
    return response.data
}

export const getAllOrderItems = async(pagination?:PaginationField, query?:OrderItemFilter): Promise<SuccessResponse<OrderItemInfo>> => {
    console.log({...pagination, ...query})
    const response = await api.get<SuccessResponse<OrderItemInfo>>(`/orders/items`, {params: {...pagination, ...query}})
    return response.data
}

export const updateAdminOrderStatus = async(orderItemId: string, order_status: string): Promise<SuccessResponse<OrderItem>> => {
    const response = await api.put<SuccessResponse<OrderItem>>(`/orders/admin/status/${orderItemId}`, {order_status})
    return response.data
}

export const markOrderCompleted = async(orderId: string): Promise<SuccessResponse<OrderInfo>> => {
    const response = await api.put<SuccessResponse<OrderInfo>>(`/orders/complete/${orderId}`)
    return response.data
}

export const getOrderItemsForAdmin = async(pagination?: PaginationField):Promise<SuccessResponse<OrderItem[]>> =>{
    const response =await api.get<SuccessResponse<OrderItem[]>>(`/orders/admin/items`,{params: {...pagination}})
    return response.data
}

export const getOrderListSummaryForAdmin = async(pagination?: PaginationField): Promise<SuccessResponse<OrderSummaryDetail[]>> => {
    const response = await api.get<SuccessResponse<OrderSummaryDetail[]>>(`/orders/summary`, {params: {...pagination}})
    return response.data
}

export const updateOrderPaymentStatus = async(order_id: string): Promise<SuccessResponse<OrderInfo>> => {
    const response = await api.put<SuccessResponse<OrderInfo>>(`/orders/update/payment`, {order_id: order_id})
    return response.data
}