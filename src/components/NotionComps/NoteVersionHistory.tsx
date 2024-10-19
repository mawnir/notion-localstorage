'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tiptap } from '../tiptap/tiptap'
import { findTodoById, updateTodoById } from "@/lib/DBTools";
import useNoteStore from '@/hooks/use-notes'

type NoteVersion = {
    id: string
    content: string
    updated_at: string
    note_id: string
}

interface NoteVersionHistoryProps {
    isOpen: boolean;
    onClose: () => void;
    versionHistory: NoteVersion[];
}

export default function NoteVersionHistory({ isOpen, onClose, versionHistory }: NoteVersionHistoryProps) {
    const [currentNote, setCurrentNote] = useState<NoteVersion | null>(null)
    const [versions, setVersions] = useState<NoteVersion[]>([])
    const [isEditable, setIsEditable] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { id, setId, data, setData } = useNoteStore();

    const myTodo = findTodoById(id);
    console.log(currentNote?.id);

    useEffect(() => {
        if (versionHistory.length > 0) {
            setVersions(versionHistory)
            setCurrentNote(versionHistory[0])
        }
    }, [versionHistory])

    const restoreVersion = (version: NoteVersion) => {
        setCurrentNote(version)
    }

    const onChange = async (content: any) => {
        // const payload = {
        //     body: content,
        // };
        // const updated = updateTodoById(data, id, payload);
        // if (await updated) {
        //     setData(data);
        // }
        // setValue(myTodo?.body);
    };

    const handleRestore = async () => {
        if (currentNote && myTodo) {
            const payload = {
                body: JSON.parse(currentNote.content),
            };
            const updated = await updateTodoById(data, id, payload);

            if (updated) {
                setId(id);
                onClose();
                window.location.reload(); // Refresh the page
            }
        }
        setIsConfirmOpen(false);
    };

    if (!currentNote) return null

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0">
                    <Card className="h-full flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <CardContent className="p-6 flex-1 overflow-auto">
                                <h1 className="text-2xl font-bold mb-4">{myTodo?.name}</h1>
                                <Tiptap
                                    tipDefault={currentNote.content}
                                    setDescription={onChange}
                                    editable={isEditable} />
                            </CardContent>
                        </div>
                        <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col">
                            <h2 className="text-lg font-semibold mb-4">Version history</h2>
                            <ScrollArea className="flex-1">
                                {versions.map((version) => (
                                    <div
                                        key={version.id}
                                        className={`cursor-pointer ${currentNote === version ? 'bg-gray-100' : ''} hover:bg-gray-100 rounded p-1.5`}
                                        onClick={() => restoreVersion(version)}
                                    >
                                        <div className="text-sm font-medium">{new Date(version.updated_at).toLocaleString()}</div>
                                        <div className="text-sm font-medium">Mawnir Fas</div>
                                    </div>
                                ))}
                            </ScrollArea>

                            <Button
                                className="w-full mt-4"
                                onClick={() => setIsConfirmOpen(true)}
                            >
                                Restore
                            </Button>

                            <div className="text-xs text-center mt-2 text-gray-500">
                                <Button variant="link" className="p-0 h-auto text-xs">Learn more</Button>
                            </div>
                        </div>
                    </Card>
                </DialogContent>
            </Dialog>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Confirm Restore</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to restore this version? This action cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
                        <Button onClick={handleRestore}>Confirm Restore</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}