import DashboardHeader from "@/components/Layout/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import { useAddBusinessInfo } from "@/hooks/seller.hooks";
import {
  BusinessInfoSchema,
  type BusinessInfoType,
} from "@/validations/seller.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Image } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/seller/dashboard/business-information")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BusinessInfoType>({
    resolver: zodResolver(BusinessInfoSchema),
    defaultValues: {
      legal_document: [],
      store_logo: []
    }
  });

  const {
    isPending, mutate
  } = useAddBusinessInfo()

  const [legalDocsPreview, setLegalDocsPreview] = useState<string[]>([])

  const legalDocs = watch("legal_document");
  const storeLogoDocs = watch("store_logo");

  const handleLegalDocsChange = (index: number, file?: File) =>{
    const updatedFiles = [...(legalDocs || [])];
    updatedFiles[index] = file!;
    setValue("legal_document", updatedFiles.filter(Boolean), {shouldValidate: true})

    const previewUrls = [...(legalDocsPreview || [])]
    previewUrls[index] = file ? URL.createObjectURL(file): ""
    setLegalDocsPreview(previewUrls)
  }

  const onSubmit = (data: BusinessInfoType) => {
    mutate(data)
  };

  if(isPending) return <Spinner/>
  return (
    <DashboardHeader header="Add Business Information" buttons={[]}>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="city">Store City</Label>
                  <Input
                    type="text"
                    {...register("city")}
                    id="city"
                    placeholder="Your Store City"
                  />
                  {errors.city ? (
                    <p className="text-error-color text-error-msg">
                      {errors.city.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="country">Store Country</Label>
                  <Input
                    type="text"
                    {...register("country")}
                    id="country"
                    placeholder="Your Store Country"
                  />
                  {errors.country ? (
                    <p className="text-error-color text-error-msg">
                      {errors.country.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="address">Store Address</Label>
                  <Input
                    type="text"
                    {...register("address")}
                    id="address"
                    placeholder="Your Store Address"
                  />
                  {errors.address ? (
                    <p className="text-error-color text-error-msg">
                      {errors.address.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>



                <div className="flex flex-col space-y-3">
                  <Label htmlFor="country">Phone Number</Label>
                  <Input
                    type="text"
                    {...register("phone_number")}
                    id="country"
                    placeholder="Your Phone Number"
                  />
                  {errors.phone_number ? (
                    <p className="text-error-color text-error-msg">
                      {errors.phone_number.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="citizenship">Upload Your CitizenShip</Label>
                  <Input
                    type="file"
                    id="citizenship"
                    onChange={(e) =>
                      handleLegalDocsChange(0, e.target.files?.[0])
                    }
                    className="min-[900px]:w-3/4"
                  />
                  <div className="bg-gray-200 w-[100px] p-4 rounded-xl">
                    {legalDocsPreview[0] ? (
                      <img src={legalDocsPreview[0]} />
                    ):<Image/>}
                  </div>
                  {errors.legal_document ? (
                    <p className="text-error-color text-error-msg">
                      {errors.legal_document.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="pancard">Upload Your Pan Card</Label>
                  <Input
                    type="file"
                    id="pancard"
                    onChange={(e) =>
                      handleLegalDocsChange(1, e.target.files?.[0])
                    }
                    className="min-[900px]:w-3/4"
                  />
                  <div className="bg-gray-200 w-[100px] p-4 rounded-xl">
                    {legalDocsPreview[1] ? (
                      <img src={legalDocsPreview[1]} />
                    ):<Image/>}
                  </div>
                  {errors.legal_document ? (
                    <p className="text-error-color text-error-msg">
                      {errors.legal_document.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="store_logo">Upload Your Store Logo</Label>
                <Input
                  type="file"
                  id="store_logo"
                  onChange={(e) =>
                    setValue("store_logo", [e.target.files?.[0] as File], {
                      shouldValidate: true,
                    })
                  }
                  className="min-[900px]:w-[37%]"
                />
                <div className="bg-gray-200 w-[100px] p-4 rounded-xl">
                  {storeLogoDocs?.length ? (
                    <img src={URL.createObjectURL(storeLogoDocs[0])} />
                  ) : (
                    <Image />
                  )}
                </div>
                {errors.store_logo ? (
                  <p className="text-error-color text-error-msg">
                    {errors.store_logo.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-secondary-color hover:cursor-pointer">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardHeader>
  );
}
