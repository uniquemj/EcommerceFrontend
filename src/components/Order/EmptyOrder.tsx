import React from "react";
import NoOrder from "@/assets/images/NoOrder.png";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

interface EmptyOrderProps {
  text: string,
  wantButton: boolean
}
const EmptyOrder = ({text, wantButton}:EmptyOrderProps) => {
  return (
    <div className="flex flex-col items-center gap-space-20 w-full h-full">
      <div className="w-3/5">
        <img src={NoOrder} />
      </div>
      <h1 className="text-18 font-semibold">{text}</h1>
      {wantButton && 
      <div>
        <Link to='/product/all'>
        <Button className="rounded-none bg-secondary-color text-text-color border-1 border-secondary-color hover:bg-transparent hover:text-secondary-color hover:cursor-pointer">
            Keep Exploring
        </Button>
        </Link>
      </div>
      }
    </div>
  );
};

export default EmptyOrder;
