import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CategoryTree from "@/components/Category/CategoryTree";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import type { SearchProductParams } from "@/types/product.types";

const ProductFilter = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Partial<SearchProductParams>;

  const [minPrice, setMinPrice] = useState(search.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(search.maxPrice || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/product/all",
      search: {
        ...search,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
    });
  };

  return (
    <div className="px-space-24">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-space-2"
        defaultValue="category"
      >
        <AccordionItem value="category" className="border-b-0 border-t-1">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <CategoryTree variant="card" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price" className="border-t-1">
          <AccordionTrigger>Price range</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-space-18">
              <div
                className="flex w-full items-center justify-center gap-space-12"

              >
                <div className="flex flex-col  gap-2">
                  <h1 className="text-12 font-normal">Min</h1>
                  <Input
                    type="number"
                    placeholder="0"
                    className="placeholder:text-ternary-color"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-12 font-normal">Max </h1>
                  <Input
                    type="number"
                    placeholder="999999"
                    className="placeholder:text-ternary-color"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className=" w-full bg-transparent text-secondary-shade-normal border-1 border-secondary-shade-normal rounded-none hover:cursor-pointer hover:bg-secondary-color hover:text-text-color">
                Apply
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilter;
