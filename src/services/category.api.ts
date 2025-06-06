import type { Category, CategoryInput, CategoryTree } from "@/types/category.types"
import type { PaginationField } from "@/types/pagination.types"
import type { SuccessResponse } from "@/types/response.types"
import { api } from "@/utils/api"


export const getAllCategory = async(paginationField: PaginationField): Promise<SuccessResponse<Category[]>> =>{
    const response = await api.get<SuccessResponse<Category[]>>(`/category?page=${paginationField.page}&limit=${paginationField.limit}`)
    return response.data
}

export const getCategoryTree = async(pagination: PaginationField) : Promise<SuccessResponse<CategoryTree[]>> => {
    const response = await api.get<SuccessResponse<CategoryTree[]>>(`/category/tree?page=${pagination.page}&limit=${pagination.limit}`)
    return response.data
}
export const getCategoryById = async(id: string) : Promise<SuccessResponse<Category>> => {
    const response = await api.get<SuccessResponse<Category>>(`/category/${id}`)
    return response.data
}

export const createCategory = async(categoryInfo: CategoryInput): Promise<SuccessResponse<Category>> => {
    const response = await api.post<SuccessResponse<Category>>(`/category`, categoryInfo)
    return response.data
}

export const updateCategory = async(id: string, categoryInfo: Partial<CategoryInput>): Promise<SuccessResponse<Category>> =>{
    const response = await api.put<SuccessResponse<Category>>(`/category/${id}`, categoryInfo)
    return response.data
}

export const removeCategory = async(id: string): Promise<SuccessResponse<Category>> =>{
    const response = await api.delete<SuccessResponse<Category>>(`/category/${id}`)
    return response.data
}