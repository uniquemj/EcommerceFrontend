import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerificationStatus, type SellerProfileInfo } from "@/types/user.types";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";
import { useState } from "react";
import { X } from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import DashboardHeader from "../Layout/DashboardHeader/DashboardHeader";

interface HideState {
  status: boolean;
  url: string;
}

const SellerProfile = ({
  heading,
  profileInfo,
  buttons
}: {
  heading: string;
  profileInfo: Partial<SellerProfileInfo>;
  buttons: React.ReactNode[]
}) => {
  const [hide, setHide ] = useState<HideState>({ status: true, url: "" });
  const { role } = useAuth();

  const handleImage = (url: string) => {
    setHide((prev: HideState) => ({ status: !prev.status, url: url }));
  };
  return (
    <DashboardHeader header={heading} buttons={buttons}>
      <Card className="p-5">
        <div className="w-full flex flex-col items-center gap-6">
          <Avatar className="max-[1200px]:w-[60%] w-[15%] h-auto flex justify-center items-center">
            <AvatarImage
              src={profileInfo.avatar as string}
              alt={profileInfo.initials}
            />
            <AvatarFallback className="rounded-lg text-primary-color font-semibold">
              {profileInfo.initials}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <div className="flex flex-col space-y-1 items-center">
              <h1 className="text-xl min-[460px]:text-2xl font-semibold text-center">
                {profileInfo.fullname}
              </h1>
              <h1 className="text-sm min-[460px]:text-md font-medium text-gray-400">
                {profileInfo.email}
              </h1>
              <Badge className={`${profileInfo.verification_status == VerificationStatus.PENDING ? `bg-light-tan text-text-color` : profileInfo.verification_status == VerificationStatus.VERIFIED ? `bg-success-color text-text-color`: `bg-error-color text-text-color`} mt-2`}>
                {profileInfo.verification_status?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <Separator />
        <CardContent className="w-full flex flex-col justify-center items-center">
          <div className=" w-full min-[550px]:w-4/5 min-[950px]:w-2/5 flex flex-col justify-center items-center gap-10">
            <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
              <h1 className="w-[50%] max-[365px]:text-sm font-semibold text-left">
                Store Name:
              </h1>
              <h2 className="w-[50%] max-[365px]:text-sm  font-medium text-right">
                {profileInfo.store_name}
              </h2>
            </div>

            <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
              <h1 className="w-[50%] max-[365px]:text-sm font-semibold text-left">
                City:
              </h1>
              <h2 className="w-[50%] max-[365px]:text-sm  font-medium text-right">
                {profileInfo.city}
              </h2>
            </div>

            <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
              <h1 className="w-[50%] max-[365px]:text-sm font-semibold text-left">
                County:
              </h1>
              <h2 className="w-[50%] max-[365px]:text-sm  font-medium text-right">
                {profileInfo.country}
              </h2>
            </div>

            <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
              <h1 className="w-[50%] max-[365px]:text-sm font-semibold text-left">
                Address:
              </h1>
              <h2 className="w-[50%] max-[365px]:text-sm  font-medium text-right">
                {profileInfo.address}
              </h2>
            </div>

            <div className="flex w-full justify-center max-[450px]:gap-5 gap-10">
              <h1 className="w-[50%] max-[365px]:text-sm font-semibold text-left">
                Phone Number:
              </h1>
              <h2 className="w-[50%] max-[365px]:text-sm  font-medium text-right">
                {profileInfo.phone_number}
              </h2>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className={`w-full ${role==UserRole.SELLER && `grid min-[1185px]:grid-cols-2 gap-10`}`}>
          <div className={`flex flex-col ${role==UserRole.SELLER && `w-4/5`}`}>
            <h1 className="text-xl font-semibold text-center bg-amber-200">
              Legal Documents:
            </h1>
            <div
              className={
                role == UserRole.ADMIN
                  ? `grid grid-cols-1 min-[1185px]:grid-cols-2 items-center justify-center gap-10`
                  : `grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-10`
              }
            >
              {profileInfo.legal_documents?.map((image) => (
                <div
                  key={image._id}
                  className={
                    role == UserRole.ADMIN
                      ? `min-[514px]:w-[350px]`
                      : `w-[150px]`
                  }
                  onClick={() => handleImage(image.url)}
                >
                  <img src={image.url} />
                </div>
              ))}

              {
                !hide.status ? (
                    <div className={`w-[100%] p-10 bg-[rgba(0,0,0,0.5)] absolute z-99 flex flex-col justify-center items-center ${ role == UserRole.ADMIN ? `top-200 min-[1180px]:top-150 left-1`: `top-150 min-[1180px]:top-90 left-1`} gap-8`}>
                        <div className="w-full flex justify-end">
                            <Button className="bg-secondary-color text-amber-50 hover:cursor-pointer" onClick={()=>handleImage("")}>
                                <X className=" font-bold"/>
                            </Button>
                        </div>
                        <img src={hide.url} className="w-[500px]"/>
                    </div>
                ): null
              }
            </div>
          </div>
            {profileInfo.verification_status == VerificationStatus.REJECTED && role== UserRole.SELLER?
                <div className="flex flex-col h-full gap-3">
                <h1 className="font-bold text-primary-color">Rejection Reason</h1>
                <textarea readOnly className="border border-red-500 p-4">{profileInfo.rejection_reason}</textarea>
            </div>: null}
        </CardFooter>
      </Card>
    </DashboardHeader>
  );
};

export default SellerProfile;
