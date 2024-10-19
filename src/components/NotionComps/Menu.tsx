import { useState } from "react";
import { MoreHorizontal, Trash, WrapText, History } from "lucide-react";

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
import { updateTodoById, getVersionHistory } from "@/lib/DBTools";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NoteVersionHistory from "./NoteVersionHistory";

type NoteVersion = {
    id: string;
    content: string;
    updated_at: string;
    note_id: string;
};

const Menu = () => {
    const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
    const [versionHistory, setVersionHistory] = useState<NoteVersion[]>([]);
    const { toggleRTL } = useRTL();
    const { id, data, setData } = useNoteStore();

    const onArchive = async () => {
        const payload = {
            isArchived: true,
        };

        const updated = updateTodoById(data, id, payload);
        if (await updated) {
            setData(data);
        }
    }

    const onVersionHistory = async () => {
        const history: NoteVersion[] = [
            {
                id: "UHLaxSXJ4uhhLPYsirf_p_1", // Updated to unique ID
                content: `<p>Dummy Data</p><p></p>`, // Valid HTML content
                updated_at: "2023-10-01T10:00:00Z",
                note_id: "UHLaxSXJ4uhhLPYsirf_p"
            },
            {
                id: "UHLaxSXJ4uhhLPYsirf_p_2", // Updated to unique ID
                content: `<p>Dummy Content with some corrections.</p>`, // Updated to valid HTML
                updated_at: "2023-10-02T12:30:00Z",
                note_id: "UHLaxSXJ4uhhLPYsirf_p"
            },
            {
                id: "UHLaxSXJ4uhhLPYsirf_p_3", // Updated to unique ID
                content: `<p>Dummy Last version after review.</p>`, // Updated to valid HTML
                updated_at: "2023-10-03T15:45:00Z",
                note_id: "UHLaxSXJ4uhhLPYsirf_p"
            }
        ];
        setVersionHistory(history);
        setIsVersionHistoryOpen(true);
    };

    return (
        <>
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
                    <DropdownMenuItem onClick={onVersionHistory}>
                        <History className="h-4 w-4 mr-2" />
                        Version History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="text-xs text-muted-foreground p-2">
                        Last edited by: Mawnir
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <NoteVersionHistory
                isOpen={isVersionHistoryOpen}
                onClose={() => setIsVersionHistoryOpen(false)}
                versionHistory={versionHistory}
            />
        </>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
}

export default Menu;