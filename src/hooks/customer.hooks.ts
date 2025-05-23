import { deleteCustomer, getAllCustomers, getCustomerById, getCustomerProfile, resendVerificationEmail, updateCustomerInfo, updateCustomerPassword, verifyCustomerEmail } from "@/services/customer.api";
import { useAuth } from "@/store/auth.store";
import type { PaginationField } from "@/types/pagination.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import type { PasswordUpdate, UpdateCustomerInfo,  Customer } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";


export const useGetAllCustomer = (paginationField: PaginationField) =>{
    return useQuery<SuccessResponse<Customer[]>,ErrorResponse>({
        queryKey: ['customers', paginationField.page, paginationField.limit],
        queryFn: () => getAllCustomers(paginationField)
    })
}

export const useGetCustomerById = (id: string) =>{
    return useQuery<SuccessResponse<Customer>, ErrorResponse>({
        queryKey: ['customer', id],
        queryFn: () => getCustomerById(id)
    })
}

export const useDeleteCustomer = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Customer>, ErrorResponse, string>({
        mutationFn: (id: string) => deleteCustomer(id),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['customers']})
            toast.success("Customer Deleted.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useVerifyCustomerEmail = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()
    return useMutation<SuccessResponse<Customer>, ErrorResponse, string>({
        mutationFn: (code: string) => verifyCustomerEmail(code),
        onSuccess: (data) =>{
            query.setQueryData(['customer', data.data._id], data)
            query.invalidateQueries({queryKey: ['customers']})
            navigate({
                to: '/auth/login'
            })
            toast.success("Customer Email Verified.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useResendVerificationEmail = () =>{
    const query=useQueryClient()
    return useMutation<SuccessResponse<Customer>, ErrorResponse, string>({
        mutationFn: (email: string) => resendVerificationEmail(email),
        onSuccess: (data) => {
            query.setQueryData(['customer', data.data._id], data)
            query.invalidateQueries({queryKey: ['customers']})
            toast.success("Resent Verification Email.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetCustomerProfile = () =>{
    const {isAuthenticated} = useAuth()
    return useQuery<SuccessResponse<Customer>, ErrorResponse>(({
        queryKey: ['customer', 'profile'],
        queryFn: () => getCustomerProfile(),
        enabled: isAuthenticated
    }))

}


export const useUpdateCustomerInfo = () =>{
    const query = useQueryClient()
    const {setFullName, setInitials} = useAuth()
    const navigate = useNavigate()

    return useMutation<SuccessResponse<Customer>, ErrorResponse, Partial<UpdateCustomerInfo>>({
        mutationFn: (updateInfo: Partial<UpdateCustomerInfo>) => updateCustomerInfo(updateInfo),
        onSuccess: (data) =>{
            setFullName(data.data.fullname)
            setInitials(data.data.fullname)
            query.setQueryData(['customer', 'profile'], data)
            query.setQueryData(['customer', data.data._id], data)
            query.invalidateQueries({queryKey: ['customers']})
            navigate({
                to: '/customer/profile'
            })
            toast.success("Customer Info Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    }) 
}

export const useUpdateCustomerPassword = () =>{
    const navigate =useNavigate()
    return useMutation<SuccessResponse<Customer>, ErrorResponse, PasswordUpdate>({
        mutationFn: (updatePassword: PasswordUpdate) => updateCustomerPassword(updatePassword),
        onSuccess: () =>{
            navigate({
                to: '/customer/profile'
            })
            toast.success("Customer Password Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}