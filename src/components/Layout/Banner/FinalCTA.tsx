import React from "react";
import Final from '@/assets/images/Final.jpg'
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const FinalCTA = () => {
  return (
  <div className="w-full h-space-288 relative">
    <div className="px-space-24 py-space-24 flex items-center justify-center h-full bg-black/10">
        <img src={Final} className="-z-1 absolute inset-0 object-cover h-full w-full"/>
        <div className="flex items-center gap-space-10 flex-col justify-center h-full bg-white/50 px-space-50 py-space-24">
            <h1 className="max-sm:text-20 text-32 font-bold text-center text-secondary-shade-dark">Explore More Products</h1>
            <p className="max-sm:text-12 text-center text-14">
                We have hundreds of items waiting for you.
            </p>
            <Link to="/product/all">
            <Button className="rounded-none max-sm:px-space-18 px-space-24 max-sm:py-space-18 py-space-24 hover:bg-transparent hover:cursor-pointer border-1  bg-secondary-color border-secondary-color ">
                View All Products
            </Button>
            </Link>
        </div>
    </div>
  </div>
  )
};

export default FinalCTA;
