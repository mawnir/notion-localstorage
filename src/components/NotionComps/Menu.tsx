import { MoreHorizontal, Trash, WrapText } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRTL } from "@/hooks/use-rtl";
import useNoteStore from "@/hooks/use-notes";
import { updateTodoById } from "@/lib/DBTools";

const Menu = () => {

    const { toggleRTL } = useRTL();
    const { id, data, setData } = useNoteStore();


    const onArchive = async () => {
        const payload = {
            isArchived: true,
            //   name: 'A whole new description.',
        };

        const updated = updateTodoById(data, id, payload);
        if (updated) {
            setData(data);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleRTL}>
                    <WrapText className="h-4 w-4 mr-2" />
                    Text Direction
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by: Mawnir
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
}

export default Menu;