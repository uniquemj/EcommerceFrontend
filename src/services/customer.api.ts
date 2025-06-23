import type { PaginationField } from "@/types/pagination.types";
import type { SuccessResponse } from "@/types/response.types";
import type { Customer, PasswordUpdate, UpdateCustomerInfo } from "@/types/user.types";
import { api } from "@/utils/api";


export const getAllCustomers = async(paginationField: PaginationField): Promise<SuccessResponse<Customer[]>> =>{
    const response = await api.get<SuccessResponse<Customer[]>>(`/customer?page=${paginationField.page}&limit=${paginationField.limit}`)
    return response.data
}

export const getCustomerById = async(id: string): Promise<SuccessResponse<Customer>> =>{
    const response = await api.get<SuccessResponse<Customer>>(`/customer/${id}`)
    return response.data
}

export const getCustomerCount = async(): Promise<SuccessResponse<number>> => {
    const response = await api.get<SuccessResponse<number>>(`/customer/verify/count`)
    return response.data
}

export const deleteCustomer = async(id: string): Promise<SuccessResponse<Customer>> =>{
    const response = await api.delete<SuccessResponse<Customer>>(`/customer/${id}`)
    return response.data
}

export const verifyCustomerEmail = async(code: string): Promise<SuccessResponse<Customer>> =>{
    const response = await api.post<SuccessResponse<Customer>>(`/customer/verify/${code}`)
    return response.data
}

export const resendVerificationEmail = async(email: string): Promise<SuccessResponse<Customer>> =>{
    const response = await api.post<SuccessResponse<Customer>>(`/customer/resend-verification`, {email})
    return response.data
}
export const getCustomerProfile = async(): Promise<SuccessResponse<Customer>> =>{
    const response = await api.get<SuccessResponse<Customer>>('/customer/profile')
    return response.data
}

export const updateCustomerInfo = async(updateInfo: Partial<UpdateCustomerInfo>): Promise<SuccessResponse<Customer>> => {
    const response = await api.put<SuccessResponse<Customer>>('/customer', updateInfo)
    return response.data
}

export const updateCustomerPassword = async(updatePassword: PasswordUpdate): Promise<SuccessResponse<Customer>> =>{
    const response = await api.put<SuccessResponse<Customer>>('/customer/password', updatePassword)
    return response.data
}