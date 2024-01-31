import { ChevronsLeftRight } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import MySvg from "../../assets/avatar74.svg";
export const UserItem = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={MySvg} />
                            <AvatarFallback className="text-white">M</AvatarFallback>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            Trud Mawn&apos;s Jotion
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        mawn@gmail.com
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={MySvg} />
                                <AvatarFallback className="text-white">M</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                Trud Mawn&apos;s Jotion
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                    <Button variant="ghost">
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}