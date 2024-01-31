import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { noteType } from '../type';

type StoreState = {
    id: string;
    storetodos: noteType[];
    setId: (newId: string) => void;
    setStoreTodos: (newTodos: noteType[]) => void;
    findTodoById: (id: string) => noteType | undefined;
}

const useNoteStore = create<StoreState>()(
    persist(
        (set) => ({
            id: '',
            storetodos: [],
            setId: (newId: string) => set({ id: newId }),
            setStoreTodos: (newTodos: noteType[]) => set({ storetodos: newTodos }),
            findTodoById: (id: string) => {
                const { storetodos } = useNoteStore(); // Importing storetodos here
                const stack: noteType[] = [...storetodos];

                while (stack.length > 0) {
                    const currentTodo = stack.pop();

                    if (!currentTodo) {
                        continue;
                    }

                    if (currentTodo.id === id) {
                        return currentTodo;
                    }

                    if (currentTodo.children) {
                        stack.push(...currentTodo.children);
                    }
                }

                return undefined;
            },
        }),
        {
            name: 'note-storage',
            storage: createJSONStorage(() => localStorage), // sessionStorage  
        }
    )
);

export default useNoteStore;
