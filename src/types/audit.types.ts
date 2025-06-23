export interface AuditTrailInfo{
    _id: string,
    url: string,
    userId: string,
    activity: string,
    params: string,
    query: string,
    payload: string,
    response: string,
    createdAt: string,
    updatedAt: string
}
