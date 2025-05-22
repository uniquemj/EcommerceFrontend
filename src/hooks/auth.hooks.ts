import { logout, login, register } from "@/services/auth.api";
import type { Admin, AdminRegisterInfo, Customer, CustomerRegisterInfo, LoginCredentials, LoginResponse, Seller, SellerRegisterInfo } from "@/types/user.types";
import { UserRole } from "@/types/enum.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth.store";
import { useSellerState } from "@/store/seller.store";

export const useCustomerLogin = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated, setRole, setFullName, setInitials, setEmail } = useAuth()

    return useMutation<SuccessResponse<LoginResponse<Customer>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Customer>>(UserRole.CUSTOMER, credential),
        onSuccess: (data) => {

            setIsAuthenticated(true)
            setRole(data.data.user.role)
            setFullName(data.data.user.fullname)
            setEmail(data.data.user.email)
            setInitials(data.data.user.fullname)

            navigate({
                to: '/'
            })
            toast.success("Welcome to BajarHub!")
        },
        onError: (error) => {
            setIsAuthenticated(false)
            toast.error(error.response.data.message)
        }
    })
}

export const useSellerLogin = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated, setRole, setFullName, setInitials, setEmail } = useAuth()
    const { setIsVerified} = useSellerState()

    return useMutation<SuccessResponse<LoginResponse<Seller>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Seller>>(UserRole.SELLER, credential),
        onSuccess: (data) => {
            setIsAuthenticated(true)
            setRole(data.data.user.role)
            setFullName(data.data.user.fullname)
            setEmail(data.data.user.email)
            setInitials(data.data.user.fullname)
            setIsVerified(data.data.user.is_verified)
            navigate({
                to: '/seller/dashboard'
            })
            toast.success("Welcome to BajarHub!")
        },
        onError: (error) => {
            setIsAuthenticated(false)
            toast.error(error.response.data.message)
        }
    })
}

export const useAdminLogin = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated, setRole, setFullName, setInitials, setEmail } = useAuth()
    return useMutation<SuccessResponse<LoginResponse<Admin>>, ErrorResponse, LoginCredentials>({
        mutationFn: (credential: LoginCredentials) => login<LoginCredentials, LoginResponse<Admin>>(UserRole.ADMIN, credential),
        onSuccess: (data) => {
            setIsAuthenticated(true)
            setRole(data.data.user.role)
            setFullName(data.data.user.fullname)
            setEmail(data.data.user.email)
            setInitials(data.data.user.fullname)

            navigate({
                to: '/admin/dashboard'
            })
            toast.success("Welcome to BajarHub!")
        },
        onError: (error) => {
            setIsAuthenticated(false)
            toast.error(error.response.data.message)
        }
    })
}

export const useCustomerRegister = () => {
    const navigate = useNavigate()
    return useMutation<SuccessResponse<Customer>, ErrorResponse, CustomerRegisterInfo>({
        mutationFn: (registerInfo: CustomerRegisterInfo) => register<CustomerRegisterInfo, Customer>(UserRole.CUSTOMER, registerInfo),
        onSuccess: () => {
            navigate({
                to: '/auth/login'
            })
            toast.success("Customer Registered. Please Verify your email with link send to your mail.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useSellerRegister = () => {
    const navigate = useNavigate()
    return useMutation<SuccessResponse<Seller>, ErrorResponse, SellerRegisterInfo>({
        mutationFn: (registerInfo: SellerRegisterInfo) => register<SellerRegisterInfo, Seller>(UserRole.SELLER, registerInfo),
        onSuccess: () => {
            navigate({
                to: '/auth/seller/login'
            })
            toast.success("Seller Registered. Please Verify your email with link send to your mail.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useAdminRegister = () => {
    return useMutation<SuccessResponse<Admin>, ErrorResponse, AdminRegisterInfo>({
        mutationFn: (registerInfo: AdminRegisterInfo) => register<AdminRegisterInfo, Admin>(UserRole.ADMIN, registerInfo)
    })
}

export const useLogout = () => {
    const navigate = useNavigate()

    const { role } = useAuth()
    return useMutation<SuccessResponse<[]>, ErrorResponse, string>({
        mutationFn: () => logout(role),
        onSuccess: () => {
            useAuth.persist.clearStorage()
            useAuth.setState({
                isAuthenticated: false,
                role: UserRole.ANONYMOUS,
                fullname: null,
                email: null
            })
            useAuth.persist.clearStorage()


            if (role === UserRole.CUSTOMER) {
                navigate({
                    to: '/auth/login'
                })
                toast.success("User Logged out.")
            } else if (role === UserRole.SELLER) {
                useSellerState.setState({
                    isVerified: false,
                    avatar: null
                })
                useSellerState.persist.clearStorage()
                navigate({
                    to: '/auth/seller/login'
                })
                toast.success("Seller Logged out.")
            } else if (role === UserRole.ADMIN) {
                navigate({
                    to: '/auth/admin/login'
                })
                toast.success("Admin Logged out.")
            }
        }
    })
}