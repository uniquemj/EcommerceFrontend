import { createCheckoutSession } from "@/services/checkoutSession.api"
import type { CartInfo } from "@/types/cart.types"
import type { ErrorResponse, SuccessResponse } from "@/types/response.types"
import { useMutation } from "@tanstack/react-query"


export const useCreateCheckoutSession = () =>{
    return useMutation<SuccessResponse<{id: string}>, ErrorResponse, {cart_info: CartInfo, shipping_id: string}>({
        mutationFn: ({cart_info, shipping_id}) => createCheckoutSession(cart_info, shipping_id)
    })
}