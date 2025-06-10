import { createAddress, deleteAddress, getActiveAddress, getAddressById, getAddressListOfCustomer, getDefaultAddress, updateActiveAddress, updateAddress } from "@/services/shipment.api"
import type { PaginationField } from "@/types/pagination.types"
import type { ErrorResponse, SuccessResponse } from "@/types/response.types"
import type { ShipmentInfo } from "@/types/shipment.type"
import type { AddressType, UpdateAddressType } from "@/validations/shipment.validate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useGetAddressListOfCustomer = (pagination: PaginationField) =>{
    return useQuery<SuccessResponse<ShipmentInfo[]>, ErrorResponse>({
        queryKey: ['shipment', pagination],
        queryFn: ()=>getAddressListOfCustomer(pagination)
    })
}

export const useGetAddressById = (addressId: string) =>{
    return useQuery<SuccessResponse<ShipmentInfo>, ErrorResponse>({
        queryKey: ['shipment', addressId],
        queryFn: ()=>getAddressById(addressId)
    })
}

export const useCreateAddress = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<ShipmentInfo>, ErrorResponse, AddressType>({
        mutationFn: (shipmentInfo: AddressType) => createAddress(shipmentInfo),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['shipment']})
            toast.success('Shipment Address Added.')
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateAddress = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<ShipmentInfo>, ErrorResponse, {addressId: string, updateShipmentInfo: UpdateAddressType}>({
        mutationFn: ({addressId, updateShipmentInfo}) => updateAddress(addressId, updateShipmentInfo),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['shipment']})
            toast.success('Shipment Address updated.')
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}

export const useDeleteAddress = () => {
    const query = useQueryClient()

    return useMutation<SuccessResponse<ShipmentInfo>, ErrorResponse, string>({
        mutationFn: (addressId: string) => deleteAddress(addressId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['shipment']})
            toast.success("Shipment Address Removed.")
        },
        onError: (error) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useGetActiveAddress = () =>{
    return useQuery<SuccessResponse<ShipmentInfo>, ErrorResponse>({
        queryKey: ['shipment', 'active'],
        queryFn: ()=> getActiveAddress()
    })
}

export const useGetDefaultAddress = () => {
    return useQuery<SuccessResponse<ShipmentInfo>, ErrorResponse>({
        queryKey: ['shipment', 'default'],
        queryFn: ()=>getDefaultAddress()
    })
}

export const useUpdateActiveAddress = () =>{
    const query = useQueryClient()

    return useMutation<SuccessResponse<ShipmentInfo>, ErrorResponse, string>({
        mutationFn: (addressId: string)=>updateActiveAddress(addressId),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey: ['shipment']})
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })
}