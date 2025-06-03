import CategoryCombobox from '@/components/Combobox/CategoryCombobox';
import DashboardHeader from '@/components/Layout/DashboardHeader/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllCategory } from '@/hooks/category.hooks';
import { useEditProduct, useGetProductById } from '@/hooks/product.hooks';
import type { Category } from '@/types/category.types';
import { ColorType, DangerousGoods, SizeType, WarrantyType } from '@/types/product.types';
import type { VariantInfo } from '@/types/variant.types';
import { productSchema, updateProductSchema, type ProductSchemaType } from '@/validations/product.validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

export const Route = createFileRoute('/seller/dashboard/products/$id_/edit')({
  component: RouteComponent,
})

function RouteComponent() {

  const {id} = Route.useParams()

  const colors = Object.values(ColorType);
  const sizes = Object.values(SizeType);
  const dangerousGoods = Object.values(DangerousGoods);
  const warrantyType = Object.values(WarrantyType);

  const { isLoading, data: categories } = useGetAllCategory({
    page: 0,
    limit: 0,
  });
  
  const {isPending:ProductPending, data: product} = useGetProductById(id)
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm<Partial<ProductSchemaType>>({
    values: {
     name: product?.data.name,
     category: product?.data.category._id,
     productDescription: product?.data.productDescription,
     productHighlights: product?.data.productHighlights,
     dangerousGoods: product?.data.dangerousGoods,
     warrantyType: product?.data.warrantyType,
     warrantyPeriod: String(product?.data.warrantyPeriod),
     warrantyPolicy: product?.data.warrantyPolicy,
     variants: product?.data.variants.map((variant)=>({
      color: variant.color,
      size: variant.size,
      price: String(variant.price),
      stock: String(variant.stock),
      availability: variant.availability,
      packageWeight: String(variant.packageWeight),
      packageLength: variant.packageLength,
      images: variant.images
     })),
    },
    defaultValues: {
      variants: [
        {
          color: "",
          size: "",
          price: "0",
          stock: "0",
          availability: true,
          packageWeight: "1",
          packageLength: "",
        },
      ],
      variantImages: [undefined],
    },
    resolver: zodResolver(updateProductSchema),
  });

  const {
    fields: variantFields,
    append: variantAppend,
    remove: variantRemove,
  } = useFieldArray<Partial<ProductSchemaType>, "variants">({
    control,
    name: "variants",
  });

  const { isPending, mutate } = useEditProduct();

  const handleAppendVariant = () => {
    variantAppend({
      color: "",
      size: "",
      price: "0",
      stock: "0",
      availability: true,
      packageWeight: "1",
      packageLength: "",
    });
    setValue("variantImages", [...(watch("variantImages") || [])]);
  };

  const handleRemoveVariant = (index: number) => {
    variantRemove(index);
    const updatedImages = [...(watch("variantImages") || [])];
    updatedImages.splice(index, 1);
    setValue("variantImages", updatedImages);
  };
  const handleProductUpdate = (data: Partial<ProductSchemaType>) => {
    console.log("from component", data);
    console.log("clicked");
    mutate({id: id, productInfo: data});
  };

  if (isPending) return <Spinner />;
  if (ProductPending) return <Spinner />;
  return (
    <DashboardHeader header="Add Product" buttons={[]}>
      <div className="">
        <Tabs defaultValue="product-detail" className="flex flex-col gap-5">
          <div className="w-full flex justify-center">
            <TabsList className="flex min-[450px]:gap-3 bg-secondary-shade-light">
              <TabsTrigger
                value="product-detail"
                className="text-sm min-[450px]:text-md data-[state=active]:text-text-color data-[state=active]:font-semibold font-normal text-secondary-shade-dark"
              >
                Basic Information
              </TabsTrigger>
              <div className="h-5">
                <Separator
                  orientation="vertical"
                  className="bg-primary-color"
                />
              </div>
              <TabsTrigger
                value="warranty-settings"
                className="text-sm min-[450px]:text-md data-[state=active]:text-text-color data-[state=active]:font-semibold  font-normal text-secondary-shade-dark"
              >
                Warranty Settings
              </TabsTrigger>
              <div className="h-5">
                <Separator
                  orientation="vertical"
                  className="bg-primary-color"
                />
              </div>
              <TabsTrigger
                value="variant-info"
                className="text-sm min-[450px]:text-md data-[state=active]:text-text-color data-[state=active]:font-semibold  font-normal text-secondary-shade-dark"
              >
                Variants
              </TabsTrigger>
            </TabsList>
          </div>

          <form onSubmit={handleSubmit(handleProductUpdate)}>
            <TabsContent value="product-detail" className="w-full">
              <Card>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                      <div className="flex flex-col space-y-3">
                        <Label htmlFor="name" className="text-xl">
                          Product Name
                        </Label>
                        <Input
                          type="text"
                          {...register("name")}
                          id="name"
                          placeholder="Enter Product Name"
                        />
                        {errors.name ? (
                          <p className="text-error-color text-error-msg">
                            {errors.name.message}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-3 w-full">
                            <Label htmlFor="category" className="text-xl">
                              Category
                            </Label>
                            <CategoryCombobox
                              categories={categories?.data as Category[]}
                              isLoading={isLoading}
                              value={field.value as string}
                              onChange={field.onChange}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="productDescription" className="text-xl">
                        Product Description
                      </Label>
                      <Textarea
                        className="h-[250px]"
                        {...register("productDescription")}
                        placeholder="Type your message here."
                        id="productDescription"
                      />
                      {errors.productDescription ? (
                        <p className="text-error-color text-error-msg">
                          {errors.productDescription.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="productDescription" className="text-xl">
                        Product Highlights
                      </Label>
                      <Textarea
                        className="h-[250px]"
                        {...register("productHighlights")}
                        placeholder="Type your message here."
                        id="productHighlights"
                      />
                      {errors.productHighlights ? (
                        <p className="text-error-color text-error-msg">
                          {errors.productHighlights.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="warranty-settings">
              <Card>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-5">
                    <Controller
                      name="dangerousGoods"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col space-y-3">
                          <Label htmlFor="dangerousGoods" className="text-xl">
                            Dangerous Good
                          </Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={field.value? field.value: `Select if any`}/>
                            </SelectTrigger>
                            <SelectContent className="h-[150px]">
                              <SelectGroup>
                                <SelectLabel>Dangerous Good</SelectLabel>
                                {dangerousGoods.map((goods) => (
                                  <SelectItem value={goods} key={goods}>
                                    {goods}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.dangerousGoods ? (
                            <p className="text-error-color text-error-msg">
                              {errors.dangerousGoods.message}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="warrantyType"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col space-y-3">
                          <Label htmlFor="warrantyType" className="text-xl">
                            Warranty Type
                          </Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select warranty type" />
                            </SelectTrigger>
                            <SelectContent className="h-[120px]">
                              <SelectGroup>
                                <SelectLabel>Warranty Type</SelectLabel>
                                {warrantyType.map((type) => (
                                  <SelectItem value={type} key={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.dangerousGoods ? (
                            <p className="text-error-color text-error-msg">
                              {errors.dangerousGoods.message}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="warrantyPeriod"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col space-y-3">
                          <Label htmlFor="warrantyPeriod" className="text-xl">
                            Warranty Period
                          </Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent className="h-[120px]">
                              <SelectGroup>
                                <SelectLabel>Warranty Period</SelectLabel>
                                {Array.from({ length: 18 }).map((_, index) => (
                                  <SelectItem
                                    value={`${index + 1}`}
                                    key={index + 1}
                                  >
                                    {index + 1}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.warrantyPeriod ? (
                            <p className="text-error-color text-error-msg">
                              {errors.warrantyPeriod.message}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="warrantyPolicy" className="text-xl">
                      Warranty Policy
                    </Label>
                    <Textarea
                      className="h-[250px]"
                      {...register("warrantyPolicy")}
                      placeholder="Your return policy or Warranty Reclaim steps."
                      id="warrantyPolicy"
                    />
                    {errors.warrantyPolicy ? (
                      <p className="text-error-color text-error-msg">
                        {errors.warrantyPolicy.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="variant-info">
              <Card>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="country" className="text-xl">
                        Variants
                      </Label>
                      <Button
                        type="button"
                        className="bg-secondary-color"
                        onClick={() => handleAppendVariant()}
                      >
                        <Plus />
                      </Button>
                    </div>
                    {errors.variants?.root ? (
                      <p className="text-error-color text-error-msg">
                        {errors.variants.root.message}
                      </p>
                    ) : (
                      ""
                    )}
                    {variantFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex w-full border border-light-tan rounded mb-4 overflow-x-scroll"
                      >
                        <div className="flex-1">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Color</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Controller
                                    name={`variants.${index}.color`}
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Select Color" />
                                        </SelectTrigger>
                                        <SelectContent className="h-[200px]">
                                          <SelectGroup>
                                            <SelectLabel>Colors</SelectLabel>
                                            {colors.map((color) => (
                                              <SelectItem
                                                value={color}
                                                key={color}
                                              >
                                                {color}
                                              </SelectItem>
                                            ))}
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <Controller
                                    name={`variants.${index}.size`}
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <SelectTrigger className="w-[120px]">
                                          <SelectValue placeholder="Select Size" />
                                        </SelectTrigger>
                                        <SelectContent className="h-[200px]">
                                          <SelectGroup>
                                            <SelectLabel>Sizes</SelectLabel>
                                            {sizes.map((size) => (
                                              <SelectItem
                                                value={size}
                                                key={size}
                                              >
                                                {size}
                                              </SelectItem>
                                            ))}
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <Input
                                    type="number"
                                    {...register(`variants.${index}.price`)}
                                    placeholder="Price"
                                  />
                                </TableCell>

                                <TableCell>
                                  <Input
                                    type="number"
                                    {...register(`variants.${index}.stock`)}
                                    placeholder="Stock"
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Availability</TableHead>
                                <TableHead>Package Weight (by kg)</TableHead>
                                <TableHead>Package Length</TableHead>
                                <TableHead>Variant Image (only one)</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Input
                                    type="checkbox"
                                    {...register(
                                      `variants.${index}.availability`
                                    )}
                                    defaultChecked={field.availability}
                                    className="w-10 h-5"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    {...register(
                                      `variants.${index}.packageWeight`
                                    )}
                                    placeholder="Weight"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="text"
                                    {...register(
                                      `variants.${index}.packageLength`,
                                      { required: false }
                                    )}
                                    placeholder="l x b x h"
                                  />
                                </TableCell>
                                <TableCell>
                                   
                                     <Controller
                                     control={control}
                                     name={`variantImages.${index}`}
                                     render={({ field }) => (
                                       <Input
                                       type="file"
                                       accept="image/*"
                                       onChange={(e) => {
                                         const file = e.target.files?.[0];
                                         field.onChange(file);
                                        }}
                                        />
                                      )}
                                      />
                                  {errors.variantImages?.[index] && (
                                    <p className="text-error-color text-error-msg">
                                    {
                                      errors.variantImages[index]
                                      ?.message as string
                                    }
                                    </p>
                                  )}
                            
                                
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="flex items-center justify-center px-4 border-l">
                          <Button
                            type="button"
                            className="bg-secondary-color"
                            onClick={() => {
                              handleRemoveVariant(index);
                            }}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-secondary-color hover:cursor-pointer w-[300px]"
                    >
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </DashboardHeader>
  );
}