import Toolbar from "@/components/NotionComps/Toolbar";
import useNoteStore from "@/hooks/use-notes";
import { updateTodoById } from "@/lib/DBTools";
import { useEffect, useState } from "react";
import { Tiptap } from "@/components/tiptap";
import EmptyPage from "./EmptyPage";

const Page = () => {

    const { id, setId, findTodoById, storetodos, setStoreTodos } = useNoteStore();
    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.body);
    const [isEmpty, setisEmpty] = useState(false);

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

        if (id === undefined || id === '') {
            setisEmpty(true);
            console.log("1=>", isEmpty, id);
        } else {
            setisEmpty(false);
            setValue(myTodo?.body);
            console.log("2=>", isEmpty, id);
        }
        console.log("fin semp", isEmpty, id);
    }, [id]);

    return (
        <div className=" h-full">

            {!isEmpty ?
                <div className="pb-40 md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar />
                    <Tiptap
                        tipDefault={id ? (value ? value : "") : emptyNote}
                        setDescription={onChange} />
                </div>
                :
                <EmptyPage />
            }


        </div>
    );
}

export default Page;