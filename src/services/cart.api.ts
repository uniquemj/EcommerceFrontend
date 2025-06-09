import type { CartInfo } from "@/types/cart.types";
import type { SuccessResponse } from "@/types/response.types";
import { api } from "@/utils/api";


export const getCart = async():Promise<SuccessResponse<CartInfo>> =>{
    const response = await api.get<SuccessResponse<CartInfo>>(`/carts`)
    return response.data
}

export const addToCart = async(itemId: string, quantity: number): Promise<SuccessResponse<CartInfo>>=>{
    const response = await api.post<SuccessResponse<CartInfo>>(`/carts/add/${itemId}`, {quantity})
    return response.data
}

export const removeItemFromCart = async(itemId: string): Promise<SuccessResponse<CartInfo>> =>{
    const response = await api.post<SuccessResponse<CartInfo>>(`/carts/remove/${itemId}`)
    return response.data
}

export const updateCart = async(itemId: string, quantity: number):Promise<SuccessResponse<CartInfo>> =>{
    const response = await api.post<SuccessResponse<CartInfo>>(`/carts/quantity/${itemId}`,{quantity: quantity})
    return response.data
}

export const getCartTotal = async():Promise<SuccessResponse<number>> =>{
    const response = await api.get<SuccessResponse<number>>('/carts/total')
    return response.data
}