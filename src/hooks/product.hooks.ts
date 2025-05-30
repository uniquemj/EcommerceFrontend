import { createProduct, editProduct, editProductVariant, getAllProductList, getProductById, getProductList, getSellerProductById, getSellerProductList, getVariantListOfProduct } from "@/services/product.api"
import type { PaginationField } from "@/types/pagination.types"
import { type ProductInfo } from "@/types/product.types"
import { type SuccessResponse, type ErrorResponse } from "@/types/response.types"
import { type VariantInfo, type VariantInput } from "@/types/variant.types"
import type { ProductSchemaType } from "@/validations/product.validate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
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
                to: '/seller/dashboard'
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
                to: '/seller/dashboard/products'
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

    return useMutation<SuccessResponse<VariantInfo>, ErrorResponse, {productId: string, variantId: string, variantInfo: Partial<VariantInput>}>({
        mutationFn: ({productId,variantId,variantInfo})=>editProductVariant(productId,variantId, variantInfo),
        onSuccess: (data)=>{
            query.invalidateQueries({queryKey: ['products']})
            query.invalidateQueries({queryKey: ['products', 'admin']})
            query.invalidateQueries({queryKey: ['products', 'seller']})
            query.invalidateQueries({queryKey: ['products', data.data.product._id, 'variants']})
            navigate({
                to: `/seller/dashboard/products/${data.data.product._id}`
            })
            toast.success("Product Variant Updated.")
        },

        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}