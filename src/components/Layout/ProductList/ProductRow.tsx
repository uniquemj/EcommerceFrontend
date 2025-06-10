import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const handleDelete = () => {
    mutate({ productId: variantInfo.product._id, variantId: variantInfo._id });
  };
  return (
    <Table className="p-0">
      <TableBody className="p-0">
        <TableRow className="overflow-x-auto">
          {role === UserRole.CUSTOMER && (
            <TableCell className="w-space-90 h-space-58 py-space-24  gap-space-12 border-t-1">
              <RadioGroupItem
                value={variantInfo._id}
                id={variantInfo._id}
                className="border-secondary-shade-normal"
              />
            </TableCell>
          )}
          <TableCell className="min-w-space-120 min-h-space-58 min-940:py-space-24 min-940:px-space-24 gap-space-12 border-t-1">
            <div className="w-space-60 h-space-60">
              <img
                src={variantInfo.images.url}
                className="w-full h-full object-center object-cover rounded-8"
              />
            </div>
          </TableCell>
          <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-t-1">
            <div className="w-space-60 h-space-60">
              <p className="font-bold text-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                {variantInfo.color}
              </p>
              <span className="text-12">Color</span>
            </div>
          </TableCell>
          {variantInfo.size && (
            <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
              <div className="w-space-60 h-space-60">
                <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                  {variantInfo.size}
                </p>
                <span className="text-12">Size</span>
              </div>
            </TableCell>
          )}
          <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24  gap-space-12 border-t-1">
            <div className="w-space-60 h-space-60">
              <p className="font-semibold text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-normal">
                Rs.{variantInfo.price}
              </p>
              <span className="text-12">Price</span>
            </div>
          </TableCell>
          <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
            <div className="w-space-60 h-space-60">
              {role !== UserRole.CUSTOMER && (
                <>
                  <p className="font-normal text-size-14 leading-space-20 space-y-space-14 text-secondary-shade-dark">
                    {variantInfo.stock}
                  </p>
                  <span className="text-12">stock</span>
                </>
              )}
              {role == UserRole.CUSTOMER ? (
                variantInfo.stock > 0 ? (
                  <span className="text-12">in-stock</span>
                ) : (
                  <span className="text-12">out-of-stock</span>
                )
              ) : null}
            </div>
          </TableCell>
          {role !== UserRole.CUSTOMER && role === UserRole.SELLER && (
            <TableCell className="w-space-120 h-space-58 py-space-24 px-space-24 gap-space-12 border-t-1">
              <div className="flex gap-space-18">
                <Link
                  to={`/seller/dashboard/products/$id/variants/$variantId`}
                  params={{
                    id: variantInfo.product._id,
                    variantId: variantInfo._id,
                  }}
                  className="hover:cursor-pointer group/edit"
                >
                  <Edit2
                    className="text-secondary-shade-dark group-hover/edit:text-secondary-shade-normal"
                    size={16}
                  />
                </Link>
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
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProductRow;
