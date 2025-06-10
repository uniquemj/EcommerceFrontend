import { addToCart, getCart, getCartTotal, removeItemFromCart, updateCart } from "@/services/cart.api"
import type { CartInfo, CartTotal } from "@/types/cart.types"
import type { ErrorResponse, SuccessResponse } from "@/types/response.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useGetCart = () =>{
    return useQuery<SuccessResponse<CartInfo>, ErrorResponse>({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })
}

export const useAddToCart = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<CartInfo>, ErrorResponse, {itemId: string, quantity: number}>({
        mutationFn: ({itemId, quantity})=>addToCart(itemId, quantity),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['cart']})
            toast.success("Item Added to Cart.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useRemoveItemFromCart = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<CartInfo>, ErrorResponse, string>({
        mutationFn: (itemId: string) => removeItemFromCart(itemId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['cart']})
            toast.success("Cart Item Removed.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }

    })
}

export const useUpdateCart = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<CartInfo>, ErrorResponse, {itemId: string,quantity: number}>({
        mutationFn: ({itemId,quantity}) => updateCart(itemId, quantity),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['cart']})
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetCartTotal = () =>{
    return useQuery<SuccessResponse<CartTotal>, ErrorResponse>({
        queryKey: ['cart','total'],
        queryFn: ()=>getCartTotal()
    })
}