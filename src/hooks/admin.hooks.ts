import { deleteAdmin, getAdminById, getAdminProfile, getAllAdmin, updateAdmin, updateAdminPassword, updateOtherAdmin } from "@/services/admin.api";
import { useAuth } from "@/store/auth.store";
import type { PaginationField } from "@/types/pagination.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import type { Admin, AdminUpdate, OtherAdminUpdate, PasswordUpdate } from "@/types/user.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";


export const useGetAllAdmin = (paginationField: PaginationField) => {
    return useQuery<SuccessResponse<Admin[]>, ErrorResponse>({
        queryKey: ['admins', paginationField.page, paginationField.limit],
        queryFn: () => getAllAdmin(paginationField)
    })
}

export const useGetAdminProfile = () => {
    const { isAuthenticated } = useAuth()

    return useQuery<SuccessResponse<Admin>, ErrorResponse>({
        queryKey: ['admin', 'profile'],
        queryFn: () => getAdminProfile(),
        enabled: isAuthenticated
    })
}

export const useGetAdminById = (id: string) => {
    return useQuery<SuccessResponse<Admin>, ErrorResponse>({
        queryKey: ['admin', id],
        queryFn: () => getAdminById(id)
    })
}

export const useDeleteAdmin = () => {
    const query = useQueryClient()
    return useMutation<SuccessResponse<Admin>, ErrorResponse, string>({
        mutationFn: (id: string) => deleteAdmin(id),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['admins'] })
            toast.success("Admin Removed.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateOtherAdmin = (id: string) => {
    const query = useQueryClient()
    const navigate = useNavigate()

    return useMutation<SuccessResponse<Admin>, ErrorResponse, Partial<OtherAdminUpdate>>({
        mutationFn: (updateInfo : Partial<OtherAdminUpdate> ) => updateOtherAdmin(id, updateInfo),
        onSuccess: (data) => {
            query.setQueryData(['admin', data.data._id], data)
            query.invalidateQueries({ queryKey: ['admins'] })

            navigate({
                to: '/admin/dashboard/admins'
            })
            toast.success("Admin Updated.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateAdminProfile = () => {
    const query = useQueryClient()
    const navigate = useNavigate()
    const { setFullName, setInitials } = useAuth()
    return useMutation<SuccessResponse<Admin>, ErrorResponse, Partial<AdminUpdate>>({
        mutationFn: (updateInfo: Partial<AdminUpdate>) => updateAdmin(updateInfo),
        onSuccess: (data) => {
            setFullName(data.data.fullname)
            setInitials(data.data.fullname)
            query.setQueryData(['admin', data.data._id], data)
            query.invalidateQueries({ queryKey: ['admins'] })
            query.invalidateQueries({ queryKey: ['admin', 'profile'] })
            navigate({
                to: '/admin/profile'
            })
            toast.success("Admin Profile Updated.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateAdminPassword = () => {
    const navigate = useNavigate()

    return useMutation<SuccessResponse<Admin>, ErrorResponse, PasswordUpdate>({
        mutationFn: (updatePassword: PasswordUpdate) => updateAdminPassword(updatePassword),
        onSuccess: () => {
            navigate({
                to: '/admin/profile'
            })
            toast.success("Password Updated.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}