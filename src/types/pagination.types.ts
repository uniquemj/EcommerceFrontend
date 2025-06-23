
export interface PaginationField{
    page: number,
    limit: number
}

export interface OrderStatCount{
    _id: string,
    totalQuantity: number,
    totalSale: number
}