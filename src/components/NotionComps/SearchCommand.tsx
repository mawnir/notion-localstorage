import useNoteStore from "@/hooks/use-notes";
import { useSearch } from "@/hooks/use-search";
import { noteType } from "@/type";
import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { File } from "lucide-react";
import { flattenArrayWithChildren } from "@/lib/DBTools";

const SearchCommand = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [msearchDocs, setSearchDocs] = useState<noteType[] | null>(null);
    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);
    const { id, data, setId } = useNoteStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // const flattenedArray = flattenArrayWithChildren(data);
    // console.log(flattenedArray);

    useEffect(() => {
        const fetchDocs = async () => {
            if (!data) {
                setSearchDocs(null);
            }
            if (data) {
                setSearchDocs(flattenArrayWithChildren(data));
            }
        };
        fetchDocs();
    }, [isOpen]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        //router.push(`/documents/${id}`);
        setId(id)
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search Mawn's Jotion...`}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {msearchDocs?.map((document: noteType) => (
                        <CommandItem
                            key={document.id}
                            value={`${document.id}-${document.name}`}
                            title={document.name}
                            onSelect={() => onSelect(document.id)} >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {document.name}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>

    );
}

export default SearchCommand;