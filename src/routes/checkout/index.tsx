import CartCard from "@/components/Cart/CartCard";
import StripeCheckoutButton from "@/components/Checkout/StripeCheckoutButton";
import Container from "@/components/Layout/Container/Container";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import AddressSelectionSheet from "@/components/Shipment/AddressSelectionSheet";
import ShipmentDisplay from "@/components/Shipment/ShipmentDisplay";
import ShipmentForm from "@/components/Shipment/ShipmentForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetCart, useGetCartTotal } from "@/hooks/cart.hooks";
import { useCreateOrder } from "@/hooks/order.hooks";
import { useCreateAddress, useGetActiveAddress } from "@/hooks/shipment.hooks";
import type { CartInfo } from "@/types/cart.types";
import { PaymentMethod } from "@/types/order.types";
import type { ShipmentInfo } from "@/types/shipment.type";
import type { AddressType } from "@/validations/shipment.validate";

import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Loader2, Wallet } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const { isPending, data: activeAddress } = useGetActiveAddress();
  const { data: cartItems } = useGetCart();

  const inStockItems = cartItems?.data?.items.filter(
    (item) => item.productVariant.stock > 0
  );

  const { data: cartTotal } = useGetCartTotal();

  const { isPending: isCreating, mutate } = useCreateAddress();
  const { isPending: isOrdering, mutate: createOrder } = useCreateOrder();

  if (isPending) return <LoadingScreen description="Loading checkout . . ." />;

  const handleSubmit = (value: AddressType) => {
    mutate(value);
  };

  const handleOrder = () => {
    if (!activeAddress?.data?._id) return;

    if (paymentMethod === PaymentMethod.COD) {
      createOrder({
        shipping_id: activeAddress?.data?._id,
        payment_method: PaymentMethod.COD,
      });
    }
    // makePayment({
    //   _id: cartItems?.data._id as string,
    //   customer: cartItems?.data.customer as string,
    //   items: inStockItems as CartItem[],
    // });
    // createOrder(activeAddress?.data?._id as string);
  };
  return (
    <Container>
      <div className="grid grid-cols-1 min-940:grid-cols-2">
        {/* Shipment Form and Order Summary */}
        <div className="flex flex-col gap-space-24">
          {/* ShipmentForm */}
          <Card className="px-space-24 py-space-24 rounded-none">
            <div className="flex justify-between">
              <h1 className="font-semibold text-18 text-secondary-shade-dark">
                Shipping Address
              </h1>
              {activeAddress?.data && (
                <div>
                  <Sheet>
                    <SheetTrigger className="text-secondary-color">
                      Edit
                    </SheetTrigger>
                    <SheetContent>
                      <AddressSelectionSheet />
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
            <Separator />
            {!activeAddress?.data ? (
              <ShipmentForm onSuccess={handleSubmit} isLoading={isCreating} />
            ) : (
              <ShipmentDisplay
                shipmentInfo={activeAddress?.data as ShipmentInfo}
              />
            )}
          </Card>
          <Card className="rounded-none px-space-24 py-space-24">
            <div>
              <h1 className="font-semibold text-secondary-shade-dark text-18">
                Select Payment Method
              </h1>
            </div>
            <div className="flex gap-space-10 flex-wrap">
              <Button
                className={`bg-transparent border-1 border-secondary-color text-secondary-color hover:text-secondary-color hover:bg-secondary-shade-lightest hover:cursor-pointer ${paymentMethod == PaymentMethod.COD && `bg-secondary-shade-lightest`}`}
                onClick={() => setPaymentMethod(PaymentMethod.COD)}
              >
                <Wallet />
                <span className="text-12 font-normal">Cash on Delivery</span>
              </Button>
              <Button
                className={`bg-transparent border-1 border-secondary-color text-secondary-color hover:text-secondary-color hover:bg-secondary-shade-lightest hover:cursor-pointer ${paymentMethod == PaymentMethod.CARD && `bg-secondary-shade-lightest`}`}
                onClick={() => setPaymentMethod(PaymentMethod.CARD)}
              >
                <CreditCard />
                <span className="text-12 font-normal">Credit/Debit Card</span>
              </Button>
            </div>
          </Card>
          {/* Order Summary */}
          <Card className="rounded-none px-space-24 py-space-24">
            <h1 className="font-semibold text-18 text-secondary-shade-dark">
              Summary
            </h1>
            <Separator />
            <div>
              {inStockItems?.map((item) => (
                <CartCard
                  key={item.productVariant._id}
                  productVariant={item.productVariant}
                  quantity={item.quantity}
                  status={"in-stock"}
                  variant="order"
                />
              ))}
            </div>
          </Card>
        </div>
        {/* Order total Summary */}
        <div className="flex justify-end">
          <div className=" max-sm:w-full min-sm:w-3/5">
            <div className="flex flex-col gap-space-34 border-1 px-space-34 py-space-24">
              <div className="">
                <h1 className="text-18 text-secondary-shade-dark font-bold">
                  Order Summary
                </h1>
              </div>
              <div className="flex flex-col gap-space-34 h-full">
                <div className="flex flex-col gap-space-20">
                  <div className="flex justify-between items-center">
                    <h1 className="text-16 font-medium">SubTotal:</h1>
                    <h2 className="text-16 font-medium text-secondary-color">
                      Rs. {cartTotal?.data.subTotal}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-16 text-ternary-color font-medium">
                      Delivery Fee:
                    </h1>
                    <h2 className="text-16 font-medium text-secondary-color">
                      Rs. {cartTotal?.data.delivery_fee}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-16 font-medium">Total:</h1>
                    <h2 className="text-16 font-medium text-secondary-color">
                      Rs. {cartTotal?.data.total}
                    </h2>
                  </div>
                </div>
                <div className="w-full">
                  {paymentMethod == PaymentMethod.CARD && (
                    <StripeCheckoutButton
                      cart_info={cartItems?.data as CartInfo}
                      shippingId={activeAddress?.data?._id as string}
                    />
                  )}
                  {paymentMethod == PaymentMethod.COD && (
                    <Button
                      className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer"
                      onClick={handleOrder}
                    >
                      {isOrdering ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Confirm Order"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
