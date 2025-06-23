import { RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRemoveVariantFromProduct } from "@/hooks/product.hooks";
import { useAuth } from "@/store/auth.store";
import { useVariantSelectionStore } from "@/store/variant.store";
import { UserRole } from "@/types/enum.types";
import type { VariantInfo } from "@/types/variant.types";
import { Link } from "@tanstack/react-router";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import React from "react";

interface ProductRowProps {
  variantInfo: VariantInfo;
  role: string;
}

const ProductRow = ({ variantInfo, role }: ProductRowProps) => {
  const { isPending, mutate } = useRemoveVariantFromProduct();
  const { selectedVariantId } = useVariantSelectionStore();
  const handleDelete = () => {
    mutate({ productId: variantInfo.product._id, variantId: variantInfo._id });
  };
  return (
    // <Table className="p-0">
    //   <TableBody className="p-0">
    //     <TableRow className="overflow-x-auto">
    //       {role === UserRole.CUSTOMER ? (
    //         // <TableCell className="w-space-90 h-space-58 py-space-24  gap-space-12 border-t-1">
    //         //   <RadioGroupItem
    //         //     value={variantInfo._id}
    //         //     id={variantInfo._id}
    //         //     className="border-secondary-shade-normal"
    //         //   />
    //         // </TableCell>
    //         <TableCell className="w-space-90 h-space-58 py-space-24 gap-space-12 border-t-1">
    //           <RadioGroupItem
    //             value={variantInfo._id}
    //             id={variantInfo._id}
    //             className="border-secondary-shade-normal"
    //             checked={selectedVariantId === variantInfo._id} // Add checked state
    //           />
    //         </TableCell>
    //       ):null}
    //       <TableCell className="w-space-120 h-space-60 min-w-space-120 min-h-space-58 min-940:py-space-24 min-940:px-space-24 gap-space-12 border-t-1">
    //         <div className="w-space-60 h-space-60">
    //           <img
    //             src={variantInfo.images.url}
    //             className="w-full h-full object-center object-cover rounded-8"
    //           />
    //         </div>
    //       </TableCell>
    //       <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-t-1">
    //         <div className="w-space-60 h-space-60">
    //           <p className="font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
    //             {variantInfo.color}
    //           </p>
    //           <span className="text-12">Color</span>
    //         </div>
    //       </TableCell>
    //       {variantInfo.size && (
    //         <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
    //           <div className="w-space-60 h-space-60">
    //             <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
    //               {variantInfo.size}
    //             </p>
    //             <span className="text-12">Size</span>
    //           </div>
    //         </TableCell>
    //       )}
    //       <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-t-1">
    //         <div className="w-space-60 h-space-60">
    //           <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
    //             Rs.{variantInfo.price}
    //           </p>
    //           <span className="text-12">Price</span>
    //         </div>
    //       </TableCell>
    //       <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
    //         <div className="w-space-60 h-space-60">
    //           {role !== UserRole.CUSTOMER && (
    //             <>
    //               <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
    //                 {variantInfo.stock}
    //               </p>
    //               <span className="text-12">stock</span>
    //             </>
    //           )}
    //           {role == UserRole.CUSTOMER ? (
    //             variantInfo.stock > 0 ? (
    //               <span className="text-12">in-stock</span>
    //             ) : (
    //               <span className="text-12">out-of-stock</span>
    //             )
    //           ) : null}
    //         </div>
    //       </TableCell>
    //         {role !== UserRole.CUSTOMER
    //           &&(
    //          <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
    //               <div className="flex gap-space-18">
    //                 {role == UserRole.SELLER &&
    //                   <Link
    //                     to={`/seller/dashboard/products/$id/variants/$variantId`}
    //                     params={{
    //                       id: variantInfo.product._id,
    //                       variantId: variantInfo._id,
    //                     }}
    //                     className="hover:cursor-pointer group/edit"
    //                   >
    //                     <Edit2
    //                       className="text-secondary-shade-dark group-hover/edit:text-secondary-shade-normal"
    //                       size={16}
    //                     />
    //                   </Link>
    //                 }
    //                 {isPending ? (
    //                   <Loader2 className="animate-spin w-4 h-4 mr-2" />
    //                 ) : (
    //                   <Trash2
    //                     className="text-error-color hover:cursor-pointer"
    //                     size={16}
    //                     onClick={handleDelete}
    //                   />
    //                 )}
    //               </div>
    //       </TableCell>)}
    //     </TableRow>
    //   </TableBody>
    // </Table>
    <div
      className={`flex items-center justify-evenly p-4 hover:bg-gray-50 transition-colors rounded-8 ${
        role == UserRole.CUSTOMER && selectedVariantId === variantInfo._id
          ? "bg-secondary-50"
          : ""
      }`}
    >
      {/* Radio Button for Customers */}
      {role === UserRole.CUSTOMER && (
        <div className="pr-4">
          <RadioGroupItem
            value={variantInfo._id}
            id={variantInfo._id}
            className="h-5 w-5 border-secondary-shade-normal text-secondary-shade-normal"
          />
        </div>
      )}

      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 mr-4">
        <img
          src={variantInfo.images.url}
          className="w-full h-full object-contain rounded-md"
          alt={`${variantInfo.color} variant`}
        />
      </div>

      {/* Variant Details */}
      <div className="flex gap-space-24 items-center">
        <div className="flex flex-col justify-start gap-space-6">
          <p className="text-sm text-gray-500">Color</p>
          <p className="font-medium">{variantInfo.color}</p>
        </div>

        {variantInfo.size && (
          <div className="flex flex-col justify-start  gap-space-6">
            <p className="text-sm text-gray-500">Size</p>
            <p className="font-medium">{variantInfo.size}</p>
          </div>
        )}

        <div className="flex flex-col justify-start gap-space-6">
          <p className="text-sm text-gray-500">Price</p>
          <p className="font-medium text-secondary-shade-normal">
            Rs. {variantInfo.price}
          </p>
        </div>

        <div className="flex flex-col justify-start gap-space-6">
          <p className="text-sm text-gray-500">
            {role === UserRole.CUSTOMER ? "Status" : "Stock"}
          </p>
          <div className="flex items-center gap-1">
            {role !== UserRole.CUSTOMER ? (
              <p className="font-medium">{variantInfo.stock}</p>
            ) : variantInfo.stock > 0 ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-12">In Stock</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-12">Out of Stock</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions for Sellers/Admins */}
      {role !== UserRole.CUSTOMER && (
        <div className="flex gap-3">
          {role === UserRole.SELLER && (
            <Link
              to={`/seller/dashboard/products/$id/variants/$variantId`}
              params={{
                id: variantInfo.product._id,
                variantId: variantInfo._id,
              }}
              className="text-gray-500 hover:text-secondary-shade-normal transition-colors"
            >
              <Edit2 size={18} />
            </Link>
          )}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            {isPending ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductRow;
