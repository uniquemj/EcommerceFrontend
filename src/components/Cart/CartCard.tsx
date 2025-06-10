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
    <Table className="table-fixed w-full">
      <TableBody>
        <TableRow>
          {variant === "cart" && (
            <>
              <TableCell className={`${status === "out-of-stock" &&  `relative`} w-space-120 min-w-space-120 h-space-58 min-940:py-space-24 min-940:px-space-24 gap-space-12 border-b-1`}>
                {status === "out-of-stock" && (
                  <div className="absolute w-4/5 h-full">
                    <p className="text-ternary-color text-center">
                      Not-available
                    </p>
                  </div>
                )}
                <div className="w-space-60 ">
                  <img
                    src={productVariant.images.url}
                    className="w-full h-full object-contain rounded-8"
                  />
                </div>
              </TableCell>
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60">
                  <p className="line-clamp-1 font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                    {productVariant.product.name}
                  </p>
                  <div className="flex items-center flex-wrap gap-space-2">
                    <p className="text-12 text-ternary-color">
                      Color: {productVariant.color}
                    </p>
                    {productVariant.size && (
                      <p className="text-12 text-ternary-color">
                        Size: {productVariant.size}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              {productVariant.size && (
                <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
                  <div className="w-space-60 h-space-60">
                    <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                      {productVariant.size}
                    </p>
                    <span className="text-12">Size</span>
                  </div>
                </TableCell>
              )}
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60">
                  <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
                    Rs.{productVariant.price}
                  </p>
                  <span className="text-12">Price</span>
                </div>
              </TableCell>
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60 flex items-center gap-space-10">
                  <button
                    className="w-space-10 h-space-10 hover:cursor-pointer"
                    onClick={handleDecrease}
                  >
                    <Minus size={14} />
                  </button>
                  <Input
                    type="number"
                    value={newQuantity}
                    className="p-0 text-center border-secondary-shade-normal focus-visible:ring-0 focus:outline-none"
                    readOnly
                  />
                  <button
                    className="w-space-10 h-space-10 hover:cursor-pointer"
                    onClick={handleIncrease}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </TableCell>
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
                <div className="flex gap-space-18">
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <Trash2
                      className="text-error-color hover:cursor-pointer"
                      size={16}
                      onClick={handleDelete}
                    />
                  )}
                </div>
              </TableCell>
            </>
          )}
          {variant === "order" && (
            <>
              <TableCell className="relative w-space-120 min-w-space-120 h-space-58 min-h-space-58 min-940:py-space-24 min-940:px-space-24 gap-space-12 border-b-1">
                {status === "out-of-stock" && (
                  <div className="absolute w-4/5 h-full">
                    <p className="text-ternary-color text-center">
                      Not-available
                    </p>
                  </div>
                )}
                <div className="w-space-60 h-space-60">
                  <img
                    src={productVariant.images.url}
                    className="w-full h-full object-center rounded-8"
                  />
                </div>
              </TableCell>
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60">
                  <p className="line-clamp-1 font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                    {productVariant.product.name}
                  </p>
                  <div className="flex items-center flex-wrap gap-space-2">
                    <p className="text-12 text-ternary-color">
                      Color: {productVariant.color}
                    </p>
                    {productVariant.size && (
                      <p className="text-12 text-ternary-color">
                        Size: {productVariant.size}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              {productVariant.size && (
                <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
                  <div className="w-space-60 h-space-60">
                    <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                      {productVariant.size}
                    </p>
                    <span className="text-12">Size</span>
                  </div>
                </TableCell>
              )}
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60">
                  <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
                    Rs.{productVariant.price}
                  </p>
                  <span className="text-12">Price</span>
                </div>
              </TableCell>
              <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-b-1">
                <div className="w-space-60 h-space-60 flex items-center gap-space-10">
                    Qty: {quantity}
                </div>
              </TableCell>
            </>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CartCard;
