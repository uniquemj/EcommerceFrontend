import ProductFilter from "@/components/Product/ProductFilter";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { strict } from "assert";
import { useSearch } from "@tanstack/react-router";
import { SearchProductParams } from "@/types/product.types";

interface ProductListLayoutProps {
  children: React.ReactNode;
  heading: string;
  category?: string;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number)=>void;
}

const ProductListLayout = ({
  children,
  heading,
  category,

  currentPage,
  totalPages,
  onPageChange
}: ProductListLayoutProps) => {

  const search = useSearch({strict: false}) as SearchProductParams

  const handlePeviousPage = (e: React.FormEvent) =>{
    e.preventDefault();
    if(currentPage > 1) onPageChange(currentPage -1);
  }

  const handleNextPage = (e:React.FormEvent) =>{
    e.preventDefault();
    if(currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const handlePageClick = (index:number, e:React.FormEvent) =>{
    e.preventDefault();
    onPageChange(index+1)
  }
  return (
    <div className="grid grid-cols-1 min-940:grid-cols-[240px_1fr] gap-space-18 min-940:px-space-24 min-940:py-space-38">
      <div className="max-940:hidden w-full h-full">
        <ProductFilter />
      </div>
      <div className="">
        <Card className="rounded-none p-0 shadow-none border-1 w-full h-full overflow-y-auto px-space-12 py-space-12">
          <CardHeader className="flex justify-start w-full">
            {Object.keys(search).length ? (
              <h1 className="text-32 font-bold text-secondary-shade-dark">
                {`Search For "${search.category || search.keyword} "`}
              </h1>
            ) : (
              <h1 className="text-32 font-bold text-secondary-shade-dark">
                {heading}
              </h1>
            )}
          </CardHeader>
          <CardContent className="flex gap-space-24 min-940:py-space-24 flex-wrap">
            {children}
          </CardContent>
        </Card>
        <div className="w-full flext justify-end items-center py-space-8">
          <Pagination className="felx justify-end items-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={handlePeviousPage} className={currentPage === 1 ? 'opacity-50 pointer-events-none cursor-default' : ''}/>
              </PaginationItem>
              {
                Array.from({length: totalPages}).map((_, i)=>(
                <PaginationItem key={i}>
                  <PaginationLink href="#" onClick={(e)=>handlePageClick(i, e)} className={currentPage === i + 1 ? 'border-1 border-secondary-shade-light': ''}>1</PaginationLink>
                </PaginationItem>
                ))
              }
              <PaginationItem>
                <PaginationNext href="#"  onClick={handleNextPage} className={currentPage === 1 ? 'opacity-50 pointer-events-none cursor-default' : ''} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductListLayout;
