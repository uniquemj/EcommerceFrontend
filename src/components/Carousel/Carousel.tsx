
import { Carousel } from "@/components/ui/carousel";
import ProductCard from "../Card/ProductCard";
import type { VariantInfo } from "@/types/variant.types";
import { Button } from "../ui/button";
import { UserRole } from "@/types/enum.types";

type OrientationType = "horizontal" | "vertical" | undefined;
type AlignmentOptionType = 'start' | 'center' | 'end';

interface CarouselProps<TRender> {
  render: TRender[];
  option?: {
    orientation?: OrientationType;
    type?: string;
    align?: AlignmentOptionType;
    loop?: boolean;
    role: string;
  };
  className?: string
}


function CarouselComp<TRender>({
  render,
  option,
  className
}: CarouselProps<TRender>) {

  let buttons:React.ReactNode[] = []

  if(option?.role == UserRole.CUSTOMER){
    buttons = [<Button className="bg-secondary-color hover:cursor-pointer hover:bg-transparent hover:border hover:border-secondary-color hover:text-secondary-color">Add to Cart</Button>]
  }

  return(<div>
    <Carousel
      opts={{ align: option?.align || "start", loop: option?.loop||false }}
      orientation={option?.orientation || "horizontal"}
      className={` ${className}`}
    >
      <div>
        {
          render.map((item) => (
            option?.type == "card" ? (
              <ProductCard variantInfo={item as VariantInfo} buttons={buttons}/>
            ): null
          ))
        }
        </div>
    </Carousel>
    </div>)
};

export default CarouselComp;
