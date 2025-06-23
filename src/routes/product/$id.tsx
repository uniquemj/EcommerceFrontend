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
import { createFileRoute, Link } from "@tanstack/react-router";
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

  console.log(relatedProduct)
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
          {relatedProduct?.data?.length as number > 1? 
          (<div className="flex items-center gap-space-10">
            {relatedProduct?.data
              .filter((product) => product._id !== id)
              .map((product) => (
                <Link to='/product/$id' params={{id: product._id}}>
                <ProductCard productInfo={product} key={product._id} />
                </Link>
              ))}
          </div>)
          : 
          <div className='w-full px-space-24 py-space-24'>
              <div className='flex flex-col items-center justify-center h-full gap-space-10'>
                <CircleAlert size = {200} className='text-ternary-color'/>
                <h1 className='text-ternary-color'>No Product Found.</h1>
              </div>
          </div>
            }
        </div>
      </div>
    </div>
  );
}
