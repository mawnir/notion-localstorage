import React from "react";
import { BubbleMenu } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import ColorSetting from "./color-setting";
import { markMenus } from "../menus";
import LinkPopover from "./link-popover";
import HeadlineSetting from "./highlight-settig";

const Bubble = ({ editor }: any) => {
    return (
        <>
            {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100, maxWidth: 600 }}>
                <div className={'flex items-center scale-75 md:scale-90 p-1 bg-white border border-solid rounded-md'}>
                    {markMenus.map((item, index) => {
                        return (
                            <Toggle
                                key={index}
                                size="sm"
                                onClick={() => {
                                    item.command({ editor })
                                }}
                                pressed={item.isActive(editor)}
                            >
                                {React.createElement(item.icon)}
                            </Toggle>
                        )
                    })}
                    <LinkPopover editor={editor} />
                    <ColorSetting editor={editor} />
                    <HeadlineSetting editor={editor} />
                </div>
            </BubbleMenu>}
        </>
    );
}

export default Bubble