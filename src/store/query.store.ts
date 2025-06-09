// import type { SearchProductParams } from '@/types/product.types'
// import {create} from 'zustand'

// interface SearchQueryParams extends SearchProductParams{
//     setKeyword: (keyword: string) => void;
//     setCategory: (category: string) => void;
//     setMinPrice: (minPrice: string) => void;
//     setMaxPrice: (maxPrice: string) => void;
//     setSortBy: (sortBy: string) => void;
//     setPage: (page: number)=>void;
//     setLimit: (limit: number)=>void;
// }

// export const useSearchQuery = create<SearchQueryParams>((set)=>({
//     keyword: "",
//     setKeyword: (keyword: string)=>set(()=>({keyword})),
//     category: "",
//     setCategory: (category: string)=>set(()=>({category})),
//     minPrice: "",
//     setMinPrice: (minPrice: string) => set(()=>({minPrice})),
//     maxPrice: "",
//     setMaxPrice: (maxPrice: string)=>set(()=>({maxPrice})),
//     sortBy: "",
//     setSortBy: (sortBy: string) => set(()=>({sortBy})),
//     page: 1,
//     setPage:(page:number)=>set(()=>({page})),
//     limit: 10,
//     setLimit: (limit: number)=>set(()=>({limit}))
// }))