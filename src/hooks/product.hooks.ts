import { archieveProduct, createProduct, deleteProduct, editProduct, editProductVariant, getAllProductList, getBestSellProducts, getFeaturedProducts, getProductByCategory, getProductById, getProductCount, getProductList, getSellerBestSellProducts, getSellerProductById, getSellerProductCount, getSellerProductList, getSellerTotalSale, getVariantById, getVariantListOfProduct, removeVariantFromProduct, searchProduct, unarchieveProduct } from "@/services/product.api"
import type { PaginationField } from "@/types/pagination.types"
import { type ProductInfo, type SearchProductParams, type SearchProductResponse } from "@/types/product.types"
import { type SuccessResponse, type ErrorResponse } from "@/types/response.types"
import { type VariantInfo} from "@/types/variant.types"
import type { ProductSchemaType } from "@/validations/product.validate"
import type { UpdateVariant } from "@/validations/variants.validate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import toast from "react-hot-toast"

// For Admin
export const useGetAllProducts = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products', 'admin'],
        queryFn: ()=>getAllProductList(pagination)
    })
}

// For Seller
export const useGetSellerProductList = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products', 'seller'],
        queryFn: ()=>getSellerProductList(pagination)
    })
}

export const useGetSellerProductById = (id: string) =>{
    return useQuery<SuccessResponse<ProductInfo>, ErrorResponse>({
        queryKey: ['products', 'seller', id],
        queryFn: ()=> getSellerProductById(id)
    })
}

export const useGetSellerProductCount = () =>{
    return useQuery<SuccessResponse<number>, ErrorResponse>({
        queryKey: ['products', 'seller', 'count'],
        queryFn: ()=> getSellerProductCount()
    })
}

export const useGetVariantListOfProduct = (id: string) =>{
    return useQuery<SuccessResponse<VariantInfo[]>, ErrorResponse>({
        queryKey: ['products', id, 'variants'],
        queryFn: ()=>getVariantListOfProduct(id)
    })
}

// For Customer
export const useGetProductList = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products'],
        queryFn: ()=>getProductList(pagination)
    })
}

export const useGetProductById = (id: string) =>{
    return useQuery<SuccessResponse<ProductInfo>, ErrorResponse>({
        queryKey: ['products', id],
        queryFn: ()=> getProductById(id)
    })
}

export const useSearchProducts = (params: Partial<SearchProductParams>) =>{
    const searchParams = useSearch({strict: false}) as Partial<SearchProductParams>
    const filterParams = {...searchParams, ...params}

    return useQuery<SuccessResponse<SearchProductResponse>, ErrorResponse>({
        queryKey: ['products', searchParams],
        queryFn: ()=>searchProduct(filterParams),
        staleTime: 1000 * 60
    })
}

export const useGetProductByCategory = (categoryId: string, params: PaginationField) => {
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products','category', categoryId, params],
        queryFn: ()=>getProductByCategory(categoryId, params),
        enabled: !!categoryId
    })
}


export const useGetBestSellProducts = (query: SearchProductParams) => {
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products', 'best', 'sell'],
        queryFn: ()=> getBestSellProducts(query)
    })
}

export const useGetFeaturedProducts = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products', 'featured'],
        queryFn: ()=> getFeaturedProducts(pagination)
    })
} 

export const useGetVariantById = (productId: string, variantId: string) =>{
    return useQuery<SuccessResponse<VariantInfo>, ErrorResponse>({
        queryKey: ['products', productId, 'variants', variantId],
        queryFn: ()=>getVariantById(productId, variantId)
    })
}
export const useCreateProduct = () => {
    const query = useQueryClient()
    const navigate = useNavigate()
    return useMutation<SuccessResponse<ProductInfo>, ErrorResponse, ProductSchemaType>({
        mutationFn: (productInfo: ProductSchemaType) => createProduct(productInfo),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'admin']})
            query.invalidateQueries({queryKey: ['products', 'seller']})

            navigate({
                to: '/seller/dashboard/products'
            })

            toast.success("Product Added.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useEditProduct = () =>{
    const navigate = useNavigate()
    const query = useQueryClient()

    return useMutation<SuccessResponse<ProductInfo>, ErrorResponse, {id: string, productInfo: Partial<ProductSchemaType>}>({
        mutationFn: ({id, productInfo})=>editProduct(id, productInfo),
        onSuccess: (data)=>{
            query.setQueryData(['products', data.data._id], data)
            query.setQueryData(['products', 'seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'admin']})
            query.invalidateQueries({queryKey: ['products', 'seller']})

            navigate({
                to: `/seller/dashboard/products/${data.data._id}`
            })
            toast.success("Product Updated.")
        },

        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useEditProductVariant = () =>{
    const navigate = useNavigate()
    const query = useQueryClient()

    return useMutation<SuccessResponse<VariantInfo>, ErrorResponse, {productId: string, variantId: string, variantInfo: Partial<UpdateVariant>}>({
        mutationFn: ({productId,variantId,variantInfo})=>editProductVariant(productId,variantId, variantInfo),
        onSuccess: (data)=>{
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'admin']})
            query.invalidateQueries({queryKey: ['products', 'seller']})
            query.invalidateQueries({queryKey: ['products', data.data.product, 'variants']})
            console.log(data.data.product)
            console.log(data.data.product._id)
            navigate({
                to: `/seller/dashboard/products/${data.data.product}`
            })
            toast.success("Product Variant Updated.")
        },

        onError: (error)=>{
            console.log(error)
            toast.error(error.response.data.message)
        }
    })
}

export const useDeleteProduct = () =>{
    const query = useQueryClient()
    
    return useMutation<SuccessResponse<ProductInfo>, ErrorResponse, string>({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'seller']})
            query.invalidateQueries({queryKey: ['products', 'admin']})

            toast.success("Product Deleted.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useRemoveVariantFromProduct = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<VariantInfo>, ErrorResponse, {productId: string, variantId: string}>({
        mutationFn: ({productId, variantId}) => removeVariantFromProduct(productId, variantId),
        onSuccess: ({data})=>{
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'seller']})
            query.invalidateQueries({queryKey: ['products', 'admin']})
            query.invalidateQueries({queryKey: ['products', data.product._id]})
            query.invalidateQueries({queryKey: ['products', 'seller',data.product._id]})
            query.invalidateQueries({queryKey: ['products', data.product._id, 'variants']})

            toast.success("Variant Removed.")
        },
        onError: (error)=>{
            console.log(error)
            toast.error(error.response.data.message)
        }
    })
}

export const useGetSellerBestSellProduct = (sellerId: string, query: SearchProductParams) =>{
    return useQuery<SuccessResponse<ProductInfo[]>, ErrorResponse>({
        queryKey: ['products', 'seller',sellerId, 'best', 'sell'],
        queryFn: ()=>getSellerBestSellProducts(sellerId, query)
    })
}

export const useGetSellerTotalSale = () => {
    return useQuery<SuccessResponse<{totalSale: number}>, ErrorResponse>({
        queryKey: ['products', 'seller', 'totalSale'],
        queryFn: ()=>getSellerTotalSale()
    })
}

export const useGetProductCount = () =>{
    return useQuery<SuccessResponse<number>, ErrorResponse>({
        queryKey: ['products', 'count'],
        queryFn: ()=> getProductCount()
    })
}

export const useUpdateArchieveStatus = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<ProductInfo>, ErrorResponse, {archieve: boolean, productId: string}>({
        mutationFn: ({archieve, productId}) => archieve ? archieveProduct(productId) : unarchieveProduct(productId),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['products']})
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}