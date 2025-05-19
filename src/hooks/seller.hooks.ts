import { addBusinessInfo, deleteSeller, getAllSeller, getSellerById, getSellerProfile, updateSellerInfo, updateSellerPassword, verifySeller, verifySellerEmail } from "@/services/seller.api"
import type { PaginationField } from "@/types/pagination.types"
import type { ErrorResponse, SuccessResponse } from "@/types/response.types"
import type { UpdateSellerInfo,  Seller, BusinessInfo, PasswordUpdate } from "@/types/user.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useGetAllSeller = (paginationField: PaginationField) =>{
    return useQuery<SuccessResponse<Seller[]>, ErrorResponse>({
        queryKey: ['sellers', paginationField.page, paginationField.limit],
        queryFn: () => getAllSeller(paginationField)
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

    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (id: string) => verifySeller(id),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            toast.success("Seller verified.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
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
    const query = useQueryClient()
    return useMutation<SuccessResponse<Seller>, ErrorResponse, string>({
        mutationFn: (code: string) => verifySellerEmail(code),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.invalidateQueries({queryKey: ['sellers']})
            toast.success("Seller Email Verified.")
        },
        onError:(error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useAddBusinessInfo = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Seller>, ErrorResponse,BusinessInfo>({
        mutationFn: (businessInfo: BusinessInfo) => addBusinessInfo(businessInfo),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.setQueryData(['seller','profile'], data)
            query.invalidateQueries({queryKey: ['sellers']})
            toast.success("Seller Business Info Added.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetSellerProfile = () =>{
    return useQuery<SuccessResponse<Seller>, ErrorResponse>({
        queryKey: ['seller', 'profile'],
        queryFn: () => getSellerProfile()
    })
}

export const useUpdateSellerInfo = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Seller>,ErrorResponse, Partial<UpdateSellerInfo>>({
        mutationFn: (updateInfo: Partial<UpdateSellerInfo>) => updateSellerInfo(updateInfo),
        onSuccess: (data) =>{
            query.setQueryData(['seller', data.data._id], data)
            query.setQueryData(['seller','profile'], data)
            query.invalidateQueries({queryKey: ['sellers']})
            toast.success("Seller Info Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateSellerPassword = () =>{
    return useMutation<SuccessResponse<Seller>, ErrorResponse, PasswordUpdate>({
        mutationFn: (updatePassword: PasswordUpdate) => updateSellerPassword(updatePassword),
        onSuccess: ()=>{
            toast.success("Seller Password Updated.")
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}