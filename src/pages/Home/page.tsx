import Toolbar from "@/components/NotionComps/Toolbar";
import useNoteStore from "@/hooks/use-notes";
import { useRTL } from "@/hooks/use-rtl";
import { updateTodoById } from "@/lib/DBTools";
import { useEffect, useState } from "react";
import { Editor } from "novel";

const Page = () => {

    const { isRTL } = useRTL();
    const { id, findTodoById, storetodos, setStoreTodos } = useNoteStore();
    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.body);

    const onChange = async (content: any) => {

        //console.log(content.getJSON())

        const payload = {
            body: content.getJSON(),
        };
        const updated = updateTodoById(storetodos, id, payload);
        if (updated) {
            setStoreTodos(storetodos);
        }

        setValue(myTodo?.body);
    };

    const emptyNote = "no data";

    useEffect(() => {
        setValue(myTodo?.body);
        if (!id) {
            console.log("empty");
            setValue(emptyNote);
        }
        console.log(value);
    }, [id]);

    return (
        <div className="pb-40">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">

                <Toolbar />

                <Editor
                    key={id}
                    disableLocalStorage={true}
                    className="shadow-none max-h-screen"
                    defaultValue={value}
                    onUpdate={(e: any) => {
                        onChange(e)
                    }} />
            </div>

        </div>
    );
}

export default Page;