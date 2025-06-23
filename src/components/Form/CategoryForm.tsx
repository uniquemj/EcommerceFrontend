
import { useForm, Controller } from "react-hook-form";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCreateCategory, useGetAllCategory } from "@/hooks/category.hooks";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  categorySchema,
  type CategorySchemaType,
} from "@/validations/category.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import {Loader2, Plus } from "lucide-react";
import CategoryCombobox from "../Combobox/CategoryCombobox";
import type { Category } from "@/types/category.types";
import DashboardHeader from "../Layout/DashboardHeader/DashboardHeader";
import { Card, CardContent, CardFooter } from "../ui/card";
// import CategoryCombobox from "../Combobox/CategoryCombobox";
// import type { Category } from "@/types/category.types";


const CategoryForm = () => {
  const { isPending, mutate } = useCreateCategory();
  const { isLoading, data: categories } = useGetAllCategory({ page: 0, limit: 0 });

  // let optionCategories:Category[] = []

  // if(categories?.data.length as number > 0){
  //   optionCategories = categories?.data.filter()
  // }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategorySchemaType) => {
    console.log(data);
    mutate(data);
  };
  return (
    <>
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-secondary-color hover:cursor-pointer">
            <Plus /> Category
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col z-[99] overflow-visible">
          <SheetHeader>
            <SheetTitle>Create Category</SheetTitle>
            <SheetDescription>Provide Category Information</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid gap-7 px-3">
              <div className="grid w-full gap-4">
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
                    <CategoryCombobox categories={categories?.data as Category[]} isLoading={isLoading} value={field.value as string} onChange={field.onChange}/> */}
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[250px]">
                        <SelectGroup>
                          <SelectLabel>Parent Categories</SelectLabel>

                          {categories?.data.map((category) => (
                            <SelectItem value={category._id} key={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}
                    {/* {errors.parent_category ? (
                      <p className="text-primary-color text-error-msg">
                        {errors.parent_category.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
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
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet> */}

      <DashboardHeader header="Create Category" buttons={[]} backurl="/admin/dashboard/categories">
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
                    <p className="text-primary-color text-error-msg">
                      {errors.title.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
    

                  <div className="flex flex-col space-y-3">
                           <Controller
                name="parent_category"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="parent_category">Parent Categories</Label>
                    <CategoryCombobox categories={categories?.data as Category[]} isLoading={isLoading} value={field.value as string} onChange={field.onChange}/>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[250px]">
                        <SelectGroup>
                          <SelectLabel>Parent Categories</SelectLabel>

                          {categories?.data.map((category) => (
                            <SelectItem value={category._id} key={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}
                     {errors.parent_category ? (
                      <p className="text-primary-color text-error-msg">
                        {errors.parent_category.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
                  {/* <Label htmlFor="parent_category">Parent Categories</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Parent Categories</SelectLabel>
                        {
                          categories?.data.map((category)=>(
                            <SelectItem value={category._id} key={category._id}>{category.title}</SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.parent_category ? (
                    <p className="text-primary-color text-error-msg">
                      {errors.parent_category.message}
                    </p>
                  ) : (
                    ""
                  )} */}
                </div>
           
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className=" hover:cursor-pointer rounded-none bg-secondary-color border-1 border-secondary-color hover:bg-transparent hover:text-secondary-color"
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
    </>
  );
};

export default CategoryForm;
