import type { PaginationField } from "@/types/pagination.types";
import type { ProductInfo, SearchProductParams, SearchProductResponse } from "@/types/product.types";
import type { SuccessResponse } from "@/types/response.types";
import type { VariantInfo } from "@/types/variant.types";
import { api } from "@/utils/api";
import type { ProductSchemaType } from "@/validations/product.validate";
import type { UpdateVariant } from "@/validations/variants.validate";




export const getAllProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/all`, {params: pagination})
    return response.data
}

export const getProductCount = async(): Promise<SuccessResponse<number>> => {
    const response = await api.get<SuccessResponse<number>>(`/products/all/count`)
    return response.data
}
export const getSellerProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/seller`, {params: pagination})
    return response.data
}
export const getProductList = async (pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products`, {params: pagination})
    return response.data
}

export const searchProduct = async(searchParams: SearchProductParams): Promise<SuccessResponse<SearchProductResponse>> =>{
    const response = await api.get<SuccessResponse<SearchProductResponse>>(`/products/search`, {params: searchParams})
    return response.data
}

export const getProductById = async (id: string): Promise<SuccessResponse<ProductInfo>> => {
    const response = await api.get<SuccessResponse<ProductInfo>>(`/products/${id}`)
    return response.data
}

export const getBestSellProducts = async(query: SearchProductParams): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/best/sell`, {params: query})
    return response.data
}

export const getSellerBestSellProducts = async(sellerId: string, query: SearchProductParams): Promise<SuccessResponse<ProductInfo[]>> => {
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/best/sell/${sellerId}`, {params: query})
    return response.data
}

export const getSellerProductCount = async():Promise<SuccessResponse<number>> => {
    const response = await api.get<SuccessResponse<number>>(`/products/count/seller`)
    return response.data
}

export const getSellerTotalSale = async() : Promise<SuccessResponse<{totalSale: number}>> => {
    const response = await api.get<SuccessResponse<{totalSale: number}>>(`/products/sell/totalSale`)
    return response.data
}

export const getFeaturedProducts = async(pagination: PaginationField): Promise<SuccessResponse<ProductInfo[]>> =>{
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/featured`, {params: pagination})
    return response.data
}

export const getProductByCategory = async(categoryId: string, pagination:PaginationField):Promise<SuccessResponse<ProductInfo[]>> =>{
    const response = await api.get<SuccessResponse<ProductInfo[]>>(`/products/category/${categoryId}`, {params: pagination})
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
    const formData = new FormData();

    formData.append("name", productInfo.name as string)
    formData.append("category", productInfo.category as string)
    formData.append("productDescription", productInfo.productDescription as string)
    formData.append("productHighlights", productInfo.productHighlights as string)
    formData.append("dangerousGoods", productInfo.dangerousGoods as string)
    formData.append("warrantyType", productInfo.warrantyType as string)
    formData.append("warrantyPeriod", productInfo.warrantyPeriod as string)
    formData.append("warrantyPolicy", productInfo.warrantyPolicy as string)

    const parsedVariant = productInfo?.variants?.map((variant)=>({...variant, price: parseInt(variant.price), stock: parseInt(variant.stock), packageWeight: parseInt(variant.packageWeight)}))

    formData.append("variants", JSON.stringify(parsedVariant))

    productInfo?.variantImages?.forEach((image) => formData.append("variantImages", image))

    const response = await api.put<SuccessResponse<ProductInfo>>(`/products/${id}`, formData)
    return response.data
}

export const editProductVariant = async(productId: string, variantId: string, variantInfo: Partial<UpdateVariant>): Promise<SuccessResponse<VariantInfo>> => {
    const formData = new FormData();

    formData.append("color", variantInfo.color as string)
    formData.append("size", variantInfo.size as string)
    formData.append("price", variantInfo.price as string)
    formData.append("stock", variantInfo.stock as string)
    formData.append("availability",JSON.stringify(variantInfo.availability))
    formData.append("packageLength", variantInfo.packageLength as string)
    formData.append("packageWeight", variantInfo.packageWeight as string)

    variantInfo?.variantImages?.forEach((image) => formData.append("variantImages", image))
    const response = await api.put<SuccessResponse<VariantInfo>>(`/products/${productId}/variants/${variantId}`, formData)
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

export const getVariantById = async(productId: string, variantId: string): Promise<SuccessResponse<VariantInfo>>=>{
    const response = await api.get<SuccessResponse<VariantInfo>>(`/products/${productId}/variants/${variantId}`)
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