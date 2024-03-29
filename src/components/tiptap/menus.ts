import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Heading4, Heading5,
    Italic, List,
    Pilcrow, Quote,
    Strikethrough, TerminalSquare,
    Underline,
    Subscript,
    Superscript
} from "lucide-react";

interface CommandProps {
    editor: any;
    range?: any;
}

const handleCommand = ({ editor, range }: any) => {
    if (range) {
        return editor.chain().focus().deleteRange(range)
    } else {
        return editor.chain().focus()
    }
}

const handleHeadingCommand = (props: CommandProps, level: number) => handleCommand(props).toggleHeading({ level }).run()

const isActive = (editor: any, type: string) => editor.isActive(type)

const isHeadingActive = (editor: any, level: number) => editor.isActive("heading", { level })

export const nodeMenus = [
    {
        title: "Heading 1",
        description: "Big section heading.",
        icon: Heading1,
        command: (props: CommandProps) => handleHeadingCommand(props, 1),
        isActive: (editor: any) => isHeadingActive(editor, 1)
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        icon: Heading2,
        command: (props: CommandProps) => handleHeadingCommand(props, 2),
        isActive: (editor: any) => isHeadingActive(editor, 2)
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        icon: Heading3,
        command: (props: CommandProps) => handleHeadingCommand(props, 3),
        isActive: (editor: any) => isHeadingActive(editor, 3)
    },
    {
        title: "Heading 4",
        description: "Smaller section heading.",
        icon: Heading4,
        command: (props: CommandProps) => handleHeadingCommand(props, 4),
        isActive: (editor: any) => isHeadingActive(editor, 4)
    },
    {
        title: "Paragraph",
        description: "Just start typing with plain text.",
        icon: Pilcrow,
        command: (props: CommandProps) => handleCommand(props).toggleNode("paragraph", "paragraph").run(),
        isActive: (editor: any) => isActive(editor, "paragraph")
    },
    {
        title: "Blockquote",
        description: "Create a blockquote.",
        icon: Quote,
        command: (props: CommandProps) => handleCommand(props).toggleBlockquote().run(),
        isActive: (editor: any) => isActive(editor, "blockquote")
    },
    {
        title: "Ordered List",
        description: "Create a ordered list.",
        icon: List,
        command: (props: CommandProps) => handleCommand(props).toggleOrderedList().run(),
        isActive: (editor: any) => isActive(editor, "orderedList")
    },
    {
        title: "CodeBlock",
        description: "Create a code block.",
        icon: TerminalSquare,
        command: (props: CommandProps) => handleCommand(props).toggleCodeBlock().run(),
        isActive: (editor: any) => isActive(editor, "codeBlock")
    }
]

export const markMenus = [
    {
        title: "Heading 1",
        description: "Big section heading.",
        icon: Heading1,
        command: (props: CommandProps) => handleHeadingCommand(props, 1),
        isActive: (editor: any) => isHeadingActive(editor, 1)
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        icon: Heading2,
        command: (props: CommandProps) => handleHeadingCommand(props, 2),
        isActive: (editor: any) => isHeadingActive(editor, 2)
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        icon: Heading3,
        command: (props: CommandProps) => handleHeadingCommand(props, 3),
        isActive: (editor: any) => isHeadingActive(editor, 3)
    },
    {
        title: "Bold",
        description: "Make text bold.",
        icon: Bold,
        command: (props: CommandProps) => handleCommand(props).toggleBold().run(),
        isActive: (editor: any) => isActive(editor, "bold")
    },
    {
        title: "Italic",
        description: "Make text italic.",
        icon: Italic,
        command: (props: CommandProps) => handleCommand(props).toggleItalic().run(),
        isActive: (editor: any) => isActive(editor, "italic")
    },
    {
        title: "Strikethrough",
        description: "Make text strikethrough.",
        icon: Strikethrough,
        command: (props: CommandProps) => handleCommand(props).toggleStrike().run(),
        isActive: (editor: any) => isActive(editor, "strike")
    },
    {
        title: "Superscript",
        description: "Make text superscript.",
        icon: Superscript,
        command: (props: CommandProps) => handleCommand(props).toggleSuperscript().run(),
        isActive: (editor: any) => isActive(editor, "superscript")
    },
    {
        title: "Code",
        description: "Make text code.",
        icon: Code,
        command: (props: CommandProps) => handleCommand(props).toggleCode().run(),
        isActive: (editor: any) => isActive(editor, "code")
    },
]

