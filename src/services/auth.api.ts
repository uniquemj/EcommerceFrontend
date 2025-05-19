import type { SuccessResponse } from "@/types/response.types";
import { api } from "@/utils/api";

// export const customerLogin = async(credential: LoginCredentials): Promise<SuccessResponse<LoginResponse<Customer>>>=>{
//     const response = await api.post<SuccessResponse<LoginResponse<Customer>>>('/auth/customer/login', credential)
//     return response.data
// }

// export const sellerLogin = async(credential: LoginCredentials): Promise<SuccessResponse<LoginResponse<Seller>>> =>{
//     const response = await api.post<SuccessResponse<LoginResponse<Seller>>>('/auth/seller/login', credential)
//     return response.data
// }

// export const adminLogin = async(credential: LoginCredentials): Promise<SuccessResponse<LoginResponse<Admin>>> =>{
//     const response = await api.post<SuccessResponse<LoginResponse<Admin>>>('/auth/admin/login', credential)
//     return response.data
// }

// export const customerRegister = async(registerInfo: CustomerRegisterInfo): Promise<SuccessResponse<Customer>> => {
//     const response = await api.post<SuccessResponse<Customer>>('/auth/customer/register', registerInfo)
//     return response.data
// }

// export const sellerRegister = async(registerInfo: SellerRegisterInfo): Promise<SuccessResponse<Seller>> =>{
//     const response = await api.post<SuccessResponse<Seller>>('/auth/seller/register', registerInfo)
//     return response.data
// }

// export const adminRegister = async(registerInfo: AdminRegisterInfo): Promise<SuccessResponse<Admin>> =>{
//     const response = await api.post<SuccessResponse<Admin>>('/auth/admin/register', registerInfo)
//     return response.data
// }

// export const customerLogout = async(): Promise<SuccessResponse<[]>> => {
//     const response = await api.post<SuccessResponse<[]>>('/auth/customer/logout')
//     return response.data
// }

// export const sellerLogout = async(): Promise<SuccessResponse<[]>> =>{
//     const response = await api.post<SuccessResponse<[]>>('/auth/seller/logout')
//     return response.data
// }

// export const adminLogout = async(): Promise<SuccessResponse<[]>> =>{
//     const response = await api.post<SuccessResponse<[]>>('/auth/admin/logout')
//     return response.data
// }


export const login = async<TInput, TOutput>(userType: string, credential: TInput): Promise<SuccessResponse<TOutput>> =>{
    const response = await api.post<SuccessResponse<TOutput>>(`/auth/${userType}/login`, credential)
    return response.data
}

export const register = async<TInput, TOutput>(userType: string, registerInfo: TInput): Promise<SuccessResponse<TOutput>> =>{
    const response = await api.post<SuccessResponse<TOutput>>(`/auth/${userType}/register`, registerInfo)
    return response.data
}

export const logout = async(userType: string): Promise<SuccessResponse<[]>> =>{
    const response = await api.post<SuccessResponse<[]>>(`/auth/${userType}/logout`)
    return response.data
}