import { useGetSellerProfile } from "@/hooks/seller.hooks";
import { useSellerState } from "@/store/seller.store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/seller/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: seller } = useGetSellerProfile();
  const { setIsVerified } = useSellerState();

  useEffect(() => {
    if (seller) {
      setIsVerified(seller?.data.is_verified);
    }
  }, [seller]);

  return (
    <div>
      <h1>Hello '/seller/dashboard'</h1>
    </div>
  );
}
