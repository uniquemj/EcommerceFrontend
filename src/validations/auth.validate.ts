import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, "Password must be at least 8 character.")
}).strict()

export const adminLoginSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(5, "Password must be at least 5 character.")
}).strict()

export const customerRegisterSchema = z.object({
    firstname: z.string().trim().min(3, "First Name must be at least 3 character.").max(20, "First Name must be at most 10 character.").regex(/^[A-Za-z]+$/, {message: "Only Alphabets allowed."}),
    lastname: z.string().trim().min(3, "Last Name must be at least 3 character").max(20, "Last Name must be at most 20 character.").regex(/^[A-Za-z]+$/, {message: "Only Alphabets allowed."}),
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, "Password must be at least 8 character."),
    confirm_password: z.string().min(8, "Password must be at least 8 character."),
}).strict().refine((data)=>data.password===data.confirm_password, {
    message: "Password and Confirm Password doesn't match.",
    path: ['password']
})

export const sellerRegisterSchema = z.object({
    firstname: z.string().trim().min(3, "First Name must be at least 3 character.").max(20, "First Name must be at most 10 character.").regex(/^[A-Za-z]+$/, {message: "Only Alphabets allowed."}),
    store_name: z.string().min(3, "Store name must be at least 3 character").max(20, "Store name must be at most 20 character.").trim().regex(/^[A-Za-z ]+$/, {message: "Only Alphabets allowed."}),
    lastname: z.string().trim().min(3, "Last Name must be at least 3 character").max(20, "Last Name must be at most 20 character.").regex(/^[A-Za-z]+$/, {message: "Only Alphabets allowed."}),
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, "Password must be at least 8 character."),
    confirm_password: z.string().min(8, "Password must be at least 8 character."),
}).strict().refine((data)=>data.password===data.confirm_password, {
    message: "Password and Confirm Password doesn't match.",
    path: ['password']
})

export const resendEmailSchema = z.object({
    email: z.string().email()
}).strict()