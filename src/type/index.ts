export type noteType = {
    id: string,
    parentId: string,
    body: string,
    name: string,
    icon: string,
    isFavorite: boolean,
    isArchived: boolean,
    children: noteType[] | null,
}

