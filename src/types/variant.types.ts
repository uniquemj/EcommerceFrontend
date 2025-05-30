import type { ProductSchemaType } from "@/validations/product.validate"
import type { ImageInfo } from "./image.types"
import type { ProductInfo } from "./product.types"
import type { VariantSchemaType } from "@/validations/variants.validate"

export interface VariantInfo{
    readonly _id: string,
    product: Pick<ProductInfo, '_id' | 'name'>
    images: ImageInfo,
    color: string,
    size: string,
    price: number,
    stock: number,
    availability: boolean,
    packageWeight: number,
    packageLength: string
}


export interface VariantInput extends Pick<ProductSchemaType, 'variantImages'>, VariantSchemaType{
    
}