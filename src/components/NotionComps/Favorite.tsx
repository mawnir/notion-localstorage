import { Button } from "../ui/button";
import { Star } from "lucide-react";
import useNoteStore from "@/hooks/use-notes";
import { findTodoById, updateTodoById } from "@/lib/DBTools";

const Favorite = () => {

    const { id, data, setData } = useNoteStore();

    const myTodo = findTodoById(id);

    const onFav = async () => {
        const payload = {
            isFavorite: !myTodo?.isFavorite,
            //   name: 'A whole new description.',
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    }

    return (
        <Button className="p-0" variant={"ghost"} onClick={onFav}>
            {myTodo?.isFavorite ?
                <Star fill="orange"
                    className="text-orange-300 w-5 h-5"
                />
                :
                <Star
                    className="text-orange-300 w-5 h-5"
                />}
        </Button>
    );
}

export default Favorite;