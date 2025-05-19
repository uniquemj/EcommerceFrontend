import type { PaginationField } from "@/types/pagination.types"
import type { SuccessResponse } from "@/types/response.types"
import type { Admin, AdminUpdate, OtherAdminUpdate, PasswordUpdate } from "@/types/user.types"
import { api } from "@/utils/api"


export const getAllAdmin = async(paginationField: PaginationField): Promise<SuccessResponse<Admin[]>> =>{
    const response = await api.get<SuccessResponse<Admin[]>>(`/admin?page=${paginationField.page}&limit=${paginationField.limit}`)
    return response.data
}

export const getAdminProfile = async(): Promise<SuccessResponse<Admin>> =>{
    const response = await api.get<SuccessResponse<Admin>>('/admin/profile')
    return response.data
}

export const getAdminById = async(id: string): Promise<SuccessResponse<Admin>> =>{
    const response = await api.get<SuccessResponse<Admin>>(`/admin/${id}`)
    return response.data
}

export const deleteAdmin = async(id: string): Promise<SuccessResponse<Admin>> =>{
    const response = await api.delete<SuccessResponse<Admin>>(`/admin/${id}`)
    return response.data
}

export const updateOtherAdmin = async(id: string, updateInfo: Partial<OtherAdminUpdate>): Promise<SuccessResponse<Admin>> =>{
    const response = await api.put<SuccessResponse<Admin>>(`/admin/${id}`, updateInfo)
    return response.data
}

export const updateAdmin = async(updateInfo: Partial<AdminUpdate>): Promise<SuccessResponse<Admin>> =>{
    const response = await api.put<SuccessResponse<Admin>>(`/admin`, updateInfo)
    return response.data
}

export const updateAdminPassword = async(updatePassword: PasswordUpdate): Promise<SuccessResponse<Admin>> =>{
    const repsonse = await api.post<SuccessResponse<Admin>>('/admin/password', updatePassword)
    return repsonse.data
}