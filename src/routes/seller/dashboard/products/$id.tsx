import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import Spinner from "@/components/ui/spinner";
import { useGetProductById } from "@/hooks/product.hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import BackButton from "@/components/Button/BackButton";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/Product/ProductDetail";
import { UserRole } from "@/types/enum.types";
import type { ProductInfo } from "@/types/product.types";
import { Edit } from "lucide-react";

export const Route = createFileRoute("/seller/dashboard/products/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { isPending, data: product } = useGetProductById(id);
  let colors = ""
  product?.data.variants.map((variant) => variant.color).forEach((color)=>colors+=color+',');
  const createdAt = `${product?.data.createdAt}`.split('T')[0]

  if (isPending) return <Spinner />;

  const buttons = [<Link to={`/seller/dashboard/products/$id/edit`} params={{id:id}}><Button variant="outline" className="hover:border-secondary-color hover:text-secondary-color bg-secondary-color text-text-color hover:cursor-pointer"><Edit size={14} /> Edit</Button></Link>,<BackButton URL={'/seller/dashboard/products'}/>]

  const props = {
    role: UserRole.SELLER,
    productSummary: {
      id: id,
      name: product?.data.name as string,
      colors: colors,
      createdAt: createdAt
    }
  }
  return (
    <DashboardHeader header={`Product Details`} buttons={buttons}>
      <ProductDetail role={props.role} productSummary={props.productSummary} product = {product?.data as ProductInfo}/>
    </DashboardHeader>
  );
}
