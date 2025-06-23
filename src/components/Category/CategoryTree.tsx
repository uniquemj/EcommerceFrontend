import { useGetCategoryTree } from "@/hooks/category.hooks";
import React, { useState } from "react";
import CategoryItem from "../DropDown/category-dropdown";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface CategoryTreeProps {
  variant: "card" | "navbar";
}

const CategoryTree = ({ variant }: CategoryTreeProps) => {
  const [limit, setLimit] = useState(7);
  const { data: categories } = useGetCategoryTree({ page: 1, limit: limit });

  const handleClick = () => {
    setLimit((prev) => prev + 8);
  };
  return (
    <>
      <Link to={'/product/all'}>
        <div className="pl-space-18 py-space-8 border-b-1 px-space-18 pt-space-8 w-full group/category hover:cursor-pointer">
          <div className="flex items-center gap-space-4">
            <span className="group-hover/category:text-secondary-shade-normal">
              All
            </span>
          </div>
        </div>
      </Link>
      {variant == "card" &&
        categories?.data.map(
          (cat) => <CategoryItem key={cat.category._id} category={cat} />
          // <div className="px-space-18 py-space-8 border-b-1 w-full">
          //   <div className="flex justify-between">
          //     <span>{upperCase(cat.category.title)}</span>
          //     <DropdownMenu>
          //       <DropdownMenuTrigger asChild>
          //         <ChevronRight/>
          //       </DropdownMenuTrigger>
          //     </DropdownMenu>
          //   </div>
          // </div>
        )}
      <div
        className="px-space-18 py-space-12 w-full group/category hover:cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-space-4">
          <Plus
            size={14}
            className="group-hover/category:text-secondary-shade-normal"
          />
          <span className="group-hover/category:text-secondary-shade-normal">
            More Categories
          </span>
        </div>
      </div>
      {variant == "navbar" && <p>Hello</p>}
    </>
  );
};

export default CategoryTree;
