import { useCreateCheckoutSession } from "@/hooks/checkoutSession.hooks";
import type { CartInfo } from "@/types/cart.types";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const stripePromisme = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface StripeCheckoutButtonProps {
  shippingId: string;
  cart_info: CartInfo;
}

const StripeCheckoutButton = ({
  shippingId,
  cart_info
}: StripeCheckoutButtonProps) => {
  const { isPending, mutate: createCheckoutSession } = useCreateCheckoutSession();
  const handleClick = async()=>{
    createCheckoutSession({cart_info: cart_info, shipping_id: shippingId}, {
        onSuccess: async(data) =>{
            const stripe = await stripePromisme;
            const {error} = await stripe!.redirectToCheckout({
                sessionId: data.data.id
            })

            if(error){
                console.error('Stripe redirect erro: ', error);
            }
        },
        onError: (error) =>{
            console.error('Failed to create checkout session: ', error)
        }
    })
  }
  return (
    <Button
      onClick={handleClick}
      className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Pay now"
      )}
    </Button>
  )
};

export default StripeCheckoutButton;
