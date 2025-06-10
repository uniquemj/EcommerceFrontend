import ProductCard from "@/components/Layout/ProductCard";
import ProductDetail from "@/components/Product/newProductDetail";
import Spinner from "@/components/ui/spinner";
import {
  useGetProductByCategory,
  useGetProductById
} from "@/hooks/product.hooks";
import { useVariantSelectionStore } from "@/store/variant.store";
import { UserRole } from "@/types/enum.types";
import type { ProductInfo } from "@/types/product.types";
import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { isPending, data: product } = useGetProductById(id);
  const {setSelectedVariantId} = useVariantSelectionStore();

  const category = product?.data.category._id

  const { data: relatedProduct } = useGetProductByCategory(category as string, {page: 1, limit: 5})

  let colors = "";

  product?.data.variants
  .map((variant) => variant.color)
  .forEach((color) => (colors += color + ","));
  const createdAt = `${product?.data.createdAt}`.split("T")[0];
  
  useMemo(()=>{
    setSelectedVariantId(null);
  }, [id])
  
  if (isPending) return <Spinner />;

  const props = {
    role: UserRole.CUSTOMER,
    productSummary: {
      id: id,
      name: product?.data.name as string,
      colors: colors,
      createdAt: createdAt,
    },
  };


  return (
    <div className="px-space-24 py-space-24 flex flex-col gap-5">
      <ProductDetail
        role={props.role}
        productSummary={props.productSummary}
        product={product?.data as ProductInfo}
      />
      <div className=" w-full py-space-24 px-space-24">
        <div className="border-1 px-space-24 py-space-24 flex flex-col max-sm:gap-space-24 gap-space-38">
          <h1 className="text-24 font-medium text-secondary-shade-dark">
            Related Products
          </h1>
          {relatedProduct?.data?.length ? 
          (<div className="flex items-center gap-space-10">
            {relatedProduct?.data
              .filter((product) => product._id !== id)
              .map((product) => (
                
                <ProductCard productInfo={product} key={product._id} />
              ))}
          </div>)
          : 
          <div className="flex items-center justify-center">
            <CircleAlert/>
            No Related Product Found.
            </div>
            }
        </div>
      </div>
    </div>
  );
}
