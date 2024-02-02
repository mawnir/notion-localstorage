
import { FloatingMenu, useEditor, BubbleMenu, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextDirection from "tiptap-text-direction";
import './styles.scss';
import { useEffect } from 'react';

export const Tiptap = ({ setDescription, tipDefault }: { setDescription: any, tipDefault: string | undefined }) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextDirection.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: tipDefault,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setDescription(html);
        },
    })

    useEffect(() => {
        // Check if the tipDefault has changed
        if (tipDefault !== editor?.getHTML()) {
            editor?.commands.setContent(tipDefault as Content);
        }
    }, [tipDefault, editor]);


    //BubbleMenu
    //https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/bubble-menu/index.tsx

    return (
        <div className="mt-6 mx-16">
            <>
                {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        Strike
                    </button>
                </BubbleMenu>}

                {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet List
                    </button>
                </FloatingMenu>}

                <EditorContent editor={editor} />
            </>
        </div>
    );
}