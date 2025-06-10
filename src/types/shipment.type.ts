export interface ShipmentInfo{
    readonly _id: string,
    customer_id: string,
    full_name: string,
    email: string,
    phone_number: string,
    region: string,
    city: string,
    address: string,
    isDefault: boolean,
    isSelected: boolean
}

export enum Province {
  Province1 = "Koshi Province",
  Province2 = "Madhesh Province",
  Province3 = "Bagmati Province",
  Province4 = "Gandaki Province",
  Province5 = "Lumbini Province",
  Province6 = "Karnali Province",
  Province7 = "Sudurpashchim Province",
}