import {create} from 'zustand';

interface VariantSelectionState{
    selectedVariantId: string | null;
    setSelectedVariantId: (id: string|null) => void;
}

export const useVariantSelectionStore = create<VariantSelectionState>((set)=>({
    selectedVariantId: null,
    setSelectedVariantId: (id) => set({selectedVariantId: id})
}))