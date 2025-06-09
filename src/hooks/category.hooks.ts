import { createCategory, getAllCategory, getCategoryById, getCategoryTree, removeCategory, updateCategory } from "@/services/category.api";
import { type CategoryTree, type Category, type CategoryInput } from "@/types/category.types";
import type { PaginationField } from "@/types/pagination.types";
import type { ErrorResponse, SuccessResponse } from "@/types/response.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";


export const useGetAllCategory = (pagination: PaginationField) => {
    return useQuery<SuccessResponse<Category[]>, ErrorResponse>({
        queryKey: ['categories'],
        queryFn: ()=>getAllCategory(pagination)
    })
}

export const useGetCategoryTree = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<CategoryTree[]>, ErrorResponse>({
        queryKey: ['category', 'tree', pagination],
        queryFn: ()=> getCategoryTree(pagination)
    })
}

export const useGetCategoryById = (id: string) =>{
    return useQuery<SuccessResponse<Category>, ErrorResponse>({
        queryKey: ['category', id],
        queryFn: ()=>getCategoryById(id)  
    })
}

export const useCreateCategory = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()
    return useMutation<SuccessResponse<Category>, ErrorResponse, CategoryInput>({
        mutationFn: (categoryInfo: CategoryInput)=>createCategory(categoryInfo),
        onSuccess: (data) => {
            query.setQueryData(['category', data.data._id], data)
            query.invalidateQueries({queryKey: ['categories']})

            navigate({
                to: '/admin/dashboard/categories'
            })

            toast.success("Category Added.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateCategory = () =>{
    const query = useQueryClient()
    const navigate = useNavigate()
    return useMutation<SuccessResponse<Category>, ErrorResponse, {id: string, info: Partial<CategoryInput>}>({
        mutationFn: ({id,info}) => updateCategory(id, info),
        onSuccess: (data) => {
            query.setQueryData(['category', data.data._id], data)
            query.invalidateQueries({queryKey: ['categories']})

            navigate({
                to: '/admin/dashboard/categories'
            })

            toast.success("Category Updated.")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useDeleteCategory = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<Category>, ErrorResponse, string>({
        mutationFn: (id: string) => removeCategory(id),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['categories']})
            toast.success('Category Removed.')
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

