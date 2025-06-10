import CartCard from "@/components/Cart/CartCard";
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
import { useCreateAddress, useGetActiveAddress} from "@/hooks/shipment.hooks";
import type { ShipmentInfo } from "@/types/shipment.type";
import type { AddressType } from "@/validations/shipment.validate";

import { createFileRoute, Link } from "@tanstack/react-router";


export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
 
  const {isPending, data: activeAddress} = useGetActiveAddress()
  const {data: cartItems} = useGetCart()
  const {data:cartTotal} = useGetCartTotal()
  
  const {isPending:isCreating, mutate} = useCreateAddress()
  
  if(isPending) return <LoadingScreen description="Loading checkout . . ."/>
  const handleSubmit = (value: AddressType) =>{
    mutate(value)
  }
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
                    <SheetTrigger className="text-secondary-color">Edit</SheetTrigger>
                    <SheetContent>
                      <AddressSelectionSheet/>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
            <Separator />
            {!activeAddress?.data ? <ShipmentForm onSuccess={handleSubmit} isLoading={isCreating} /> : <ShipmentDisplay shipmentInfo={activeAddress?.data as ShipmentInfo} />}
          </Card>
          {/* Order Summary */}
          <Card className="rounded-none px-space-24 py-space-24">
            <h1 className="font-semibold text-18 text-secondary-shade-dark">
              Summary
            </h1>
            <Separator/>
            <div>
              {
                cartItems?.data.items.map((item)=>(
                  <CartCard key={item.productVariant._id} productVariant={item.productVariant} quantity={item.quantity} status={"in-stock"} variant="order"/>
                ))
              }
            </div>
          </Card>
        </div>
        {/* Order total Summary */}
        <div className="flex justify-end">
          <div className="flex flex-col max-h-space-320 gap-space-34 max-sm:w-full min-sm:w-3/5  border-1 px-space-34 py-space-24">
            <div className="">
              <h1 className="text-18 text-secondary-shade-dark font-bold">
                Order Summary
              </h1>
            </div>
            <div className="flex flex-col gap-space-34 h-full">
              <div className="flex flex-col gap-space-20">
                <div className="flex justify-between items-center">
                  <h1 className="text-16 font-medium">SubTotal:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {cartTotal?.data.subTotal}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-16 text-ternary-color font-medium">Delivery Fee:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {cartTotal?.data.delivery_fee}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-16 font-medium">Total:</h1>
                  <h2 className="text-16 font-medium text-secondary-color">Rs. {cartTotal?.data.total}</h2>
                </div>
              </div>
              <div className="w-full">
                <Link to='/checkout'>
                <Button className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer">
                  Proceed to Order
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
