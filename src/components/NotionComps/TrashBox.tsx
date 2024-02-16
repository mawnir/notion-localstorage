import { Search, Trash, Undo } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { noteType } from "@/type";
import { ConfirmModal } from "../modals/ConfirmModal";
import { deleteObjectById, filterArchivedTodos, updateTodoById } from "@/lib/DBTools";
import useNoteStore from "@/hooks/use-notes";

const TrashBox = () => {

    const { id, setId, data, setData } = useNoteStore();

    const [search, setSearch] = useState("");

    const dataArchived: noteType[] = filterArchivedTodos(data);

    //console.log("dataArchived", data);

    const filteredDocuments = dataArchived?.filter((dataArchived: any) => {
        return dataArchived.name.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        setId(documentId)
    };
    const onRestore = async (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        document: noteType,
    ) => {
        const payload = {
            isArchived: false,
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    }
    const onRemove = async (documentId: string,) => {
        const updatedData = deleteObjectById(documentId, data);

        if (updatedData) {
            setData(updatedData);
            setId('')
        }
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>

            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((data: noteType) => (
                    <div
                        key={data.id}
                        role="button"
                        onClick={() => onClick(data.id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {data.name}
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, data)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(data.id)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TrashBox;