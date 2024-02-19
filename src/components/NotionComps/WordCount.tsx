import { Button } from "../ui/button";
import { Star } from "lucide-react";
import useNoteStore from "@/hooks/use-notes";
import { findTodoById, updateTodoById } from "@/lib/DBTools";
import { Label } from "../ui/label";
import wordsCount from "@/lib/count-words";
import { convert } from 'html-to-text';

const WordCount = () => {

    const { id } = useNoteStore();

    const myTodo = findTodoById(id)?.body;

    return (
        <Label className="p-0 text-gray-400">
            {myTodo ? wordsCount(convert(myTodo), { punctuationAsBreaker: true }) : ""}
            {" "}Words
        </Label>
    );
}

export default WordCount;