import type { ImageInfo } from "@/types/image.types"

export interface ProductVariant{
    _id: string,
    product: {
        _id: string,
        seller: string,
        name: string
    },
    images: ImageInfo,
    color: string,
    size:string,
    price: number,
    stock: number
}
export interface CartItem{
    productVariant: ProductVariant,
    quantity: number,
    _id: string
}

export interface CartInfo{
    _id: string,
    customer: string,
    items: CartItem[]
}

export interface CartTotal{
    delivery_fee: number, 
    subTotal: number, 
    total: number
}
