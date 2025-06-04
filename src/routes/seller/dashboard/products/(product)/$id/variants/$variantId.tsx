import BackButton from "@/components/Button/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { useEditProductVariant, useGetVariantById } from "@/hooks/product.hooks";
import { ColorType, SizeType } from "@/types/product.types";
import type { UpdateVariant } from "@/validations/variants.validate";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";

export const Route = createFileRoute(
  "/seller/dashboard/products/(product)/$id/variants/$variantId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const colors = Object.values(ColorType);
  const sizes = Object.values(SizeType);

  const { id, variantId } = Route.useParams();
  const { data: variant } = useGetVariantById(id, variantId);
  const {isPending, mutate} = useEditProductVariant()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Partial<UpdateVariant>>({
    values: {
      color: variant?.data.color,
      size: variant?.data.size,
      price: String(variant?.data.price),
      stock: String(variant?.data.stock),
      availability: variant?.data.availability,
      packageWeight: String(variant?.data.packageWeight),
      packageLength: variant?.data.packageLength,
      imageUrl: variant?.data.images.url,
    },
    defaultValues: {
      color: variant?.data.color,
      size: variant?.data.size,
      price: String(variant?.data.price),
      stock: String(variant?.data.stock),
      availability: variant?.data.availability,
      packageWeight: String(variant?.data.packageWeight),
      packageLength: variant?.data.packageLength,
      imageUrl: variant?.data.images.url,
      variantImages: [undefined],
    },
  });

  const handleUpdate = (data: Partial<UpdateVariant>) => {
    
    console.log(data)
    mutate({productId: id, variantId: variantId, variantInfo: data})
  };

  if(isPending) return <Spinner/>

  return (
    <div className="flex flex-col gap-5">
      <BackButton URL={`/seller/dashboard/products/${id}`}/>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-color">
            Variant Information
          </CardTitle>
        </CardHeader>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <CardContent className="flex flex-col gap-5">
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="color">Color</Label>
                  <Controller
                    name={`color`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              field?.value?.length
                                ? field.value
                                : "Select Color"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="h-[200px]">
                          <SelectGroup>
                            <SelectLabel>Colors</SelectLabel>
                            {colors.map((color) => (
                              <SelectItem value={color} key={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.color && (
                    <p className="text-error-color text-error-msg">
                      {errors.color.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="size">Size</Label>
                  <Controller
                    name={`size`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              field.value?.length ? field.value : "Select Size"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="h-[200px]">
                          <SelectGroup>
                            <SelectLabel>Sizes</SelectLabel>
                            {sizes.map((size) => (
                              <SelectItem value={size} key={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.size && (
                    <p className="text-error-color text-error-msg">
                      {errors.size.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    {...register(`price`)}
                    placeholder="Price"
                    id="price"
                  />
                  {errors.price && (
                    <p className="text-error-color text-error-msg">
                      {errors.price.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register(`stock`)}
                    placeholder="Stock"
                  />
                  {errors.stock && (
                    <p className="text-error-color text-error-msg">
                      {errors.stock.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    type="checkbox"
                    {...register(`availability`)}
                    defaultChecked={watch("availability")}
                    className="w-10 h-5"
                  />
                  {errors.availability && (
                    <p className="text-error-color text-error-msg">
                      {errors.availability.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="packageWeight">Package Weight</Label>
                  <Input
                    type="number"
                    {...register(`packageWeight`)}
                    placeholder="Weight"
                  />
                  {errors.packageWeight && (
                    <p className="text-error-color text-error-msg">
                      {errors.packageWeight.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="packageLength">Package Length</Label>
                  <Input
                    type="text"
                    {...register(`packageLength`, {
                      required: false,
                    })}
                    placeholder="l x b x h"
                  />
                  {errors.packageLength && (
                    <p className="text-error-color text-error-msg">
                      {errors.packageLength.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="image">Image</Label>
                  <Controller
                    control={control}
                    name={`variantImages`}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        required = {false}
                        onChange={(e) => {
                          const file = Array.from(e.target.files||[]);
                          field.onChange(file);
                        }}
                      />
                    )}
                  />
                  {errors.variantImages && (
                    <p className="text-error-color text-error-msg">
                      {errors.variantImages.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-secondary-color hover:cursor-pointer border hover:bg-transparent hover:text-secondary-color hover:border-secondary-color w-[300px]"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
