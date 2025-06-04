import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../Card/ProductCard";
import type { VariantInfo } from "@/types/variant.types";

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
}

function ProductView({ render, option, className }: ProductViewProps) {


  return (
    <>
      <div className="hidden min-s-md:flex justify-center ">
        <Carousel
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
        </Carousel>
      </div>
      <div className="hidden max-s-md:flex flex-col items-center gap-6">
              {
                render.map((item)=>(
                  <ProductCard variantInfo={item as VariantInfo} role={option?.role as string} key={item._id}/>

                ))
              }
          </div>
    </>
  );
}

export default ProductView;
