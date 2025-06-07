import { useGetCategoryTree } from "@/hooks/category.hooks";
import React from "react";
import CategoryItem from "../DropDown/category-dropdown";

interface CategoryTreeProps {
  variant: "card" | "navbar";
}

const CategoryTree = ({ variant }: CategoryTreeProps) => {
  const { data: categories } = useGetCategoryTree({ page: 1, limit: 8 });
  return (
    <>
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
        {
            variant == 'navbar' && (
                <p>Hello</p>
            )
        }
    </>
  );
};

export default CategoryTree;
