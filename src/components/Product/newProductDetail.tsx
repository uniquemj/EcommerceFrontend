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
import {
  AlignLeft,
  Calendar,
  Circle,
  Clock,
  Edit,
  Info,
  Loader2,
  Megaphone,
  Palette,
  Plus,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Text,
} from "lucide-react";
import ProductView from "@/components/Product/ProductView";
import { useVariantSelectionStore } from "@/store/variant.store";
import { useAddToCart } from "@/hooks/cart.hooks";
import { useAuth } from "@/store/auth.store";
import { Link, useNavigate } from "@tanstack/react-router";
import BackButton from "../Button/BackButton";
import { Badge } from "../ui/badge";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { selectedVariantId } = useVariantSelectionStore();

  const { isPending, data: variants } = useGetVariantListOfProduct(
    productSummary.id
  );

  const { isPending: isAddToCartPending, mutate } = useAddToCart();

  if (isPending) return <Spinner />;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate({
        to: "/auth/login",
      });
    }
    if (!selectedVariantId) return;
    mutate({ itemId: selectedVariantId, quantity: 1 });
  };

  return (
    // <div className="flex flex-col gap-6 max-sm:px-space-8 max-sm:py-space-12 px-space-24 py-space-24">
    //   <Card className="rounded-none shadow-none grid max-940:grid-cols-1 grid-cols-2">
    //     <CardHeader>
    //       <div className="flex flex-col gap-5">
    //         <div className="flex justify-start items-center gap-5">
    //           <h1 className="font-bold text-3xl text-secondary-shade-dark">
    //             {productSummary.name}
    //           </h1>
    //           {role == UserRole.CUSTOMER && isAuthenticated && (
    //             <Button className="hover:bg-secondary-color hover:text-text-color rounded-none bg-transparent border-1 border-secondary-color text-secondary-color hover:cursor-pointer" onClick={handleAddToCart}>
    //               {isAddToCartPending ? (
    //                 <Loader2 className="animate-spin w-4 h-4 mr-2" />
    //               ) : (
    //                 "Add to Cart"
    //               )}
    //             </Button>)}
    //         </div>
    //         {role !== UserRole.CUSTOMER && (
    //           <div className="flex flex-col min-md:flex-row gap-4">
    //             <div className="flex items-center bg-secondary-shade-light py-1 px-2 rounded-xl gap-2">
    //               <div className="flex gap-3 items-center">
    //                 <Circle size={10} className="text-secondary-shade-normal" />
    //                 <h2 className="text-14 text-secondary-shade-normal font-medium">
    //                   Colors:
    //                 </h2>
    //               </div>
    //               <p className="text-12 text-secondary-shade-normal">
    //                 {productSummary.colors}
    //               </p>
    //             </div>
    //             <div className="flex  items-center gap-2 bg-secondary-shade-light py-1 px-2 rounded-xl">
    //               <div className="flex gap-3 items-center">
    //                 <Clock size={10} className="text-secondary-shade-normal" />
    //                 <h2 className="text-14 text-secondary-shade-normal font-medium">
    //                   Created At:
    //                 </h2>
    //               </div>
    //               <p className="text-12 text-secondary-shade-normal ">
    //                 {productSummary.createdAt}
    //               </p>
    //               <div></div>
    //             </div>
    //           </div>
    //         )}
    //       </div>

    //       <div className="mt-5">
    //         <Accordion type="single" collapsible className="w-full px-2">
    //           <AccordionItem value="product-description">
    //             <AccordionTrigger>
    //               <div className="flex gap-3 items-center text-16 hover:text-secondary-shade-normal">
    //                 <Text size={12} className="text-secondary-shade-normal"/>
    //                 Product Description
    //               </div>
    //             </AccordionTrigger>
    //             <AccordionContent className="flex flex-col gap-4 text-balance">
    //               <ul className="list-disc pl-10">
    //                 <li>{product.productDescription}</li>
    //               </ul>
    //             </AccordionContent>
    //           </AccordionItem>
    //           <AccordionItem value="product-highlight">
    //             <AccordionTrigger>
    //               <div className="flex gap-3 items-center text-16 hover:text-secondary-shade-normal">
    //                 <Megaphone size={12} className="text-secondary-shade-normal"/>
    //                 Product Highlight
    //               </div>
    //             </AccordionTrigger>
    //             <AccordionContent className="flex flex-col gap-4 text-balance">
    //               <ul className="list-disc pl-10">
    //                 <li>{product.productHighlights}</li>
    //               </ul>
    //             </AccordionContent>
    //           </AccordionItem>
    //           <AccordionItem value="warranty-setting">
    //             <AccordionTrigger>
    //               <div className="flex gap-3 items-center text-16 hover:text-secondary-shade-normal">
    //                 <Info size={12} className="text-secondary-shade-normal"/>
    //                 Warranty Information
    //               </div>
    //             </AccordionTrigger>
    //             <AccordionContent className="flex flex-col gap-4 text-balance">
    //               <div className="pl-10 flex flex-col gap-2">
    //                 <h1>Warranty Type: {product.warrantyType}</h1>
    //                 <h1>Warranty Period: {product.warrantyPeriod} month</h1>
    //                 <div className="flex flex-col gap-1">
    //                   <h1>Warranty Policy:</h1>
    //                   <ul className="list-disc pl-8">
    //                     <li>{product.warrantyPolicy}</li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </AccordionContent>
    //           </AccordionItem>
    //         </Accordion>
    //       </div>
    //     </CardHeader>

    //     <CardContent>
    //       <CardTitle className="text-xl font-medium text-secondary-color">
    //         Available
    //       </CardTitle>

    //       <div className="">
    //         <ProductView
    //           render={variants?.data as VariantInfo[]}
    //           option={{ role: role }}
    //           defaultVariant={product.defaultVariant as unknown as string}
    //         />
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Product Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {productSummary.name}
                </h1>

                {role === UserRole.CUSTOMER && isAuthenticated && (
                  <Button
                    className="flex items-center bg-white border border-secondary-shade-normal text-secondary-600 hover:bg-secondary-50 transition-colors hover:cursor-pointer"
                    onClick={handleAddToCart}
                    disabled={isAddToCartPending}
                  >
                    {isAddToCartPending ? (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4 text-secondary-shade-normal" />
                        <span className="text-secondary-shade-normal">Add to Cart</span>
                      </>
                    )}
                  </Button>
                )}
              </div>

              {role !== UserRole.CUSTOMER && (
                <div className="flex flex-wrap gap-2">
                  <Badge className="flex items-center gap-2 bg-gray-100 text-gray-800">
                    <Palette className="h-3 w-3 text-secondary-600" />
                    Colors: {productSummary.colors}
                  </Badge>
                  <Badge className="flex items-center gap-2 bg-gray-100 text-gray-800">
                    <Calendar className="h-3 w-3 text-secondary-600" />
                    Created:{" "}
                    {new Date(productSummary.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              )}
            </div>

            {/* Information Accordions */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {/* Description Accordion */}
                <AccordionItem
                  value="description"
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="hover:no-underline py-4 px-0">
                    <div className="flex items-center gap-3 text-gray-700 hover:text-secondary-700">
                      <AlignLeft className="h-5 w-5 text-secondary-600" />
                      <span className="font-medium">Product Description</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 px-0">
                    <div className="prose prose-sm max-w-none text-gray-600">
                      {product.productDescription}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Highlights Accordion */}
                <AccordionItem
                  value="highlights"
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="hover:no-underline py-4 px-0">
                    <div className="flex items-center gap-3 text-gray-700 hover:text-secondary-700">
                      <Sparkles className="h-5 w-5 text-secondary-600" />
                      <span className="font-medium">Product Highlights</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 px-0">
                    <div className="prose prose-sm max-w-none text-gray-600">
                      {product.productHighlights}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Warranty Accordion */}
                <AccordionItem
                  value="warranty"
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="hover:no-underline py-4 px-0">
                    <div className="flex items-center gap-3 text-gray-700 hover:text-secondary-700">
                      <Shield className="h-5 w-5 text-secondary-600" />
                      <span className="font-medium">Warranty Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 px-0 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Warranty Type
                        </p>
                        <p className="font-medium text-gray-700">
                          {product.warrantyType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Warranty Period
                        </p>
                        <p className="font-medium text-gray-700">
                          {product.warrantyPeriod} months
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Warranty Policy
                      </p>
                      <div className="prose prose-sm max-w-none text-gray-600">
                        {product.warrantyPolicy}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column - Variants */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Variants
              </h2>
              {/* {role !== UserRole.CUSTOMER && (
            <Link 
              to={`/seller/dashboard/products/$id/variants/$variantId`}
              params={{id: productSummary.id, variantId}}
              className="text-sm text-secondary-600 hover:text-secondary-800 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Variant
            </Link>
          )} */}
            </div>

            <div className="rounded-lg overflow-hidden">
              <ProductView
                render={variants?.data as VariantInfo[]}
                option={{ role: role }}
                defaultVariant={product.defaultVariant as unknown as string}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
