import { BlockNoteEditor } from "@blocknote/core";

import {
    BlockNoteView,
    useBlockNote,
    lightDefaultTheme,
    Theme,
} from "@blocknote/react";
import "@blocknote/core/style.css";


interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
    isrtl?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable,
    isrtl,
}: EditorProps) => {

    const rtlValue = isrtl ? "rtl" : "ltr";

    // const themeRTLLight = {
    //     ...lightDefaultTheme,
    //     componentStyles: (theme: any) => ({
    //         Editor: {
    //             direction: rtlValue,
    //             //dir: "rtl",
    //             // textAlign: "unset",
    //         },
    //         Menu: {
    //             direction: "ltr",
    //         },
    //         Toolbar: {
    //             direction: "ltr",
    //         },
    //     }),
    // } satisfies Theme;

    const editor: BlockNoteEditor = useBlockNote({
        //editable,
        initialContent:
            initialContent
                ? JSON.parse(initialContent) //as PartialBlock[]
                : undefined,
        onEditorContentChange: (editor: BlockNoteEditor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },

        //uploadFile: handleUpload,
    }, [initialContent])

    return (
        <div>
            <BlockNoteView
                editor={editor}
            //theme={resolvedTheme === "dark" ? themeRTLDark : themeRTLLight}

            />
        </div>
    );
}

export default Editor;