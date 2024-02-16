import useNoteStore from "@/hooks/use-notes";
import { ConfirmModal } from "../modals/ConfirmModal";
import { Button } from "../ui/button";
import { deleteObjectById, findTodoById, findTodoById2, pushObjectById, updateTodoById } from "@/lib/DBTools";

const Banner = () => {
    const { id, setId, data, setData } = useNoteStore();

    const onRemove = async () => {
        console.log(id);

        const updatedData = deleteObjectById(id, data);

        if (updatedData) {
            setData(updatedData);
            setId('')
        }

    }
    const onRestore = async () => {

        const payload = {
            isArchived: false,
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    }

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is in the Trash.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
}

export default Banner;