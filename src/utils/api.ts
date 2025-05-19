import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("USER_TOKEN")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})