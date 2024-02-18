import { Extension } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { markMenus, nodeMenus } from "./menus";
import renderItem from "./render-item";

//https://slash.imyuanli.cn/
const SlashCommand: any = Extension
    .create({
        name: "SlashCommand",
        addOptions() {
            return {
                suggestion: {
                    char: '/',
                    command: ({ editor, range, props }: any) => {
                        console.log("range", range)
                        props.command({ editor, range });
                    }
                },
            }
        },
        addProseMirrorPlugins(): any {
            return [
                Suggestion({
                    editor: this.editor,
                    ...this.options.suggestion,
                }),
            ]
        },
    })
    .configure({
        suggestion: {
            items: () => [
                ...nodeMenus,
                // ...markMenus,
            ],
            render: renderItem,
        }
    })

export default SlashCommand