import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import {
  useGetAllCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/category.hooks";
import type { Category } from "@/types/category.types";
import {
 type CategorySchemaType,
  updateCategorySchema,
} from "@/validations/category.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export const Route = createFileRoute("/admin/dashboard/categories/(edit)/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { isPending, mutate } = useUpdateCategory();
  const { data: categories } = useGetAllCategory({ page: 0, limit: 0 });
  const { data: category } = useGetCategoryById(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<CategorySchemaType>>({
    values: {
      title: category?.data.title as string,
      parent_category: category?.data.parent_category?._id,
    },
    defaultValues: {
      title: category?.data.title as string,
      parent_category: category?.data.parent_category?._id,
    },
    resolver: zodResolver(updateCategorySchema),
  });
  let optionCategories: Category[] = [];

  if ((categories?.data.length as number) > 0) {
    optionCategories = categories!.data.filter(
      (category) => category._id !== id
    ) as Category[];
  }

  const onSubmit = (data: Partial<CategorySchemaType>) => {
    mutate({id: id, info: data})
  };

  const button = <Link to='/admin/dashboard/categories' className="flex gap-2 items-center hover:underline"><ArrowLeft/> Back</Link>

  return (
    <DashboardHeader header="Edit Category" buttons={[button]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <div className="grid w-[50%] max-md:w-full items-center gap-4">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    {...register("title")}
                    id="title"
                    placeholder="Enter Category title"
                  />
                  {errors.title ? (
                    <p className="text-error-color text-error-msg">
                      {errors.title.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <Controller
                  name="parent_category"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="parent_category">Parent Categories</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Parent Categories</SelectLabel>
                            {optionCategories?.map((category) => (
                              <SelectItem
                                value={category._id}
                                key={category._id}
                              >
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.parent_category ? (
                        <p className="text-error-color text-error-msg">
                          {errors.parent_category.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="bg-secondary-color hover:cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardHeader>
  );
}
