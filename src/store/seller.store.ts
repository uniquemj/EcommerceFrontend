import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface SellerState{
    isVerified: boolean,
    setIsVerified: (status: boolean) => void,
    avatar: string | null,
    setAvatar: (avatar: string | null) => void
}


export const useSellerState = create<SellerState>()(
    persist(
        (set)=>({
            isVerified: false,
            setIsVerified: (isVerified: boolean) => set(()=>({isVerified})),
            avatar: null,
            setAvatar: (avatar: string | null) => set(()=>({avatar}))
        }),
        {
            name: "seller-storage",
            partialize: (state)=>({
                isVerfied: state.isVerified,
                avatar: state.avatar
            })
        }
    )
)



