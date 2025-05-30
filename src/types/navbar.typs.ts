export interface NavMetaData{
    title: string,
    url: string,
    icons?: React.ReactNode,
    include: boolean,
    subItems?: NavMetaData[]
}


export interface UserInfo {
   name: string,
   email: string,
   initials: string,
   role: string,
   avatar: string | null,
}

export interface DataType{
    heading: string,
    user: UserInfo,
    menu: NavMetaData[]
}

export interface NavRoute{
    seller: NavMetaData[],
    admin: NavMetaData[]
}