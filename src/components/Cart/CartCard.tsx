import type { ProductVariant } from "@/types/cart.types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useRemoveItemFromCart, useUpdateCart } from "@/hooks/cart.hooks";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CartCardProps {
  productVariant: ProductVariant;
  quantity: number;
  status: string;
  variant: "cart" | "order";
}

const CartCard = ({
  productVariant,
  quantity,
  status,
  variant,
}: CartCardProps) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  const { isPending, mutate } = useRemoveItemFromCart();

  const { mutate: updateQuantity } = useUpdateCart();

  const handleIncrease = () => {
    setNewQuantity((prev) => {
      if (prev == productVariant.stock) return prev;
      const updated = prev + 1;
      updateQuantity({ itemId: productVariant._id, quantity: updated });
      return updated;
    });
  };

  const handleDecrease = () => {
    setNewQuantity((prev) => {
      if (prev == 0) return prev;
      const updated = prev - 1;
      updateQuantity({ itemId: productVariant._id, quantity: updated });
      return updated;
    });
  };
  const handleDelete = () => {
    mutate(productVariant._id);
  };

  return (
    // <Table className="table-fixed w-full">
    //   <TableBody>
    //     <TableRow>
    //       {variant === "cart" && (
    //         <>
    //           <TableCell
    //             className={`${status === "out-of-stock" && `relative`} w-space-120 min-w-space-120 h-space-58 min-940:py-space-24 min-940:px-space-24 gap-space-12 border-b-1`}
    //           >
    //             {status === "out-of-stock" && (
    //               <div className="absolute w-4/5 h-full">
    //                 <p className="text-ternary-color text-center">
    //                   Not-available
    //                 </p>
    //               </div>
    //             )}
    //             <div className="w-space-60 ">
    //               <img
    //                 src={productVariant.images.url}
    //                 className="w-full h-full object-contain rounded-8"
    //               />
    //             </div>
    //           </TableCell>
    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
    //             <div className="w-space-60 h-space-60">
    //               <p className="truncate line-clamp-1 font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
    //                 {productVariant.product.name}
    //               </p>
    //               <div className="flex items-center flex-wrap gap-space-2">
    //                 <p className="text-12 text-ternary-color">
    //                   Color: {productVariant.color}
    //                 </p>
    //                 {productVariant.size && (
    //                   <p className="text-12 text-ternary-color">
    //                     Size: {productVariant.size}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </TableCell>

    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
    //             <div className="w-space-60 h-space-60">
    //               <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
    //                 Rs.{productVariant.price}
    //               </p>
    //               <span className="text-12">Price</span>
    //             </div>
    //           </TableCell>
    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
    //             <div className="flex items-center gap-space-10">
    //               <button
    //                 className=" hover:cursor-pointer"
    //                 onClick={handleDecrease}
    //                 disabled = {status === 'out-of-stock'}
    //               >
    //                 <Minus size={14} className="text-ternary-color" />
    //               </button>
    //               <Input
    //                 type="number"
    //                 value={newQuantity}
    //                 className="p-0 text-center border-secondary-shade-normal focus-visible:ring-0 focus:outline-none"
    //                 readOnly
    //               />
    //               <button
    //                 className="w-space-10 h-space-10 hover:cursor-pointer"
    //                 onClick={handleIncrease}
    //                 disabled = {status ==='out-of-stock'}
    //               >
    //                 <Plus size={14} className="text-ternary-color" />
    //               </button>
    //             </div>
    //           </TableCell>
    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
    //             <div className="flex gap-space-18">
    //               {isPending ? (
    //                 <Loader2 className="animate-spin w-4 h-4 mr-2" />
    //               ) : (
    //                 <Trash2
    //                   className="text-error-color hover:cursor-pointer"
    //                   size={16}
    //                   onClick={handleDelete}
    //                 />
    //               )}
    //             </div>
    //           </TableCell>
    //         </>
    //       )}
    //       {variant === "order" && (
    //         <>
    //           <TableCell
    //             className={`w-space-90  min-w-space-90 max-w-space-90 h-space-60 gap-space-12 border-b-1`}
    //           >
    //             <div className="h-space-60 w-full">
    //               <img
    //                 src={productVariant.images.url}
    //                 className="w-full h-full object-coverrounded-8"
    //               />
    //             </div>
    //           </TableCell>
    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
    //             <div className="w-space-60 h-space-60">
    //               <p className="truncate line-clamp-1 font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
    //                 {productVariant.product.name}
    //               </p>
    //               <div className="flex items-center flex-wrap gap-space-2">
    //                 <p className="text-12 text-ternary-color">
    //                   Color: {productVariant.color}
    //                 </p>
    //                 {productVariant.size && (
    //                   <p className="text-12 text-ternary-color">
    //                     Size: {productVariant.size}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </TableCell>

    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
    //             <div className="w-space-60 h-space-60">
    //               <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
    //                 Rs.{productVariant.price}
    //               </p>
    //               <span className="text-12">Price</span>
    //             </div>
    //           </TableCell>
    //           <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
    //             <div className="w-space-60 h-space-60 flex items-center gap-space-10">
    //               Qty: {quantity}
    //             </div>
    //           </TableCell>
    //         </>
    //       )}
    //     </TableRow>
    //   </TableBody>
    // </Table>


<div className={`relative w-full border-b border-gray-200 ${status === "out-of-stock" ? "bg-gray-50" : ""}`}>
  {/* Out of Stock Badge */}
  {status === "out-of-stock" && (
    <div className="absolute top-2 right-2">
      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
        Out of Stock
      </span>
    </div>
  )}

  <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
    {/* Product Image */}
    <div className="w-24 h-24 flex-shrink-0 relative">
      <img
        src={productVariant.images.url}
        className={`w-full h-full object-contain rounded-lg ${status === "out-of-stock" ? "opacity-70" : ""}`}
        alt={productVariant.product.name}
      />
    </div>

    {/* Product Info */}
    <div className="flex-1 min-w-0">
      <h3 className={`text-base font-semibold ${status === "out-of-stock" ? "text-gray-500" : "text-gray-900"}`}>
        {productVariant.product.name}
      </h3>
      <div className="flex flex-wrap gap-2 mt-1">
        <span className={`text-sm ${status === "out-of-stock" ? "text-gray-400" : "text-gray-500"}`}>
          Color: <span className={status === "out-of-stock" ? "text-gray-400" : "text-gray-700"}>{productVariant.color}</span>
        </span>
        {productVariant.size && (
          <span className={`text-sm ${status === "out-of-stock" ? "text-gray-400" : "text-gray-500"}`}>
            Size: <span className={status === "out-of-stock" ? "text-gray-400" : "text-gray-700"}>{productVariant.size}</span>
          </span>
        )}
      </div>
    </div>

    {/* Price */}
    <div className="w-24 text-right sm:text-center">
      <p className={`text-base font-semibold ${status === "out-of-stock" ? "text-gray-400" : "text-secondary-600"}`}>
        Rs. {productVariant.price}
      </p>
      <span className={`text-xs ${status === "out-of-stock" ? "text-gray-400" : "text-gray-500"}`}>Price</span>
    </div>

    {/* Quantity Selector (for cart variant) */}
    {variant === "cart" && (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          disabled={status === 'out-of-stock'}
          className={`hover:cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border ${status === 'out-of-stock' ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <div className="w-12 text-center">
          <input
            type="text"
            value={newQuantity}
            readOnly
            className={`w-full text-center border-b py-1 focus:outline-none ${status === 'out-of-stock' ? 'border-gray-200 text-gray-400' : 'border-gray-300 text-gray-700'}`}
          />
        </div>
        <button
          onClick={handleIncrease}
          disabled={status === 'out-of-stock'}
          className={`hover:cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border ${status === 'out-of-stock' ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
    )}

    {/* Quantity Display (for order variant) */}
    {variant === "order" && (
      <div className="w-24 text-center">
        <span className={`text-sm ${status === "out-of-stock" ? "text-gray-400" : "text-gray-700"}`}>
          Qty: {quantity}
        </span>
      </div>
    )}

    {/* Delete Button (always visible for cart variant) */}
    {variant === "cart" && (
      <div className="w-10 flex justify-center">
        {isPending ? (
          <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
        ) : (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className={`text-red-500 hover:text-red-700 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    )}
  </div>
</div>
  );
};

export default CartCard;
