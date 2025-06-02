import type { PaginationField } from "@/types/pagination.types";
import type { ProductInfo } from "@/types/product.types";
import type { SuccessResponse } from "@/types/response.types";
import type { VariantInfo, VariantInput } from "@/types/variant.types";
import { api } from "@/utils/api";
import type { ProductSchemaType } from "@/validations/product.validate";




export const getAllProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/all?page=${pagination.page}&limit=${pagination.limit}`)
    return response.data
}
export const getSellerProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/seller?page=${pagination.page}&limit=${pagination.limit}`)
    return response.data
}
export const getProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/?page=${pagination.page}&limit=${pagination.limit}`)
    return response.data
}

export const getProductById = async (id: string): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.get<SuccessResponse<ProductInfo>>(`/products/${id}`)
    return response.data
}

export const getSellerProductById = async (id: string): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.get<SuccessResponse<ProductInfo>>(`/products/seller/${id}`)
    return response.data
}

export const getVariantListOfProduct = async (id: string): Promise<SuccessResponse<VariantInfo[]>> => {
    const response = await api.get<SuccessResponse<VariantInfo[]>>(`/products/${id}/variants`)
    return response.data
}

export const createProduct = async (productInfo: ProductSchemaType): Promise<SuccessResponse<ProductInfo>> => {
    const formData = new FormData();

    formData.append("name", productInfo.name)
    formData.append("category", productInfo.category)
    console.log(productInfo.productDescription)
    formData.append("productDescription", productInfo.productDescription as string)
    formData.append("productHighlights", productInfo.productHighlights as string)
    formData.append("dangerousGoods", productInfo.dangerousGoods as string)
    formData.append("warrantyType", productInfo.warrantyType as string)
    formData.append("warrantyPeriod", productInfo.warrantyPeriod)
    formData.append("warrantyPolicy", productInfo.warrantyPolicy as string)

    const parsedVariant = productInfo.variants.map((variant)=>({...variant, price: parseInt(variant.price), stock: parseInt(variant.stock), packageWeight: parseInt(variant.packageWeight)}))

    formData.append("variants", JSON.stringify(parsedVariant))

    productInfo.variantImages.forEach((image) => formData.append("variantImages", image))

    const response = await api.post<SuccessResponse<ProductInfo>>(`/products`, formData)
    return response.data
}

export const editProduct = async (id: string, productInfo: Partial<ProductSchemaType>): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.put<SuccessResponse<ProductInfo>>(`/products/${id}`, productInfo)
    return response.data
}

export const editProductVariant = async(productId: string, variantId: string, variantInfo: Partial<VariantInput>): Promise<SuccessResponse<VariantInfo>> => {
    const response = await api.put<SuccessResponse<VariantInfo>>(`/products/${productId}/variants/${variantId}`, variantInfo)
    return response.data
}

export const deleteProduct = async(productId: string): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.delete<SuccessResponse<ProductInfo>>(`/products/${productId}`)
    return response.data
}

export const removeVariantFromProduct = async(productId: string, variantId: string): Promise<SuccessResponse<VariantInfo>> => {
    const response = await api.delete<SuccessResponse<VariantInfo>>(`/products/${productId}/variants/${variantId}`)
    return response.data
}

export const archieveProduct = async(productId: string):Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.put<SuccessResponse<ProductInfo>>(`/products/${productId}/archieve`)
    return response.data
}

export const unarchieveProduct = async(productId: string): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.put<SuccessResponse<ProductInfo>>(`/products/${productId}/unarchieve`)
    return response.data
}