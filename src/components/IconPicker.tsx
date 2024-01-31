"use client";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
//import { useTheme } from "next-themes";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

export interface Emoji {
    id: string
    name: string
    keywords: string[]
    native: string
    version: number
    emoticons?: string[]
}

enum Theme {
    DARK = "dark",
    LIGHT = "light",
    AUTO = "auto"
}

interface IconPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
};

export const IconPicker = ({
    onChange,
    children,
    asChild
}: IconPickerProps) => {
    //const { resolvedTheme } = useTheme();
    //const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

    const themeMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT
    };

    //const theme = themeMap[currentTheme];

    const handleEmojiPickup = (emoji: Emoji) => {
        console.log(emoji);
        onChange(emoji.native)
    };

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <Picker
                    data={data}
                    height={350}
                    theme={"light"}
                    onEmojiSelect={handleEmojiPickup}
                />

            </PopoverContent>
        </Popover>
    );
};
