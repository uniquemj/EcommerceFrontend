import BackButton from '@/components/Button/BackButton';
import ProductDetail from '@/components/Product/ProductDetail';
import Spinner from '@/components/ui/spinner';
import { useGetProductById } from '@/hooks/product.hooks';
import { UserRole } from '@/types/enum.types';
import type { ProductInfo } from '@/types/product.types';
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/products/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams();
  const { isPending, data: product } = useGetProductById(id);
  let colors = "";
  product?.data.variants
    .map((variant) => variant.color)
    .forEach((color) => (colors += color + ","));
  const createdAt = `${product?.data.createdAt}`.split("T")[0];

  if (isPending) return <Spinner />;

  const props = {
    role: UserRole.ADMIN,
    productSummary: {
      id: id,
      name: product?.data.name as string,
      colors: colors,
      createdAt: createdAt,
    },
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <BackButton URL={"/admin/dashboard/products"} />
        </div>
      </div>
      <div>
        <ProductDetail
          role={props.role}
          productSummary={props.productSummary}
          product={product?.data as ProductInfo}
        />
      </div>
    </div>
  );
}
