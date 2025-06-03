import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { VariantInfo } from "@/types/variant.types";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  variantInfo: VariantInfo;
  buttons: React.ReactNode[];
}

const ProductCard = ({ variantInfo, buttons }: ProductCardProps) => {
  return (
    <Card className="max-w-[350px] bg-secondary-shade-lightest gap-3">
      <CardHeader>
        <img
          src={variantInfo.images.url}
          className=" w-full max-h-[150px] object-cover rounded-md"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-1">
          <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 py-1">
            color: {variantInfo.color}
          </span>
          <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 ">
            package weight: {variantInfo.packageWeight} kg
          </span>
          {variantInfo.packageLength.length > 0 ? (
            <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 ">
              package length: {variantInfo.packageLength}
            </span>
          ) : null}

          {variantInfo.size.length > 0 ? (
            <span className="flex items-center gap-2 bg-secondary-shade-light px-3 rounded-xl text-11 ">
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
              <div className="flex items-end">
                {
                  buttons.map((button)=>button)
                }
              </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
