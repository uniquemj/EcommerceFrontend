import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerificationStatus, type SellerProfileInfo } from "@/types/user.types";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import DashboardHeader from "../Layout/DashboardHeader/DashboardHeader";
import { InfoSeller } from "../Card/InfoSeller";

interface HideState {
  status: boolean;
  url: string;
}

const SellerProfile = ({
  heading,
  profileInfo,
  buttons,
}: {
  heading: string;
  profileInfo: Partial<SellerProfileInfo>;
  buttons: React.ReactNode[];
}) => {
  const [hide, setHide] = useState<HideState>({ status: true, url: "" });
  const { role } = useAuth();

  const handleImage = (url: string) => {
    setHide((prev: HideState) => ({ status: !prev.status, url: url }));
  };
  return (
    <DashboardHeader header={heading} buttons={buttons}>
      <Card className="p-6 shadow-md">
        {/* Profile Header */}
        <div className="w-full flex flex-col items-center gap-4 mb-6">
          <Avatar className="w-32 h-32 min-[1200px]:w-40 min-[1200px]:h-40 border-2 border-primary/20">
            <AvatarImage
              src={profileInfo.avatar as string}
              alt={profileInfo.fullname}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-semibold text-primary bg-primary/10">
              {profileInfo.initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profileInfo.fullname}
            </h1>
            <p className="text-gray-500">{profileInfo.email}</p>

            <Badge
              className={`mt-2 text-sm font-medium ${
                profileInfo.verification_status === VerificationStatus.PENDING
                  ? "bg-amber-100 text-amber-800"
                  : profileInfo.verification_status ===
                      VerificationStatus.VERIFIED
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {profileInfo.verification_status?.toUpperCase()}
            </Badge>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Profile Details */}
        <CardContent className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSeller
              label="Store Name"
              value={profileInfo.store_name as string}
            />
            <InfoSeller
              label="Phone Number"
              value={profileInfo.phone_number as string}
            />
            <InfoSeller label="City" value={profileInfo.city as string} />
            <InfoSeller label="Country" value={profileInfo.country as string} />
            <InfoSeller
              label="Address"
              value={profileInfo.address as string}
              className="md:col-span-2"
            />
          </div>
        </CardContent>

        <Separator className="my-4" />

        {/* Legal Documents */}
        <CardFooter className="flex flex-col gap-6">
          <div className="w-full">
            <h2 className="text-lg font-semibold text-center mb-4 pb-2 border-b">
              Legal Documents
            </h2>

            <div
              className={`grid gap-4 ${
                role === UserRole.ADMIN
                  ? "grid-cols-1 min-[1185px]:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {profileInfo.legal_documents?.map((image) => (
                <div
                  key={image._id}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleImage(image.url)}
                >
                  <img
                    src={image.url}
                    alt="Legal Document"
                    className="w-full h-48 object-contain bg-gray-50 p-2"
                  />
                </div>
              ))}
            </div>

            {/* Image Modal */}
            {!hide.status && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
                  <div className="flex justify-end p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleImage("")}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-4 overflow-auto">
                    <img
                      src={hide.url}
                      alt="Enlarged Document"
                      className="w-full object-contain max-h-[70vh]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rejection Reason */}
          {profileInfo.verification_status === VerificationStatus.REJECTED &&
            role === UserRole.SELLER && (
              <div className="w-full space-y-2">
                <h3 className="font-semibold text-red-600">Rejection Reason</h3>
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-gray-700">
                    {profileInfo.rejection_reason}
                  </p>
                </div>
              </div>
            )}
        </CardFooter>
      </Card>
    </DashboardHeader>
  );
};

export default SellerProfile;
