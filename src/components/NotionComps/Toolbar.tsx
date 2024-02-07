import useNoteStore from "@/hooks/use-notes";
import { IconPicker } from "../IconPicker";
import TextareaAutosize from "react-textarea-autosize";
import { ElementRef, useEffect, useRef, useState } from "react";
import { findTodoById, updateTodoById } from "@/lib/DBTools";

const Toolbar = () => {
    const inputRef = useRef<ElementRef<"textarea">>(null);

    const { id, data, setData } = useNoteStore();
    const myTodo = findTodoById(id);
    const [value, setValue] = useState(myTodo?.name);

    const onIconSelect = async (icon: string) => {
        const payload = {
            icon: icon,
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    };

    const onInput = async (value: string) => {
        setValue(value);
        const payload = {
            name: value,
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            //disableInput();
        }
    };

    useEffect(() => {
        if (myTodo?.name === undefined && id) {
            setValue('Untitled');
        } else {
            setValue(myTodo?.name);
        }
    }, [id]);

    useEffect(() => {
        setValue(myTodo?.name);
    }, [data]);

    return (
        <div className="mt-14 pl-[54px] group relative">
            <div className="flex items-center gap-x-2 group/icon mr-3 mb-2">
                <IconPicker onChange={onIconSelect}>
                    <p className="text-4xl hover:opacity-75 transition">
                        {myTodo?.icon}
                    </p>
                </IconPicker>
            </div>

            <TextareaAutosize
                ref={inputRef}
                //onBlur={disableInput}
                onKeyDown={onKeyDown}
                value={value}
                onChange={(e) => onInput(e.target.value)}
                className="w-full text-4xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
            />
        </div>
    );
}

export default Toolbar;