import {create} from 'zustand'
import { persist } from 'zustand/middleware'


interface AdminState {
    username: string,
    setUsername: (username: string) => void,
    isSuperAdmin: boolean,
    setIsSuperAdmin: (isSuperAdmin: boolean) => void
}


export const useAdminState = create<AdminState>()(
    persist(
        (set)=>({
            username: "",
            setUsername: (username: string) => set(()=>({username})),
            isSuperAdmin: false,
            setIsSuperAdmin: (isSuperAdmin: boolean) => set(()=>({isSuperAdmin}))
        }),
        {
            name: 'admin-storage',
            partialize: (state) =>({
                username: state.username,
                isSuperAdmin: state.isSuperAdmin
            })
        }   
    )
)