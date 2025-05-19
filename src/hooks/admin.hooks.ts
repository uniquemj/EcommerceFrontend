import { deleteAdmin, getAdminById, getAdminProfile, getAllAdmin, updateAdmin, updateAdminPassword, updateOtherAdmin } from "@/services/admin.api";
import type { PaginationField } from "@/types/pagination.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import type { Admin, AdminUpdate, OtherAdminUpdate, PasswordUpdate } from "@/types/user.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useGetAllAdmin = (paginationField: PaginationField) =>{
    return useQuery<SuccessResponse<Admin[]>, ErrorResponse>({
        queryKey: ['admins', paginationField.page, paginationField.limit],
        queryFn: ()=> getAllAdmin(paginationField)
    })
}

export const useGetAdminProfile = () =>{
    return useQuery<SuccessResponse<Admin>, ErrorResponse>({
        queryKey: ['admin', 'profile'],
        queryFn: ()=> getAdminProfile()
    })
}

export const useGetAdminById = (id: string) =>{
    return useQuery<SuccessResponse<Admin>, ErrorResponse>({
        queryKey: ['admin', id],
        queryFn: ()=>getAdminById(id)
    })
}

export const useDeleteAdmin = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Admin>, ErrorResponse, string>({
        mutationFn: (id: string) => deleteAdmin(id),
        onSuccess: () =>{
            query.invalidateQueries({queryKey: ['admins']})
            toast.success("Admin Removed.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateOtherAdmin = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Admin>, ErrorResponse, {id: string, updateInfo: Partial<OtherAdminUpdate>}>({
        mutationFn: ({id, updateInfo}:{id: string, updateInfo: Partial<OtherAdminUpdate>}) => updateOtherAdmin(id, updateInfo),
        onSuccess: (data) =>{
            query.setQueryData(['admin', data.data._id], data)
            query.invalidateQueries({queryKey: ['admins']})
            query.invalidateQueries({queryKey: ['admin', 'profile']})
            toast.success("Admin Updated.")
        },
        onError:(error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateAdminProfile = () =>{
    const query = useQueryClient()
    return useMutation<SuccessResponse<Admin>, ErrorResponse, Partial<AdminUpdate>>({
        mutationFn: (updateInfo: Partial<AdminUpdate>) => updateAdmin(updateInfo),
        onSuccess: (data) =>{
            query.setQueryData(['admin', data.data._id], data)
            query.invalidateQueries({queryKey: ['admins']})
            toast.success("Admin Profile Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateAdminPassword = () =>{
    return useMutation<SuccessResponse<Admin>, ErrorResponse, PasswordUpdate>({
        mutationFn: (updatePassword: PasswordUpdate) => updateAdminPassword(updatePassword),
        onSuccess: () =>{
            toast.success("Password Updated.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}