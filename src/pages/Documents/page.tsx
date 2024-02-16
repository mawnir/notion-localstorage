import Toolbar from "@/components/NotionComps/Toolbar";
import useNoteStore from "@/hooks/use-notes";
import { findTodoById, updateTodoById } from "@/lib/DBTools";
import { useEffect, useState } from "react";
import { Tiptap } from "@/components/tiptap";
import EmptyPage from "./EmptyPage";
import Banner from "@/components/NotionComps/Banner";

const Page = () => {

    const { id, setId, data, setData } = useNoteStore();
    const isArchived = findTodoById(id)?.isArchived;

    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.body);
    const [isEmpty, setisEmpty] = useState(false);

    const onChange = async (content: any) => {
        const payload = {
            body: content,
        };
        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
        setValue(myTodo?.body);
    };

    const emptyNote = '<h1 dir="ltr">Create or select your Page!</h1>';

    useEffect(() => {
        if (id === undefined || id === '') {
            setisEmpty(true);
        } else {
            setisEmpty(false);
            setValue(myTodo?.body);
        }
    }, [id]);

    return (
        <div className=" h-full">
            {!isEmpty ?
                <div className="pb-40 md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar />
                    {data && isArchived && (
                        <Banner />
                    )}

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