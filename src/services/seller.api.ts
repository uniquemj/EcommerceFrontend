import type { PaginationField } from "@/types/pagination.types";
import type { SuccessResponse } from "@/types/response.types";
import type {  PasswordUpdate, Seller, UpdateSellerInfo } from "@/types/user.types";
import { api } from "@/utils/api";
import type { BusinessInfoType } from "@/validations/seller.validate";


export const getAllSeller = async(paginationField: PaginationField):Promise<SuccessResponse<Seller[]>> =>{
    const response = await api.get<SuccessResponse<Seller[]>>(`/seller/?page=${paginationField.page}&limit=${paginationField.limit}`)
    return response.data
}

export const getSellerById = async(id: string): Promise<SuccessResponse<Seller>> => {
    const repsonse = await api.get<SuccessResponse<Seller>>(`/seller/${id}`)
    return repsonse.data
}

export const verifySeller = async(id:string): Promise<SuccessResponse<Seller>> =>{
    const response = await api.post<SuccessResponse<Seller>>(`/seller/verify-seller/${id}`)
    return response.data
}

export const resendVerificationEmail = async(email: string): Promise<SuccessResponse<Seller>> =>{
    const response = await api.post<SuccessResponse<Seller>>(`/seller/resend-verification`, {email})
    return response.data
}

export const deleteSeller = async(id: string): Promise<SuccessResponse<Seller>> => {
    const response = await api.delete<SuccessResponse<Seller>>(`/seller/${id}`)
    return response.data
}

export const verifySellerEmail = async(code: string): Promise<SuccessResponse<Seller>> => {
    const response = await api.post<SuccessResponse<Seller>>(`/seller/verify/${code}`)
    return response.data
}

export const addBusinessInfo = async(businessInfo: BusinessInfoType): Promise<SuccessResponse<Seller>> =>{
    const formData = new FormData();

    formData.append("address", businessInfo.address);
    formData.append("city", businessInfo.city);
    formData.append("country",businessInfo.country);
    formData.append("phone_number",businessInfo.phone_number);

    businessInfo.legal_document.forEach((file)=>formData.append("legal_document", file))

    businessInfo.store_logo.forEach((file)=>formData.append("store_logo", file));

    const response = await api.post<SuccessResponse<Seller>>(`/seller/profile`, formData)
    return response.data
}

export const getSellerProfile = async():Promise<SuccessResponse<Seller>> =>{
    const response = await api.get<SuccessResponse<Seller>>('/seller/profile')
    return response.data
}

export const updateSellerInfo = async(updateInfo: Partial<UpdateSellerInfo>) : Promise<SuccessResponse<Seller>> =>{
    const response = await api.put<SuccessResponse<Seller>>('/seller/profile', updateInfo)
    return response.data
}

export const updateSellerPassword = async(updatePassword: PasswordUpdate): Promise<SuccessResponse<Seller>> =>{
    const response = await api.put<SuccessResponse<Seller>>('/seller/profile', updatePassword)
    return response.data
}