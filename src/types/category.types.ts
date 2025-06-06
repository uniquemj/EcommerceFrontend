export interface Category{
    readonly _id: string,
    title: string,
    parent_category?: Category
}

export interface CategoryInput{
    title: string,
    parent_category?: string
}

export interface CategoryTree{
    category: Category,
    children?: CategoryTree[]
}