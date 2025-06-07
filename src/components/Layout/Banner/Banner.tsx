import Payment from "@/assets/SVGImages/Payment";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Handshake, Truck } from "lucide-react";

const Banner = () => {
  return (
    <div className="px-space-24 py-space-24">
      <Card className="rounded-none border-1 shadow-black/10 px-space-24">
        <CardContent className="flex max-940:flex-wrap max-940:gap-space-24 min-940:justify-between items-center">
            <div className="flex items-center h-full gap-space-12">
                <div className="flex items-center  h-full">
                   <Truck size = {34} className="text-secondary-shade-normal"/> 
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-16">FREE DELIVERY</h1>
                    <p className="font-normal text-12">For all the orders over Rs. 1000</p>
                </div>
            </div>
            <div className="flex items-center h-full gap-space-12">
                <div className="flex items-center  h-full">
                   <Payment className="w-space-30 h-space-50 text-secondary-shade-normal"/> 
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-16">SAFE PAYMENT</h1>
                    <p className="font-normal text-12">100% secure payment</p>
                </div>
            </div>
            <div className="flex items-center h-full gap-space-12">
                <div className="flex items-center  h-full">
                   <BadgeCheck className="w-space-30 h-space-50 text-secondary-shade-normal"/> 
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-16">SHOP WITH CONFIDENCE</h1>
                    <p className="font-normal text-12">If goods have problems</p>
                </div>
            </div>
            <div className="flex items-center h-full gap-space-12">
                <div className="flex items-center  h-full">
                   <Handshake className="w-space-30 h-space-50 text-secondary-shade-normal"/> 
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-16">FREINDLY SERVICES</h1>
                    <p className="font-normal text-12">30 day satisfaction guarantee</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Banner;
