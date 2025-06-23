import type { AuditTrailInfo } from "@/types/audit.types";
import type { PaginationField } from "@/types/pagination.types";
import type { SuccessResponse } from "@/types/response.types";
import { api } from "@/utils/api";



export const getAutitLog = async (pagination?: PaginationField):Promise<SuccessResponse<AuditTrailInfo[]>> => {
    const response = await api.get<SuccessResponse<AuditTrailInfo[]>>('/audit-log', {params: {...pagination}})
    return response.data
}