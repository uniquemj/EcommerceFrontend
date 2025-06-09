interface PaginationResponse{
    page: number,
    limit: number,
    total_items: number,
    total_pages: number
}

export interface SuccessResponse<T>{
    message: string,
    success: boolean,
    data: T,
    paginationData?: PaginationResponse
}

interface ErrorInfo{
    message: string,
    success: boolean,
    errors: unknown[]
}

interface ErrorResponseInfo{
    data: ErrorInfo,
    status: number,
    statusText: string
}

export interface ErrorResponse{
    message: string,
    response: ErrorResponseInfo
}