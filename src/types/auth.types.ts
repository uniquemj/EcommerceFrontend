import type { ImageInfo } from "./image.types"

export interface LoginCredentials{
    email: string,
    password: string
}

export interface CustomerRegisterInfo{
    fullname: string,
    email: string,
    password: string
}

export interface SellerRegisterInfo{
    fullname: string,
    store_name: string,
    email: string,
    password: string
}

export interface AdminRegisterInfo{
    fullname: string,
    username: string,
    email:  string,
    isSuperAdmin: boolean,
    password: string
}

interface User{
    _id: string,
    fullname: string,
    email: string,
    password: string,
    phone_number: string,
    is_email_verified: boolean,
    code: string,
    readonly role: string
}

export interface Customer extends User{
    date_of_birth: Date,
}

export interface Seller extends User{
    store_name: string,
    legal_document: Array<ImageInfo>,
    store_logo: Array<ImageInfo>,
    address: string,
    city: string,
    country: string
}

export interface Admin extends User{
    username: string,
    isSuperAdmin: boolean
}