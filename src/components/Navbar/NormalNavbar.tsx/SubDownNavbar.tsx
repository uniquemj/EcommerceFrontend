import { Badge } from "@/components/ui/badge";
import { useGetCategoryTree } from "@/hooks/category.hooks";
import { upperCase } from "@/utils/helper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

const SubDownNavbar = () => {
  const { data: categories } = useGetCategoryTree();

  return (
    <div className="w-full border-b-1 h-space-42 hidden max-940::flex justify-center items-center">
      <div className="flex w-3/5 items-center justify-center gap-4 ">
        
      </div>
    </div>
  );
};

export default SubDownNavbar;
