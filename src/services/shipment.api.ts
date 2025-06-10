import type { PaginationField } from "@/types/pagination.types";
import type { SuccessResponse } from "@/types/response.types";
import type { ShipmentInfo } from "@/types/shipment.type";
import { api } from "@/utils/api";
import type { AddressType, UpdateAddressType } from "@/validations/shipment.validate";

export const getAddressListOfCustomer = async(pagination:PaginationField):Promise<SuccessResponse<ShipmentInfo[]>> =>{
    const response = await api.get<SuccessResponse<ShipmentInfo[]>>('/shipment', {params: pagination})
    return response.data
}

export const getAddressById = async(addressId: string):Promise<SuccessResponse<ShipmentInfo>> =>{
    const response = await api.get<SuccessResponse<ShipmentInfo>>(`/shipment/${addressId}`)
    return response.data
}

export const createAddress = async(shipmentInfo: AddressType):Promise<SuccessResponse<ShipmentInfo>> => {
    const response = await api.post<SuccessResponse<ShipmentInfo>>(`/shipment`, shipmentInfo)
    return response.data
}

export const updateAddress = async(addressId: string, updateShipmentInfo: UpdateAddressType): Promise<SuccessResponse<ShipmentInfo>> => {
    const response = await api.put<SuccessResponse<ShipmentInfo>>(`/shipment/${addressId}`, updateShipmentInfo)
    return response.data
}

export const deleteAddress = async(addressId: string):Promise<SuccessResponse<ShipmentInfo>> => {
    const response = await api.delete<SuccessResponse<ShipmentInfo>>(`/shipment/${addressId}`)
    return response.data
}

export const getActiveAddress = async(): Promise<SuccessResponse<ShipmentInfo>> =>{
    const response = await api.get<SuccessResponse<ShipmentInfo>>(`/shipment/address/active`)
    return response.data
}

export const getDefaultAddress = async(): Promise<SuccessResponse<ShipmentInfo>> => {
    const response = await api.get<SuccessResponse<ShipmentInfo>>(`/shipment/address/default`)
    return response.data
}

export const updateActiveAddress = async(addressId: string): Promise<SuccessResponse<ShipmentInfo>> => {
    const response = await api.put<SuccessResponse<ShipmentInfo>>(`/shipment/address/active/${addressId}`)
    return response.data
}