import ProductCard from "../Card/ProductCard";
import type { VariantInfo } from "@/types/variant.types";
import ProductRow from "../Layout/ProductList/ProductRow";
import { RadioGroup } from "../ui/radio-group";
import { useVariantSelectionStore } from "@/store/variant.store";
import { useRef } from "react";

type OrientationType = "horizontal" | "vertical" | undefined;
type AlignmentOptionType = "start" | "center" | "end";

interface ProductViewProps {
  render: VariantInfo[];
  option?: {
    orientation?: OrientationType;
    align?: AlignmentOptionType;
    loop?: boolean;
    role: string;
  };
  className?: string;
  defaultVariant?:string
}

function ProductView({ render, option ,defaultVariant}: ProductViewProps) {
  const initializedRef = useRef(false)
  const { selectedVariantId, setSelectedVariantId} = useVariantSelectionStore()
  if(!initializedRef.current && defaultVariant as string && !selectedVariantId){
    setSelectedVariantId(defaultVariant as string);
    initializedRef.current = true
  }
  
  return (
    <>
      <div className="hidden min-s-md:flex justify-center ">
        {/* <Carousel
          opts={{
            align: option?.align || "start",
            loop: option?.loop || false,
          }}
          orientation={option?.orientation || "horizontal"}
          className={`w-full sm:max-w-xl md:max-w-4xl ${className}`}
        >
          <CarouselContent className="">
            {render.map((item) =>
              (
                <CarouselItem
                  key={item._id}
                  className="grid grid-cols-3 max-lg:basis-8/10 lg:basis-4/10"
                >
                  <ProductCard
                    variantInfo={item as VariantInfo}
                    role = {option?.role as string}
                    key={item._id}
                  />
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious className="bg-secondary-shade-light"/>
          <CarouselNext className="bg-secondary-shade-light"/>
        </Carousel> */}
      </div>
      {/* <div className="flex max-s-md:flex-col flex-row items-center gap-6 min-s-md:overflow-y-auto">
              {
                render.map((item)=>(
                  <ProductCard variantInfo={item as VariantInfo} role={option?.role as string} key={item._id}/>

                ))
              }
      </div> */}
      <RadioGroup
        value={defaultVariant || ""}
        onValueChange={(val) => setSelectedVariantId(val)}
        className="space-y-4"
      >
        <div className="flex flex-col items-center gap-6 overflow-y-auto py-space-12">
          {render.map((item) => (
            <ProductRow
              variantInfo={item as VariantInfo}
              role={option?.role as string}
              key={item._id}
            />
          ))}
        </div>
      </RadioGroup>
    </>
  );
}

export default ProductView;
