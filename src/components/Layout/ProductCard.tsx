import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductInfo } from "@/types/product.types";

interface ProductCardProps {
  productInfo: ProductInfo;
}
const ProductCard = ({ productInfo }: ProductCardProps) => {
  return (
    <>
      <Card className=" rounded-none group p-0 max-sm:h-space-180 max-sm:w-space-140 w-space-220  border-1 gap-0 shadow-sm h-space-360">
        <CardHeader className=" p-0 h-4/5 group-hover:brightness-75 duration-300  items-center relative border-b-1">
          <img
            src={productInfo.defaultVariant.images.url}
            className="h-full w-full absolute object-cover"
          />
        </CardHeader>
        <CardContent className="p-0 px-space-14 py-space-10">
          <div>
            <span className="text-12 text-ternary-color">{productInfo.category.title}</span>
          </div>
          <div>
            <h1 className="line-clamp-2 text-14 leading-space-24 font-semibold">
              {productInfo.name}
            </h1>
            <h1 className="text-secondary-shade-normal text-18 font-medium">
              Rs.{productInfo.defaultVariant.price}
            </h1>
          </div>
        </CardContent>
      </Card>

    </>
  );
};

export default ProductCard;
