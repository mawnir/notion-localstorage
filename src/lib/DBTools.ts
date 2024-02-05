import { noteType } from "@/type";


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