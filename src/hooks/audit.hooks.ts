import { getAutitLog } from "@/services/audit.api"
import type{ AuditTrailInfo } from "@/types/audit.types"
import type { PaginationField } from "@/types/pagination.types"
import type{ ErrorResponse, SuccessResponse } from "@/types/response.types"
import { useQuery } from "@tanstack/react-query"

export const useGetAuditLog = (pagination?:PaginationField) =>{
    return useQuery<SuccessResponse<AuditTrailInfo[]>, ErrorResponse>({
        queryKey: ['audit-log'],
        queryFn: ()=>getAutitLog(pagination)
    })
}