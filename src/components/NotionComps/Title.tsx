import useNoteStore from "@/hooks/use-notes";
import { Skeleton } from "../ui/skeleton";

const Title = () => {

    const { id, findTodoById } = useNoteStore();

    const myTodo = findTodoById(id);
    return (
        <div className="flex items-center gap-x-1">
            {!!myTodo?.icon && <p>{myTodo.icon}</p>}
            <span className="truncate font-normal h-auto p-1 text-sm">
                {myTodo?.name}
            </span>
        </div>
    );
}

Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-9 w-20 rounded-md" />
    );
};

export default Title;