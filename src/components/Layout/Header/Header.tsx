import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import Banner1 from "@/assets/images/Banner-1.png";
import Banner0 from "@/assets/images/Banner-0.jpg";
import Banner3 from '@/assets/images/Banner-3.png'; 
import Banner5 from '@/assets/images/Banner-5.jpg';

import  { useRef } from "react";
import { Button } from "@/components/ui/button";
import AutoPlay from 'embla-carousel-autoplay';
import { Separator } from "@/components/ui/separator";
import {  Plus } from "lucide-react";

import CategoryTree from "@/components/Category/CategoryTree";

const bannerInfo = [
    {
      heading: "Experience Quality",
      title: "Without the Premium Price Tag",
      image: Banner5,
      url: "#",
      button_content: "Shop Now"
    },
    {
      heading: "Stay Connected in Style",
      title: "Top Tech & Accessories",
      image: Banner0,
      url: "#",
      button_content: "Browse Gadgets"
    },
    {
      heading: "Elevate Your Everyday Look",
      title: "Minimalist Men's Fashion",
      image: Banner3,
      url: "#",
      button_content: "Shop Men's Wear"
    },
];

const Header = () => {
    const autoPlayRef = useRef(
        AutoPlay({delay: 3000, stopOnInteraction: false})
    )

  return (
    <div className="px-space-24 py-space-24 grid grid-cols-1 min-940:grid-cols-[300px_1fr] gap-space-22 rounded-10 shadow-none">
        <Card className="shadow-sm rounded-none h-full gap-0 max-940:hidden p-0">
          <CardHeader className="py-space-14 px-space-18 gap-space-14">
            <h1 className="text-center">All Category</h1>
          <Separator/>
          </CardHeader>
          <CardContent className="px-space-18 py-0">
            <CategoryTree variant="card"/>
            <div className="px-space-18 pt-space-8 w-full">
              <div className="flex items-center gap-space-4">
                <Plus size={14}/>
                <span>More Categories</span>
              </div>
            </div>
          </CardContent>
        </Card>
      <div className="flex justify-end w-full overflow-x-hidden">
        <div className="w-full">
          <Carousel
            plugins={[autoPlayRef.current]}
            opts={{
              align: "end",
              loop: true,
            }}
            className="overflow-x-hidden"
          >
            <CarouselContent>
              {bannerInfo.map((banner) => (
                <CarouselItem key={banner.title}>
                  <div className="w-full relative h-space-460">
                    <img
                      src={banner.image}
                      className="object-cover w-full inset-0 h-full absolute -z-1"
                    />
                    <div className="w-full h-full flex flex-col max-940:justify-end max-940:items-center gap-space-14 px-space-22 min-940:px-space-58 py-space-22 min-940:py-space-90">
                      <div className="min-sm:w-space-360 max-940:text-center">
                        <h1 className="font-normal text-18 min-940:text-32 ">{banner.heading}</h1>
                        <h2 className="font-bold text-24 min-940:text-40 text-secondary-shade-normal">{banner.title}</h2>
                      </div>
                      <div>
                        <Button className="rounded-none h-space-38 bg-white text-little-dark text-18 font-normal hover:bg-white hover:cursor-pointer hover:text-secondary-shade-normal">
                            {banner.button_content}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Header;
