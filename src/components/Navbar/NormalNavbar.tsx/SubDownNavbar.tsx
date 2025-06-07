import CategoryTree from "@/components/Category/CategoryTree";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetCategoryTree } from "@/hooks/category.hooks";
import { upperCase } from "@/utils/helper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AlignCenter, ChevronDown, ChevronRight, Plus } from "lucide-react";
import React from "react";

const SubDownNavbar = () => {

  return (
    <div className="w-full border-b-1 h-space-42 hidden max-940:flex max-sm:px-space-12 min-sm:px-space-42 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium">
            <AlignCenter size={18} />
            All Categories
          </button>
        </PopoverTrigger>

        <PopoverContent side="bottom" className="w-[200px] overflow-y-auto p-space-12 ml-space-12 border-1 rounded-none shadow-none">
          <div className="flex flex-col gap-space-4">
            <CategoryTree variant="card"/>
          </div>
          <div className="px-space-18 pt-space-8 w-full">
              <div className="flex items-center gap-space-4 text-sm">
                <Plus size={14}/>
                <span>More Categories</span>
              </div>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SubDownNavbar;
