import CartCard from "@/components/Cart/CartCard";
import EmptyCart from "@/components/Cart/EmptyCart";
import Container from "@/components/Layout/Container/Container";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { Button } from "@/components/ui/button";
import { useGetCart, useGetCartTotal } from "@/hooks/cart.hooks";

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, data: cartItem } = useGetCart();

  const inStockItems = cartItem?.data?.items.filter(
    (item) => item.productVariant.stock > 0
  );


  const outOfStockItems = cartItem?.data?.items.filter(
    (item) => item.productVariant.stock < 1
  );

  const { data: cartTotal } = useGetCartTotal();

  if (isPending) return <LoadingScreen description="Loading . . ." />;
  return (
    // <Container>
    //   {cartItem?.data?.items?.length ? (
    //     <div className=" grid  grid-cols-2 max-940:grid-cols-1 max-sm:gap-space-34 gap-space-24 ">
    //       {/* Shopping Cart & out of stock items*/}
    //       <div className="flex flex-col justify-between w-full max-h-dvh">
    //         <div className="h-1/2">
    //           <div className="py-space-12">
    //             <h1 className="font-bold text-24 text-secondary-shade-dark">
    //               Shopping Cart
    //             </h1>
    //           </div>
    //           <div className=" px-space-24  max-h-space-460 overflow-y-auto">
    //             {inStockItems?.map((item) => (
    //               <CartCard
    //                 key={item._id}
    //                 productVariant={item.productVariant}
    //                 quantity={item.quantity}
    //                 status={"in-stock"}
    //                 variant="cart"
    //               />
    //             ))}
    //           </div>
    //         </div>
    //         {outOfStockItems?.length ? (
    //           <div className="h-1/2">
    //             <div className="py-space-12">
    //               <h1 className="font-bold text-24 text-ternary-color">
    //                 Unavailable Items
    //               </h1>
    //             </div>
    //             <div className=" px-space-24 py-space-24 max-h-space-460 overflow-y-auto">
    //               {outOfStockItems?.map((item) => (
    //                 <CartCard
    //                   key={item._id}
    //                   productVariant={item.productVariant}
    //                   quantity={item.quantity}
    //                   status={"out-of-stock"}
    //                   variant="cart"
    //                 />
    //               ))}
    //             </div>
    //           </div>
    //         ) : null}
    //       </div>

    //       {/* Order Summary */}
    //       <div className="flex min-sm:justify-center min-940:justify-end">
    //         <div className=" max-sm:w-full min-sm:w-3/5">
    //           <div className="flex flex-col gap-space-34 border-1 px-space-34 py-space-24">
    //             <div className="">
    //               <h1 className="text-18 text-secondary-shade-dark font-bold">
    //                 Order Summary
    //               </h1>
    //             </div>
    //             <div className="flex flex-col gap-space-34 h-full">
    //               <div className="flex flex-col gap-space-20">
    //                 <div className="flex justify-between items-center">
    //                   <h1 className="text-16 font-medium">SubTotal:</h1>
    //                   <h2 className="text-16 font-medium text-secondary-color">
    //                     Rs. {cartTotal?.data.subTotal}
    //                   </h2>
    //                 </div>
    //                 <div className="flex justify-between items-center">
    //                   <h1 className="text-16 text-ternary-color font-medium">
    //                     Delivery Fee:
    //                   </h1>
    //                   <h2 className="text-16 font-medium text-secondary-color">
    //                     Rs. {cartTotal?.data.delivery_fee}
    //                   </h2>
    //                 </div>
    //                 <div className="flex justify-between items-center">
    //                   <h1 className="text-16 font-medium">Total:</h1>
    //                   <h2 className="text-16 font-medium text-secondary-color">
    //                     Rs. {cartTotal?.data.total}
    //                   </h2>
    //                 </div>
    //               </div>
    //               <div className="w-full">
    //                 {inStockItems?.length ? (
    //                   <Link to="/checkout">
    //                     <Button className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer">
    //                       Proceed to Checkout
    //                     </Button>
    //                   </Link>
    //                 ) : (
    //                   <Button
    //                     disabled
    //                     className="py-space-24 px-space-24 w-full rounded-none bg-secondary-color text-text-color border-1 hover:border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer"
    //                   >
    //                     No Available Items
    //                   </Button>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <EmptyCart />
    //   )}
    // </Container>

    <Container className="">
  {cartItem?.data?.items?.length ? (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Shopping Cart Items */}
      <div className="lg:col-span-2 space-y-8">
        {/* In Stock Items */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 min-h-space-282">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Shopping Cart ({inStockItems?.length || 0})
            </h2>
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              All items in stock
            </span>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {inStockItems?.map((item) => (
              <CartCard
                key={item._id}
                productVariant={item.productVariant}
                quantity={item.quantity}
                status="in-stock"
                variant="cart"
              />
            ))}
          </div>
        </div>

        {/* Out of Stock Items */}
        {outOfStockItems?.length as number > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Unavailable Items ({outOfStockItems?.length || 0})
              </h2>
              <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Out of stock
              </span>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {outOfStockItems?.map((item) => (
                <CartCard
                  key={item._id}
                  productVariant={item.productVariant}
                  quantity={item.quantity}
                  status="out-of-stock"
                  variant="cart"
                />
              ))}
            </div>
          </div>
        ):null}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">Rs. {cartTotal?.data.subTotal}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-medium">Rs. {cartTotal?.data.delivery_fee}</span>
            </div>
            
            <div className="border-t border-gray-200 my-3"></div>
            
            <div className="flex justify-between">
              <span className="text-gray-900 font-bold">Total:</span>
              <span className="text-lg font-bold text-secondary-600">
                Rs. {cartTotal?.data.total}
              </span>
            </div>
          </div>

          {inStockItems?.length as number > 0 ? (
            <Link to="/checkout" className="block">
              <Button className="w-full py-3 border-1 border-secondary-color bg-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer text-white font-medium transition-colors">
                Proceed to Checkout
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="w-full py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              No Available Items
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  )}
</Container>
  );
}
