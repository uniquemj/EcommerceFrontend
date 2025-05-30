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
    warrantyPolicy: string
}

export enum ColorType {
  // Basic Colors
  White = "White",
  Black = "Black",
  Gray = "Gray",
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Yellow = "Yellow",
  Orange = "Orange",
  Pink = "Pink",
  Purple = "Purple",
  Brown = "Brown",
  Beige = "Beige",

  // Extended Colors
  NavyBlue = "Navy Blue",
  SkyBlue = "Sky Blue",
  LightBlue = "Light Blue",
  DarkGreen = "Dark Green",
  OliveGreen = "Olive Green",
  LimeGreen = "Lime Green",
  Maroon = "Maroon",
  Burgundy = "Burgundy",
  Coral = "Coral",
  Mint = "Mint",
  Teal = "Teal",
  Lavender = "Lavender",
  Peach = "Peach",
  Tan = "Tan",
  Charcoal = "Charcoal",
  Gold = "Gold",
  Silver = "Silver",
  RoseGold = "Rose Gold",
  Cyan = "Cyan",
  Magenta = "Magenta",

  // Optional/Fashion-centric
  Multicolor = "Multicolor",
  Transparent = "Transparent",
  NeonGreen = "Neon Green",
  NeonPink = "Neon Pink",
  DenimBlue = "Denim Blue",
  Khaki = "Khaki",
  Cream = "Cream",
  OffWhite = "Off White"
}


export enum SizeType {
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
