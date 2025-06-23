import { cancelOrder, createOrder, customerOrderReturn, getAllOrderItems, getAllOrderList, getCompletedOrderStat, getCustomerOrderDetail, getCustomerOrderList, getOrderItemDetail, getOrderItemOfOrder, getOrderItemsForAdmin, getOrderListSummaryForAdmin, getSellerOrderItems, markOrderCompleted, updateAdminOrderStatus, updateOrderPaymentStatus, updateSellerOrderStatus, updateSellerReturnStatus } from "@/services/order.api"
import { type OrderItem, type Order,  type OrderItemFilter, type OrderInfo, type OrderItemInfo, type OrderSummaryDetail } from "@/types/order.types"
import type { OrderStatCount, PaginationField } from "@/types/pagination.types"
import type{ SuccessResponse, ErrorResponse } from "@/types/response.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"


// Customer

interface useGetCustomerOrderListArgs {
    pagination?: PaginationField,
    query?: OrderItemFilter
}
export const useGetCustomerOrderList = ({pagination, query}:useGetCustomerOrderListArgs) =>{
    return useQuery<SuccessResponse<Order[]>, ErrorResponse>({
        queryKey: ['order', 'customer', query, pagination],
        queryFn: ()=>getCustomerOrderList(pagination, query)
    })
}

export const useGetCustomerOrderDetail = (orderId: string) =>{
    return useQuery<SuccessResponse<Order>, ErrorResponse>({
        queryKey: ['order', 'customer', orderId],
        queryFn: ()=>getCustomerOrderDetail(orderId)
    })
}

export const useCreateOrder = () =>{
    const navigate = useNavigate()
    const query = useQueryClient()

    return useMutation<SuccessResponse<Order>,ErrorResponse, {shipping_id: string, payment_method: string, paymentIntentId?: string}>({
        mutationFn: ({shipping_id, payment_method, paymentIntentId}) => createOrder(shipping_id, payment_method, paymentIntentId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['order']})
            query.invalidateQueries({queryKey: ['cart']})
            navigate({
                to: '/'
            })
            toast.success("Order Placed.")
        },
        onError: (error)=>{
            toast.error("Order Failed : " + error.response.data.message)
        }
    })
}

export const useCancelOrder = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Order>, ErrorResponse, string>({
        mutationFn: (orderId: string) => cancelOrder(orderId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['order']})
            toast.success("Order Canceled.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useCustomerOrderReturn = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<OrderItem>, ErrorResponse, {orderItemId: string, return_reason: string}>({
        mutationFn: ({orderItemId, return_reason}) => customerOrderReturn(orderItemId, return_reason),
        onSuccess: () =>{
            query.invalidateQueries({queryKey:['order']})
            toast.success("Order Return Initialized.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}


// Seller
export const useGetSellerOrderItems = ({orderFilter, pagination}:{orderFilter?:string, pagination?:PaginationField}) =>{
    return useQuery<SuccessResponse<OrderItem[]>, ErrorResponse>({
        queryKey: ['orderItems','seller', orderFilter, pagination],
        queryFn: ()=> getSellerOrderItems(orderFilter, pagination)
    })
}

export const useGetOrderItemDetail = (orderId: string) => {
    return useQuery<SuccessResponse<OrderItem>, ErrorResponse>({
        queryKey: ['orderItems','seller', orderId],
        queryFn: ()=> getOrderItemDetail(orderId)
    })
}

export const useUpdateSellerOrderStatus = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<OrderItem>, ErrorResponse, {orderItemId: string, order_status: string}>({
        mutationFn: ({orderItemId, order_status})=>updateSellerOrderStatus(orderItemId, order_status),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['orderItems']})
            toast.success("Order Status Updated.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateSellerReturnStatus = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<OrderItem>, ErrorResponse, {orderItemId: string, order_status: string}>({
        mutationFn: ({orderItemId, order_status}) => updateSellerReturnStatus(orderItemId, order_status),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['orderItems']})
            query.invalidateQueries({queryKey: ['orders']})
        } 
    })
}

export const useGetCompletedOrderStat = () =>{
    return useQuery<SuccessResponse<OrderStatCount[]>, ErrorResponse>({
        queryKey: ['orders', 'completed','count'],
        queryFn: ()=>getCompletedOrderStat()
    })
}

//Admin
export const useGetAllOrderList = (query?: OrderItemFilter, pagination?: PaginationField) =>{
    return useQuery<SuccessResponse<OrderInfo[]>, ErrorResponse>({
        queryKey: ['orders', 'admins', query, pagination],
        queryFn: ()=> getAllOrderList(pagination, query)
    })
}

export const useGetOrderItemofOrder = (orderId: string) =>{
    return useQuery<SuccessResponse<OrderItemInfo>, ErrorResponse>({
        queryKey: ['orders','admins','items',orderId],
        queryFn: () => getOrderItemOfOrder(orderId)
    })
}

export const useGetAllOrderItems = ({query ,pagination}: {query?: OrderItemFilter, pagination?: PaginationField}) =>{
    return useQuery<SuccessResponse<OrderItemInfo>,ErrorResponse>({
        queryKey: ['orderItems', 'all','admins',query, pagination],
        queryFn: () => getAllOrderItems(pagination, query)
    })
}

export const useUpdateAdminOrderStatus = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<OrderItem>, ErrorResponse, {orderItemId: string, order_status: string}>({
        mutationFn: ({orderItemId, order_status}) => updateAdminOrderStatus(orderItemId, order_status),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['orders']})
            query.invalidateQueries({queryKey: ['orderItems']})
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useMarkOrderCompleted = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<OrderInfo>, ErrorResponse, string>({
        mutationFn: (orderId: string) => markOrderCompleted(orderId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['orders']})
            query.invalidateQueries({queryKey: ['orderItems']})
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetOrderItemsForAdmin = (pagination?: PaginationField) =>{
    return useQuery<SuccessResponse<OrderItem[]>>({
        queryKey: ['orders','admin', 'items',pagination],
        queryFn: ()=>getOrderItemsForAdmin(pagination)
    })
}

export const useGetOrderListSummaryForAdmin = (pagination?: PaginationField) => {
    return useQuery<SuccessResponse<OrderSummaryDetail[]>>({
        queryKey: ['orders','admin','summary'],
        queryFn: ()=> getOrderListSummaryForAdmin(pagination)
    })
}

export const useUpdatePaymentStatus = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<OrderInfo>, ErrorResponse, string>({
        mutationFn: (order_id) => updateOrderPaymentStatus(order_id),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['orders']})
            query.invalidateQueries({queryKey: ['orderItems']})
            toast.success("Payment Status Updated.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}