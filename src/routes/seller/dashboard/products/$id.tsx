import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { DataTable } from "@/components/Table/data-table";
import Spinner from "@/components/ui/spinner";
import { useGetProductById } from "@/hooks/product.hooks";
import type { VariantInfo } from "@/types/variant.types";
import { createFileRoute } from "@tanstack/react-router";
import { variantColumns } from "@/components/Table/Columns/variant.columns";
import BackButton from "@/components/Button/BackButton";
import { Card} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Circle, Clock, Info, Megaphone,Shield, Text } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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

  const buttons = [<BackButton URL={'/seller/dashboard/products'}/>]

  return (
    <DashboardHeader header={`Product Details`} buttons={buttons}>
      <div className="flex w-full flex-col gap-10">
        <div className="grid grid-cols-1 min-[700px]:grid-cols-[30%_auto] gap-10">
          <div>
          <Card className="flex flex-col">
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-xl font-bold">{product?.data.name}</h1>
              <Badge className="bg-secondary-color">{product?.data.category.title}</Badge>
            </div>
            <div className="flex justify-center">
              <div className="w-[80%] flex justify-center items-center">
                <Separator className="bg-primary-color opacity-20"/>
              </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col w-full px-10">
                  <div className="flex gap-3 items-center">
                    <Circle size={10} className="text-ternary-color"/>
                    <h2 className="text-[14px] text-footer-color font-medium">Colors</h2>
                  </div>
                    <p className="text-[12px] text-ternary-color px-5.5">{colors}</p>
                  <div>
                  </div>
                </div>
                <div className="flex flex-col w-full px-10">
                  <div className="flex gap-3 items-center">
                    <Clock size={10} className="text-ternary-color"/>
                    <h2 className="text-[14px] text-footer-color font-medium">Created At</h2>
                  </div>
                    <p className="text-[12px] text-ternary-color px-5.5">{createdAt}</p>
                  <div>
                  </div>
                </div>
            </div>
          </Card>
          </div>

          <Card className="overflow-y-scroll max-h-[300px] px-5">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
              <Text size={13}/>
              <h1 className="text-sm font-medium">
                Product Description
              </h1>
              </div>
              <Textarea readOnly>{product?.data.productDescription}</Textarea>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <Megaphone size={13}/>
                <h1 className="text-sm font-medium">
                  Product Highlight
                </h1>
              </div>
              <Textarea readOnly>{product?.data.productHighlights}</Textarea>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <AlertTriangle size={13}/>
                <h1 className="text-sm font-medium">
                  Dangerous Good
                </h1>
              </div>
              <Input value={product?.data.dangerousGoods} readOnly/>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <Shield size={13}/>
                <h1 className="text-sm font-medium">
                  Warranty Type
                </h1>
              </div>
              <Input value={product?.data.warrantyType} readOnly/>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <Calendar size={13}/>
                <h1 className="text-sm font-medium">
                  Warranty Period
                </h1>
              </div>
              <Input value={product?.data.warrantyPeriod + ' month'} readOnly/>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <Info size={13}/>
                <h1 className="text-sm font-medium">
                  Warranty Policy
                </h1>
              </div>
              <Textarea readOnly>{product?.data.warrantyPolicy}</Textarea>
            </div>
          </Card>
        </div>
        <DataTable data={product?.data.variants as VariantInfo[]} columns={variantColumns}/>
      </div>
    </DashboardHeader>
  );
}
