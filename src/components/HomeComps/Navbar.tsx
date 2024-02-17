"use client";

//import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {


    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">

                <Button variant="ghost" size="sm" asChild>
                    <a href="/documents">
                        Enter Jotion
                    </a>
                </Button>

                <ModeToggle />
            </div>
        </div>
    )
}