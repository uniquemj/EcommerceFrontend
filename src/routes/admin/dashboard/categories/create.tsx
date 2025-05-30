// import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useCreateCategory, useGetAllCategory } from "@/hooks/category.hooks";
// import {
//   categorySchema,
//   type CategorySchemaType,
// } from "@/validations/category.validate";
// import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
// import { Loader2 } from "lucide-react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Textarea } from "@/components/ui/textarea";
import CategoryForm from "@/components/Form/CategoryForm";

export const Route = createFileRoute("/admin/dashboard/categories/create")({
  component: RouteComponent,
});

function RouteComponent() {
  
  return (
    <>
      <CategoryForm/>
    {/* <DashboardHeader header="Create Category" buttons={[]}>
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
                <Controller name="parent_category" control={control} render={({field}) => (

                  <div className="flex flex-col space-y-3">
                  <Label htmlFor="parent_category">Parent Categories</Label>
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
                  )}
                </div>
            )}/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="bg-primary-color hover:cursor-pointer"
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
    </DashboardHeader> */}
    </>
  );
}
