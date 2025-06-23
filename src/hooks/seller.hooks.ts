import { addBusinessInfo, deleteSeller, getAllSeller, getSellerById, getSellerCount, getSellerProfile, resendVerificationEmail, updateSellerInfo, updateSellerPassword, updateSellerVerification, verifySeller, verifySellerEmail } from "@/services/seller.api"
import { useAuth } from "@/store/auth.store"
import { useSellerState } from "@/store/seller.store"
import type { PaginationField } from "@/types/pagination.types"
import type { ErrorResponse, SuccessResponse } from "@/types/response.types"
import { type Seller, type PasswordUpdate, VerificationStatus } from "@/types/user.types"
import type { BusinessInfoType, SellerAccountType } from "@/validations/seller.validate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"


export const useGetAllSeller = (paginationField: PaginationField) =>{
    return useQuery<SuccessResponse<Seller[]>, ErrorResponse>({
        queryKey: ['sellers', paginationField.page, paginationField.limit],
        queryFn: () => getAllSeller(paginationField)
    })
}

export const useGetSllerCount = () =>{
    return useQuery<SuccessResponse<number>, ErrorResponse>({
        queryKey: ['sellers','count'],
        queryFn: ()=> getSellerCount()
    })
}

export const useGetSellerById = (id: string) =>{
    return useQuery<SuccessResponse<Seller>, ErrorResponse>({
        queryKey: ['seller', id],
        queryFn: () => getSellerById(id)
    })
}

export const useVerifySeller = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()
    
    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (id: string) => verifySeller(id),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            navigate({
                to: '/admin/dashboard/sellers'
            })
            toast.success("Seller verified.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useRejectSeller = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()

    return useMutation<SuccessResponse<Seller>, ErrorResponse, {id:string, reason: string}>({
        mutationFn: ({id, reason}) => updateSellerVerification(id, {status: VerificationStatus.REJECTED, rejection_reason: reason}),
        onSuccess: (data) => {
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            navigate({
                to: '/admin/dashboard/sellers'
            })
            toast.success("Seller Verification Rejected.")
        }
    })
}

export const useDeleteSeller = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (id: string) => deleteSeller(id),
        onSuccess: () =>{
            query.invalidateQueries({queryKey: ['sellers']})
            toast.success("Seller Deleted.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useVerifySellerEmail = () => {
    const navigate = useNavigate()
    const query = useQueryClient()
    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (code: string) => verifySellerEmail(code),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            navigate({
                to: '/auth/seller/login'
            })
            toast.success("Seller Email Verified.")

        },
        onError:(error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useResendVerificationEmail = () =>{
    const navigate = useNavigate()
    const query=useQueryClient()
    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (email: string) => resendVerificationEmail(email),
        onSuccess: (data) => {
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            navigate({
                to: '/auth/seller/login'
            })
            toast.success("Resent Verification Email.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}




export const useAddBusinessInfo = () =>{
    const navigate = useNavigate()
    const query = useQueryClient()
    const {setAvatar} = useSellerState()

    return useMutation<SuccessResponse<Seller>, ErrorResponse,BusinessInfoType>({
        mutationFn: (businessInfo: BusinessInfoType) => addBusinessInfo(businessInfo),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.setQueryData(['seller','profile'], data)
            query.invalidateQueries({queryKey: ['sellers']})
            setAvatar(data.data.store_logo[0].url)
            navigate({
                to: '/seller/profile'
            })
            toast.success("Seller Business Info Added.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetSellerProfile = () =>{
    const {isAuthenticated} = useAuth()
    return useQuery<SuccessResponse<Seller>, ErrorResponse>({
        queryKey: ['seller', 'profile'],
        queryFn: () => getSellerProfile(),
        enabled: Boolean(isAuthenticated)
    })
}

export const useUpdateSellerInfo = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()
    
    return useMutation<SuccessResponse<Seller>,ErrorResponse,SellerAccountType>({
        mutationFn: (updateInfo: SellerAccountType) => updateSellerInfo(updateInfo),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.setQueryData(['seller','profile'], data)
            query.invalidateQueries({queryKey: ['sellers']})

            navigate({
                to: '/seller/profile'
            })
            
            toast.success("Seller Info Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateSellerPassword = () =>{
    const navigate = useNavigate()

    return useMutation<SuccessResponse<Seller>, ErrorResponse, PasswordUpdate>({
        mutationFn: (updatePassword: PasswordUpdate) => updateSellerPassword(updatePassword),
        onSuccess: ()=>{
            navigate({
                to: '/seller/profile'
            })        
            toast.success("Seller Password Updated.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}