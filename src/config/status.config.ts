import { OrderStatus } from "@/types/order.types";


export const status_style = {
    pending : {
        className: "bg-ternary-color text-text-color"
    },
    delivered: {
        className: "bg-green-color text-text-color"
    },
    return: {
        className: "bg-blue-500 text-text-color" 
    },
    rejected: {
        className: "bg-error-color text-text-color"
    },
    other: {
        className: "bg-amber-color text-text-color"
    }
}

export type statusSylteType = keyof typeof status_style



export const SellerOrderStatus = {
    pending: {
        include: [
            'to_pack',
            'to_arrange_shipment',
            'to_handover',
            'shipping'
        ]
    },
    to_pack: {
        include: [
            'to_arrange_shipment',
            'to_handover',
            'shipping'
        ]
    },
    to_arrange_shipment: {
        include: [
            'to_handover',
            'shipping'
        ]
    },
    to_handover: {
        include: [
            'shipping'
        ]
    },
    shipping: {
        include: [

        ]
    },
    delivered:{
        include:[]
    },
    faildelivery: {
        include: [
            'pending',
            'to_pack',
            'to_arrange_shipment',
            'to_handover',
            'shipping'
        ]
    },
    'return-initialized':{
        include: [
            'return-accepted',
            'return-rejected'
        ]
    }
}

export const AdminOrderStatus = {
     shipping: {
        include: [
            'delivered',
            'faildelivery'
        ]
    },
    delivered:{
        include:[]
    },
    faildelivery: {
        include: [
        ]
    },
}

export type adminOrderStatus = keyof typeof AdminOrderStatus
export type sellerOrderStatus = keyof typeof SellerOrderStatus