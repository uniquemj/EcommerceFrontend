import { UserRole } from '@/types/enum.types'
import { getInitialName } from '@/utils/helper'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthState{
    isAuthenticated: boolean,
    setIsAuthenticated: (status: boolean) => void,
    role: string,
    setRole: (inputRole: string) => void,
    fullname: string | null,
    setFullName: (name: string) => void,
    email: string | null,
    setEmail: (email: string) => void
    initials: string,
    setInitials: (name: string) => void
}


export const useAuth = create<AuthState>()(
    persist(
        (set) =>({
            isAuthenticated: false,
            setIsAuthenticated: (status: boolean) => set(()=>({isAuthenticated: status})),
            role: UserRole.ANONYMOUS,
            setRole: (inputRole: string) => set(()=>({role: inputRole})),
            fullname: null,
            setFullName: (name: string) => set(()=>({fullname: name})),
            email: null,
            setEmail: (email: string) => set(()=>({email})),
            initials: 'C',
            setInitials: (name: string) => set(()=>({initials: getInitialName(name)}))
        }),
        {
            name: 'auth-storage',
            partialize: (state)=>({
                isAuthenticated: state.isAuthenticated,
                role: state.role,
                fullname: state.fullname,
                email: state.email
            }),
            onRehydrateStorage: () => (state)=>{
                if(state?.fullname){
                    state.setInitials(state.fullname)
                }
            }
        }
    )
)