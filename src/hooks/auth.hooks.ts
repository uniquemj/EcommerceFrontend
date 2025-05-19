import { logout, login, register } from "@/services/auth.api";
import type { Admin, AdminRegisterInfo, Customer, CustomerRegisterInfo, LoginCredentials, LoginResponse, Seller, SellerRegisterInfo } from "@/types/user.types";
import { UserRole } from "@/types/enum.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import { useMutation } from "@tanstack/react-query";

export const useCustomerLogin = () => {
    return useMutation<SuccessResponse<LoginResponse<Customer>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Customer>>(UserRole.CUSTOMER, credential)
    })
}

export const useSellerLogin = () => {
    return useMutation<SuccessResponse<LoginResponse<Seller>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Seller>>(UserRole.SELLER, credential)
    })
}

export const useAdminLogin = () => {
    return useMutation<SuccessResponse<LoginResponse<Admin>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Admin>>(UserRole.ADMIN, credential)
    })
}

export const useCustomerRegister = () => {
    return useMutation<SuccessResponse<Customer>, ErrorResponse, CustomerRegisterInfo>({
        mutationFn: (registerInfo: CustomerRegisterInfo) => register<CustomerRegisterInfo, Customer>(UserRole.CUSTOMER, registerInfo)
    })
}

export const useSellerRegister = () => {
    return useMutation<SuccessResponse<Seller>, ErrorResponse, SellerRegisterInfo>({
        mutationFn: (registerInfo: SellerRegisterInfo) => register<SellerRegisterInfo, Seller>(UserRole.SELLER, registerInfo)
    })
}

export const useAdminRegister = () => {
    return useMutation<SuccessResponse<Admin>, ErrorResponse, AdminRegisterInfo>({
        mutationFn: (registerInfo: AdminRegisterInfo) => register<AdminRegisterInfo, Admin>(UserRole.ADMIN, registerInfo)
    })
}

export const useLogout = (userType: string) => {
    return useMutation<SuccessResponse<[]>, ErrorResponse, unknown>({
        mutationFn: () => logout(userType)
    })
}