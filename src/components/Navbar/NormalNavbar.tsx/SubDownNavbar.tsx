import CategoryTree from "@/components/Category/CategoryTree";
import ProductFilter from "@/components/Product/ProductFilter";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useRouterState } from "@tanstack/react-router";
import { AlignCenter, SlidersHorizontal } from "lucide-react";

const SubDownNavbar = () => {
  const route = useRouterState()
  const isProductPage = route.location.pathname.includes('/all')

  return (
    <div className="w-full justify-between border-b-1 h-space-42 hidden max-940:flex max-sm:px-space-12 min-sm:px-space-42 items-center">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 text-sm font-medium">
              <AlignCenter size={18} />
              All Categories
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            className="w-[200px] overflow-y-auto p-space-12 ml-space-12 border-1 rounded-none shadow-none"
          >
            <div className="flex flex-col gap-space-4">
              <CategoryTree variant="card" />
            </div>
          </PopoverContent>
        </Popover>
      </div>
     {isProductPage && <div>
        <Sheet>
          <SheetTrigger>
            <button className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal size={18}/>
            <h1>Filter</h1>
            </button>
          </SheetTrigger>
          <SheetContent className="py-space-42">
            <ProductFilter/>
          </SheetContent>
        </Sheet>
      </div>}
    </div>
  );
};

export default SubDownNavbar;
