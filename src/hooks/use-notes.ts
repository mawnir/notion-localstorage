import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { noteType } from '../type';

type StoreState = {
    id: string;
    data: noteType[];
    setId: (newId: string) => void;
    setData: (newTodos: noteType[]) => void;
}

const useNoteStore = create<StoreState>()(
    persist(
        (set) => ({
            id: '',
            data: [],
            setId: (newId: string) => set({ id: newId }),
            setData: (newTodos: noteType[]) => set({ data: newTodos }),
        }),
        {
            name: 'note-storage',
            storage: createJSONStorage(() => localStorage), // sessionStorage  
        }
    )
);

export default useNoteStore;
