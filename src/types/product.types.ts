import type { Category } from "@/types/category.types";
import type { Seller } from "./user.types";
import type { VariantInfo } from "./variant.types";

export interface ProductInfo{
    readonly _id: string,
    seller: Pick<Seller, '_id' | 'store_name'>,
    name: string,
    category: Category,
    productDescription: string,
    productHighlights: string,
    archieveStatus: string,
    createdAt: Date,
    updatedAt: Date, 
    defaultVariant: VariantInfo,
    variants: VariantInfo[],
    dangerousGoods: string,
    warrantyType: string,
    warrantyPeriod: number,
    warrantyPolicy: string,
    sellCount: number
}

export enum ColorType {
  Beige = "Beige",
  Black = "Black",
  Blue = "Blue",
  Brown = "Brown",
  Burgundy = "Burgundy",
  Charcoal = "Charcoal",
  Coral = "Coral",
  Cream = "Cream",
  Cyan = "Cyan",
  DarkGreen = "Dark Green",
  DenimBlue = "Denim Blue",
  Gold = "Gold",
  Gray = "Gray",
  Green = "Green",
  Khaki = "Khaki",
  Lavender = "Lavender",
  LightBlue = "Light Blue",
  LimeGreen = "Lime Green",
  Magenta = "Magenta",
  Maroon = "Maroon",
  Mint = "Mint",
  Multicolor = "Multicolor",
  NavyBlue = "Navy Blue",
  NeonGreen = "Neon Green",
  NeonPink = "Neon Pink",
  OffWhite = "Off White",
  OliveGreen = "Olive Green",
  Orange = "Orange",
  Peach = "Peach",
  Pink = "Pink",
  Purple = "Purple",
  Red = "Red",
  RoseGold = "Rose Gold",
  Silver = "Silver",
  SkyBlue = "Sky Blue",
  Tan = "Tan",
  Teal = "Teal",
  Transparent = "Transparent",
  White = "White",
  Yellow = "Yellow"
}


export enum SizeType {
  NONE = "-",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",

  // Numeric sizes
  Size28 = "28",
  Size30 = "30",
  Size32 = "32",
  Size34 = "34",
  Size36 = "36",
  Size38 = "38",
  Size40 = "40",

  // Special / One Size
  OneSize = "One Size",
  FreeSize = "Free Size"
}

export enum DangerousGoods{
    No="no",
    ContainsBattery = "contains battery",
    Substance = 'flammables/liquid'
}

export enum WarrantyType{
    NoWarranty = "no warranty",
    SellerWarranty = "seller warranty"
}

export enum ArchieveStatus {
    Archieve = "archieve",
    UnArchieve = "unarchieve"
}


export type SearchProductParams = {
  keyword?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
};

export interface SearchProductResponse {
  count: number;
  products: ProductInfo[]
}