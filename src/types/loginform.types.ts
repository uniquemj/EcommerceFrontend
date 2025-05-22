import type { LoginCredentials } from "./user.types";

export interface LoginFormProps{
    userType: string,
    handleLogin: (data: LoginCredentials) => void,
    registerLink: string
}