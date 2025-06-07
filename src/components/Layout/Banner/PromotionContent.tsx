import React from "react";
import PromotionLayout from "@/components/Layout/Banner/PromotionLayout";
import Promotion1 from "@/assets/images/Promotion-1.jpg";
import Promotion2 from "@/assets/images/Promotion-5.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const contents = [
  {
    image: Promotion1,
    content: "Top Trending Furniture Products.",
    description: "Upgrade your space with our best-selling modern furniture picks of the season.",
    button_content: "Explore now"
  },
  {
    image: Promotion2,
    content: "Next-Gen Gaming Start's Here.",
    description: "Get your hands on the PlayStation 5 console and dive into the future of gaming.",
    button_content: "Shop now"
  },
];

const PromotionContent = () => {
  return (
    <PromotionLayout>
      {contents.map((promo) => (
        <div className="w-full relative px-space-24 py-space-24 bg-white/40">
          <img src={promo.image} className="w-full inset-0 -z-1 h-full object-cover absolute"/>
          <div className="flex flex-col h-full justify-center gap-3">
            <h1 className="max-sm:text-18 text-32 font-bold w-space-320 leading-space-32 text-secondary-shade-dark ">{promo.content}</h1>
            <p className="max-sm:text-12 w-space-220">{promo.description}</p>
            <Button variant={"outline"} className="max-sm:w-space-120 w-space-220 flex items-center border-secondary-color hover:bg-transparent hover:text-secondary-color bg-secondary-color text-white hover:cursor-pointer rounded-none">
                {promo.button_content}
                <ArrowRight size={16}/>
            </Button>
          </div>
        </div>
      ))}
    </PromotionLayout>
  );
};

export default PromotionContent;
