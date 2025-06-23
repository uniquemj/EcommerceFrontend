import type { CartInfo } from '@/types/cart.types';
import {loadStripe} from '@stripe/stripe-js';


export const makePayment = async(cartInfo: CartInfo) =>{
    console.log("hello")
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    const body = {
        cart_info: cartInfo
    }

    const headers = {
        "Content-Type":"application/json"
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/payment/create-checkout-session`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })

    const session = await response.json()
    console.log(session)
    const result = await stripe!.redirectToCheckout({
        sessionId: session.data.id
    })

    if(result?.error){
        console.log(result.error)
    }
}