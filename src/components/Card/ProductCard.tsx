import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { VariantInfo } from "@/types/variant.types";
import { Badge } from "../ui/badge";
import { UserRole } from "@/types/enum.types";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useRemoveVariantFromProduct } from "@/hooks/product.hooks";

interface ProductCardProps {
  variantInfo: VariantInfo;
  role: string;
}

const ProductCard = ({ variantInfo, role }: ProductCardProps) => {

  const {isPending, mutate} = useRemoveVariantFromProduct()

  const handleDelete = () =>{
    mutate({productId: variantInfo.product._id, variantId: variantInfo._id})
  }

  return (
    <Card className="rounded-none min-sm:w-[350px] bg-secondary-shade-lightest gap-3" key={variantInfo._id}>
      <CardHeader className="">
        <img
          src={variantInfo.images.url}
          className=" w-full max-h-[150px] object-cover rounded-none"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-1">
          <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 py-1">
            color: {variantInfo.color}
          </span>
          <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 py-1">
            package weight: {variantInfo.packageWeight} kg
          </span>
          {variantInfo.packageLength.length > 0 ? (
            <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 py-1">
              package length: {variantInfo.packageLength}
            </span>
          ) : null}

          {variantInfo.size.length > 0 ? (
            <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 py-1">
              size: {variantInfo.size}
            </span>
          ) : null}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-start gap-1">
            <span className="text-xl text-secondary-color font-[600]">
              Rs.{variantInfo.price}
            </span>
            <div className="flex">
              {variantInfo.stock > 0 ? (
                <h4 className="flex items-center gap-2 text-11">
                  in-stock: {variantInfo.stock}
                </h4>
              ) : (
                <Badge variant="outline"></Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {role == UserRole.CUSTOMER && (
              <Button className="bg-secondary-color hover:cursor-pointer hover:bg-transparent hover:border hover:border-secondary-color hover:text-secondary-color">
                Add to Cart
              </Button>
            )}
            {role == UserRole.SELLER && (
              <>
                <Link to={`/seller/dashboard/products/$id/variants/$variantId`} params={{id: variantInfo.product._id, variantId: variantInfo._id}} className="hover:cursor-pointer">
                  <Button
                    variant={"ghost"}
                    className="group/edit hover:cursor-pointer border border-secondary-shade-dark hover:bg-secondary-shade-dark"
                  >
                    <Edit2
                      className="text-secondary-shade-dark group-hover/edit:text-text-color"
                      size={16}
                    />
                  </Button>
                </Link>
                {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2 text-secondary-color" />:
                <Button
                  variant={"ghost"}
                  className="group/delete hover:cursor-pointer border hover:border-error-color bg-error-color"
                  onClick={handleDelete}
                >
                  <Trash2 className="text-text-color group-hover/delete:text-error-color" />
                </Button>
                  }
              </>
            )}
            {
              role == UserRole.ADMIN && 
              <Button
                  variant={"ghost"}
                  className="group/delete hover:cursor-pointer border hover:border-error-color bg-error-color"
                >
                  <Trash2 className="text-text-color group-hover/delete:text-error-color" />
                </Button>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
