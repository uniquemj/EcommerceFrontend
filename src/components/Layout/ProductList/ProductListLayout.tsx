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
import { useSearch } from "@tanstack/react-router";
import type { SearchProductParams } from "@/types/product.types";

interface ProductListLayoutProps {
  children: React.ReactNode;
  heading: string;
  category?: string;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductListLayout = ({
  children,
  heading,
  category,

  currentPage,
  totalPages,
  onPageChange,
}: ProductListLayoutProps) => {
  const search = useSearch({ strict: false }) as SearchProductParams;

  const handlePeviousPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    onPageChange(index + 1);
  };
  return (
    <div className="grid grid-cols-1 min-940:grid-cols-[240px_1fr] gap-space-18 min-940:px-space-24 min-940:py-space-38">
      <div className="max-940:hidden w-full h-full">
        <ProductFilter />
      </div>
      <div className="h-auto">
        <div className="rounded-none p-0 shadow-none border-1 w-full h-full overflow-y-auto px-space-24 py-space-12">
          <div className="flex justify-start w-full px-0">
            {Object.keys(search).length ? (
              <h1 className="max-sm:text-18 text-32 font-bold text-secondary-shade-dark">
                {`Search For "${search.category || search.keyword} "`}
              </h1>
            ) : (
              <h1 className="max-sm:text-18 text-32 font-bold text-secondary-shade-dark">
                {heading}
              </h1>
            )}
          </div>
          <div className="flex  max-sm:gap-space-14 gap-space-38 max-940:px-space-24 min-940:py-space-24 flex-wrap">
            {children}
          </div>
        </div>
        <div className=" w-full flex justify-end items-center py-space-8">
          <Pagination className="flex justify-end items-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handlePeviousPage}
                  className={
                    currentPage === 1
                      ? "opacity-50 pointer-events-none cursor-default"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => handlePageClick(i, e)}
                    className={
                      currentPage === i + 1
                        ? "border-1 border-secondary-shade-light"
                        : ""
                    }
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleNextPage}
                  className={
                    currentPage === 1
                      ? "opacity-50 pointer-events-none cursor-default"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductListLayout;
