import type { ImageInfo } from "./image.types"


export interface LoginCredentials{
    email: string,
    password: string
}

export interface LoginResponse<T>{
    token: string,
    user: T
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

export interface Customer extends Omit<User,'password'>{
    date_of_birth: Date,
}

export interface Seller extends Omit<User,'password'>{
    store_name: string,
    legal_document: Array<ImageInfo>,
    store_logo: Array<ImageInfo>,
    address: string,
    city: string,
    country: string,
    is_verified: boolean
}

export interface Admin extends Omit<User,'password'>{
    username: string,
    isSuperAdmin: boolean
}

export interface OtherAdminUpdate{
    fullname: string,
    password: string,
    isSuperAdmin: boolean
}

export interface AdminUpdate{
    fullname: string,
}

export interface PasswordUpdate{
    old_password: string,
    new_password: string
}

export interface BusinessInfo{
    store_name: string,
    legal_document: Array<unknown>,
    store_logo: Array<unknown>,
    address: string,
    city: string,
    country: string,
    phone_number: string
}

export type UpdateSellerInfo = Omit<BusinessInfo, 'legal_document store_logo'>

export interface UpdateCustomerInfo{
    fullname: string,
    phone_number: string,
    date_of_birth: string
}