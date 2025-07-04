import { UserRole } from "@/types/enum.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetVariantListOfProduct } from "@/hooks/product.hooks";
import Spinner from "@/components/ui/spinner";
import type { VariantInfo } from "@/types/variant.types";
import type { ProductInfo } from "@/types/product.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Circle, Clock, Info, Megaphone, Text } from "lucide-react";
import ProductView from "@/components/Product/ProductView";
import { Separator } from "@/components/ui/separator";


interface ProductDetailProps {
  role: string;
  productSummary: {
    id: string;
    name: string;
    colors: string;
    createdAt: string;
  };
  product: ProductInfo;
}

const ProductDetail = ({
  role,
  productSummary,
  product,
}: ProductDetailProps) => {
  const { isPending, data: variants } = useGetVariantListOfProduct(
    productSummary.id
  );

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-5">
            <div className="flex justify-start items-center gap-5">
              <h1 className="font-bold text-3xl text-secondary-color">{productSummary.name}</h1>
              {role == UserRole.CUSTOMER && (
                <Button className="hover:bg-secondary-color hover:text-text-color rounded-none bg-transparent border-1 border-secondary-color text-secondary-color hover:cursor-pointer">
                  Add to Cart
                </Button>
              )}
            </div>
            <div className="flex flex-col min-md:flex-row gap-4">
              <div className="flex items-center bg-secondary-shade-light py-1 px-2 rounded-xl gap-2">
                <div className="flex gap-3 items-center">
                  <Circle size={10} className="text-secondary-shade-normal" />
                  <h2 className="text-14 text-secondary-shade-normal font-medium">
                    Colors:
                  </h2>
                </div>
                <p className="text-12 text-secondary-shade-normal">
                  {productSummary.colors}
                </p>
              </div>
              <div className="flex  items-center gap-2 bg-secondary-shade-light py-1 px-2 rounded-xl">
                <div className="flex gap-3 items-center">
                  <Clock size={10} className="text-secondary-shade-normal" />
                  <h2 className="text-14 text-secondary-shade-normal font-medium">
                    Created At:
                  </h2>
                </div>
                <p className="text-12 text-secondary-shade-normal ">
                  {productSummary.createdAt}
                </p>
                <div></div>
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator/>
        <CardHeader>
          <CardTitle className="text-xl font-medium text-secondary-color">Available</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <ProductView
              render={variants?.data as VariantInfo[]}
              option={{ role: role }}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-5">
        <Accordion type="single" collapsible className="w-full px-2">
          <AccordionItem value="product-description">
            <AccordionTrigger>
              <div className="flex gap-3 items-center text-xl text-secondary-color">
                <Text size={14} />
                Product Description
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc pl-10">
                <li>{product.productDescription}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="product-highlight">
            <AccordionTrigger>
              <div className="flex gap-3 items-center text-xl text-secondary-color">
                <Megaphone size={14} />
                Product Highlight
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc pl-10">
                <li>{product.productHighlights}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="warranty-setting">
            <AccordionTrigger>
              <div className="flex gap-3 items-center text-xl text-secondary-color">
                <Info size={14} />
                Warranty Information
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="pl-10 flex flex-col gap-2">
                <h1>Warranty Type: {product.warrantyType}</h1>
                <h1>Warranty Period: {product.warrantyPeriod} month</h1>
                <div className="flex flex-col gap-1">
                  <h1>Warranty Policy:</h1>
                  <ul className="list-disc pl-8">
                    <li>{product.warrantyPolicy}</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductDetail;
