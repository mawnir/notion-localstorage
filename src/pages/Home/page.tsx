import Toolbar from "@/components/NotionComps/Toolbar";
import useNoteStore from "@/hooks/use-notes";
import { updateTodoById } from "@/lib/DBTools";
import { useEffect, useState } from "react";
import { Tiptap } from "@/components/tiptap";

const Page = () => {

    const { id, findTodoById, storetodos, setStoreTodos } = useNoteStore();
    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.body);

    const onChange = async (content: any) => {
        const payload = {
            body: content,
        };
        const updated = updateTodoById(storetodos, id, payload);
        if (updated) {
            setStoreTodos(storetodos);
        }
        setValue(myTodo?.body);
    };

    const emptyNote = '<h1 dir="ltr">Create or select your Page!</h1>';

    useEffect(() => {
        setValue(myTodo?.body);
    }, [id]);

    return (
        <div className="pb-40">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar />
                <Tiptap
                    tipDefault={id ? (value ? value : "") : emptyNote}
                    setDescription={onChange} />
            </div>
        </div>
    );
}

export default Page;