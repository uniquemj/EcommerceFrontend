import CartCard from "@/components/Cart/CartCard";
import Container from "@/components/Layout/Container/Container";
import { Button } from "@/components/ui/button";
import { useGetCart, useGetCartTotal } from "@/hooks/cart.hooks";

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: cartItem } = useGetCart();

  const inStockItems = cartItem?.data.items.filter(
    (item) => item.productVariant.stock > 0
  );

  const outOfStockItems = cartItem?.data.items.filter(
    (item) => item.productVariant.stock < 1
  );

  const { data: cartTotal } = useGetCartTotal();

  return (
    <Container>
      <div className=" grid  grid-cols-2 max-940:grid-cols-1 gap-space-24 ">
        {/* Shopping Cart & out of stock items*/}
        <div className="flex flex-col  w-full">
          <div className="">
            <div className="py-space-12">
              <h1 className="font-bold text-24 text-secondary-shade-dark">
                Shopping Cart
              </h1>
            </div>
            <div className=" px-space-24  max-h-space-460 overflow-y-auto">
              {inStockItems?.map((item) => (
                <CartCard
                  key={item._id}
                  productVariant={item.productVariant}
                  quantity={item.quantity}
                  status={"in-stock"}
                  variant="cart"
                />
              ))}
            </div>
          </div>
          {outOfStockItems?.length ? (
            <div className="">
              <div className="py-space-12">
                <h1 className="font-bold text-24 text-ternary-color">
                  Unavailable Items
                </h1>
              </div>
              <div className=" px-space-24 py-space-24 max-h-space-460 overflow-y-auto">
                {outOfStockItems?.map((item) => (
                  <CartCard
                    key={item._id}
                    productVariant={item.productVariant}
                    quantity={item.quantity}
                    status={"out-of-stock"}
                    variant="cart"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Order Summary */}
        <div className="flex min-sm:justify-center min-940:justify-end">
          <div className="flex flex-col gap-space-34 max-sm:w-full min-sm:w-3/5  border-1 px-space-34 py-space-24">
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
                  Proceed to Checkout
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
