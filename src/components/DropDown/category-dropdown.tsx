import type { CategoryTree } from "@/types/category.types";
import { upperCase } from "@/utils/helper";
import { ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "@tanstack/react-router";

const CategoryItem = ({ category }: { category: CategoryTree }) => {
  const hasChildren = category.children!.length > 0;
  return (
      <div className="pl-space-18 py-space-8 border-b-1 w-full last:borde-none">
        <div className="flex justify-between items-center">
            <Link to={`/product/all`} search={{category: category.category.title}} className="hover:text-secondary-shade-normal">
                <span>{upperCase(category.category.title)}</span>
            </Link>
          {hasChildren ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:cursor-pointer hover:text-secondary-shade-normal">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="w-64 p-0 shadow-none rounded-none border-1"
                side="right"
                align="start"
              >
                <div className="flex flex-col gap-space-4">
                  {category.children?.map((child: CategoryTree) => (
                    <div key={child.category._id} className="last:border-none">
                    <CategoryItem key={child.category._id} category={child} />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </div>
  );
};

export default CategoryItem;
