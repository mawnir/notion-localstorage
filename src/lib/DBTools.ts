import useNoteStore from "@/hooks/use-notes";
import { noteType } from "@/type";

export function findTodoById(id: string) {
    const { data } = useNoteStore();
    const stack: noteType[] = [...data];

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
}

export function findTodoById2(id: string, data: noteType[]) {
    // const { data } = useNoteStore();
    const stack: noteType[] = [...data];

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
}

export function deleteObjectById(id: string, data: noteType[] | null) {
    // Function to recursively search and delete object by id
    function deleteById(obj: noteType) {
        // Check if the current object has children
        if (obj.children && obj.children.length > 0) {
            // Recursively call deleteById for each child
            obj.children = obj.children.filter(child => deleteById(child));
        }
        // Return true if the object's id matches the given id
        return obj.id !== id;
    }

    // Filter the data array to remove the object with the specified id
    const updatedData = data?.filter(obj => deleteById(obj));

    return updatedData; // Return the updated array
}

export function pushObjectById(data: noteType[], parentId: string | null, objectToAdd: noteType, index: number) {

    if (parentId === null || parentId === '') {
        // If parentId is empty, simply push the object at the root level
        data.splice(index, 0, objectToAdd);
        return data;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === parentId) {
            if (!data[i].children) {
                data[i].children = []; // Initialize children array if it doesn't exist
            }
            (data[i].children as noteType[]).splice(index, 0, objectToAdd);
            return data; // Return data after successful addition
        }
        //@ts-ignore
        if (data[i].children && data[i].children.length > 0) {
            //@ts-ignore
            const result = pushObjectById(data[i].children, parentId, objectToAdd);
            if (result) {
                return data; // Return data if parentId is found in children
            }
        }
    }
    return null; // Return null if parentId is not found
}


export function updateTodoById(testData: any[], id: string, updatedFields: any): boolean {
    for (const item of testData) {
        if (item.id === id) {
            // Update each field in the updatedFields object
            for (const field in updatedFields) {
                if (updatedFields.hasOwnProperty(field)) {
                    item[field] = updatedFields[field];
                }
            }
            return true; // Return true if the update is successful
        }

        // Recursively search in children if present
        if (item.children && item.children.length > 0) {
            if (updateTodoById(item.children, id, updatedFields)) {
                return true; // Return true if the update is successful
            }
        }
    }

    return false; // Return false if the ID is not found in the testData array
}

export function filterNonArchivedTodos(todos: noteType[]): noteType[] {

    let data: noteType[] = [];
    for (const item of todos) {
        if (!item.isArchived) {
            data.push({
                ...item,
                children: filterNonArchivedTodos(item.children || [])  // Recursively filter children
            });
        }
    }
    return data;
}

export function filterArchivedTodos(todos: noteType[]): noteType[] {
    let data: noteType[] = [];

    for (const item of todos) {
        if (item.isArchived) {
            data.push({ ...item });
        }
    }

    // Recursively filter children
    for (const item of todos) {
        if (item.children && item.children.length > 0) {
            data = data.concat(filterArchivedTodos(item.children));
        }
    }

    return data;
}