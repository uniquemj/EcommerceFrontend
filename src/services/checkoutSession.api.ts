import type { CartInfo } from "@/types/cart.types";
import type { SuccessResponse } from "@/types/response.types";
import { api } from "@/utils/api";


export const createCheckoutSession = async(cart_info: CartInfo, shipping_id: string): Promise<SuccessResponse<{id: string}>> =>{
    const response = await api.post<SuccessResponse<{id: string}>>(`/payment/create-checkout-session`, { cart_info: cart_info, shipping_id})
    return response.data
}