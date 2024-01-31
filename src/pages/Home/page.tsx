import Editor from "@/components/NotionComps/Editor";
import Toolbar from "@/components/NotionComps/Toolbar";
import useNoteStore from "@/hooks/use-notes";
import { useRTL } from "@/hooks/use-rtl";
import { updateTodoById } from "@/lib/DBTools";
import { useEffect, useState } from "react";

const Page = () => {

    const { isRTL } = useRTL();
    const { id, findTodoById, storetodos, setStoreTodos } = useNoteStore();
    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.body);

    const onChange = async (content: string) => {

        const payload = {
            body: content,
        };
        const updated = updateTodoById(storetodos, id, payload);
        if (updated) {
            setStoreTodos(storetodos);
        }
    };

    const emptyNote = '[\n  {\n    "id": "edcd3828-a75f-4dff-8566-a10f4e61b95d",\n    "type": "heading",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "center",\n      "level": 3\n    },\n    "content": [\n      {\n        "type": "text",\n        "text": "Create or select a Page!",\n        "styles": {}\n      }\n    ],\n    "children": []\n  },\n  {\n    "id": "68f4d9ec-9d60-4824-8d3a-46ca63128014",\n    "type": "paragraph",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "left"\n    },\n    "content": [],\n    "children": []\n  }\n]'

    useEffect(() => {
        setValue(myTodo?.body);
        if (!id) {
            console.log("empty");
            setValue(emptyNote);
        }

    }, [id]);

    return (
        <div className="pb-40">

            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">

                <Toolbar />
                <Editor
                    onChange={onChange}
                    initialContent={value}
                    isrtl={isRTL} />
            </div>

        </div>
    );
}

export default Page;