import { FloatingMenu, useEditor, BubbleMenu, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextDirection from "tiptap-text-direction";
import './styles.scss';
import { useEffect } from 'react';
import Bubble from './bubble';
import SlashCommand from './command';
import Link from '@tiptap/extension-link'
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";

export const Tiptap = ({ setDescription, tipDefault, editable = true }: { setDescription: any, tipDefault: string | undefined, editable?: boolean }) => {

    const editor = useEditor({
        extensions: [
            SlashCommand,
            StarterKit,
            Link,
            Color,
            TextStyle,
            Highlight.configure({
                multicolor: true,
            }),
            Placeholder.configure({
                emptyNodeClass: 'is-empty',
                placeholder: `Press '/' to insert a command`,
            }),
            TextDirection.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: tipDefault,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setDescription(html);
        },
        editable,
    })

    useEffect(() => {
        // Check if the tipDefault has changed
        if (tipDefault !== editor?.getHTML()) {
            editor?.commands.setContent(tipDefault as Content);
        }
    }, [tipDefault, editor]);

    useEffect(() => {
        editor?.setEditable(editable);
    }, [editable, editor]);

    //Bubble and slash from https://slash.imyuanli.cn/

    return (
        <div className="mt-6 mx-16">
            <>
                {editable && <Bubble editor={editor} />}
                <EditorContent editor={editor} />
            </>
        </div>
    );
}