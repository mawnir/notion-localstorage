import useNoteStore from "@/hooks/use-notes";
import { useSimpleTree } from "@/lib/use-simple-tree";
import { noteType } from "@/type";
import { useEffect, MouseEvent, useState, useRef } from "react";
import { CursorProps, NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { FillFlexParent } from "../TreeBarComps/FillFlexParent";
import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Trash } from "lucide-react";
import { IconPicker } from "../IconPicker";
import clsx from "clsx";
import styles from "../TreeBarComps/treebar.module.css";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { log } from "console";
import { nanoid } from "nanoid";
import { filterNonArchivedTodos } from "@/lib/DBTools";

const DocumentList = () => {

    const { id, storetodos, setStoreTodos } = useNoteStore();

    const [data, setData, controller] = useSimpleTree<noteType>(storetodos);

    const [term, setTerm] = useState("");

    const globalTree = (tree?: TreeApi<noteType> | null) => {
        // @ts-ignore
        window.tree = tree;
    };

    useEffect(() => {
        setStoreTodos(data);
    }, [data]);

    useEffect(() => {
        if (id === '') {
            setData(filterNonArchivedTodos(storetodos))
        }
    }, [id]);

    useEffect(() => {
        if (!areArraysEqual(storetodos, data) && id !== '') {
            setData(filterNonArchivedTodos(storetodos))
        }
    }, [storetodos, id]); // this effect runs whenever storetodos or id change

    const areArraysEqual = (arr1: noteType[], arr2: noteType[]): boolean => {
        return (
            arr1.length === arr2.length &&
            arr1.every((value, index) => value === arr2[index])
        );
    };

    return (
        <div className="h-96">
            <div
                style={{
                    paddingLeft: 0 ? `${(0 * 12) + 12}px` : "12px"
                }}
                className={cn(
                    "group min-h-[27px] text-xs py-1 pr-3 w-full text-gray-400 font-medium"
                )} >
                Private
            </div>
            <FillFlexParent>
                {({ width, height }) => {
                    return (
                        <Tree
                            ref={globalTree}
                            //initialData={gmailData}
                            data={data}{...controller}
                            rowHeight={27}
                            //width={480}
                            width={width}
                            openByDefault={false}
                            height={height}
                            renderCursor={Cursor}
                            searchTerm={term}
                            paddingBottom={32}
                            selection={id}
                        //disableEdit={(data) => data.readOnly}
                        >
                            {Node}
                        </Tree>
                    );
                }}
            </FillFlexParent>
        </div>
    );
}

function Node({ node, style, dragHandle }: NodeRendererProps<noteType>) {

    const { setId } = useNoteStore();

    const openNote = () => {
        node.isInternal && node.toggle();
        setId(node.data.id);
    }

    const onIconSelect = async (icon: string) => {
        node.data.icon = icon
    };

    const onArchive = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        node.data.isArchived = true;
        setId('');
    };

    const onCreate = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();

        const newFolder: noteType = {
            id: nanoid(),
            name: "Untitled",
            body: "",
            // readOnly: false,
            icon: "📄",
            isFavorite: false,
            isArchived: false,
            children: []
        };

        node.data.children?.push(newFolder);

        //setData(() => [newFolder, ...storetodos]);
        setId(newFolder.id);

    };

    return (
        <div
            ref={dragHandle}
            style={style}
            className={clsx(styles.node, node.state, "group")}
            onClick={openNote}
        >
            <FolderArrow node={node} />

            <IconPicker onChange={onIconSelect}>
                <p className="shrink-0 ml-1 mr-2 text-[18px]">
                    {node.data.icon}
                </p>
            </IconPicker>

            <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
            <div className="ml-auto flex items-center gap-x-2 mr-3">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        onClick={(e) => e.stopPropagation()}
                        asChild >
                        <div
                            role="button"
                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side="right"
                        forceMount >
                        <DropdownMenuItem
                            onClick={onArchive} >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="text-xs text-muted-foreground p-2">
                            Last edited by: Mawn Trud
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div
                    role="button"
                    onClick={onCreate}
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                    <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}

function Input({ node }: { node: NodeApi<noteType> }) {
    return (
        <input
            autoFocus
            type="text"
            defaultValue={node.data.name}
            onFocus={(e) => e.currentTarget.select()}
            onBlur={() => node.reset()}
            onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") node.submit(e.currentTarget.value);
            }}
        />
    );
}

function FolderArrow({ node }: { node: NodeApi<noteType> }) {
    if (node.isLeaf) return <span></span>;
    return (
        <span>
            {node.isOpen ? <ChevronDown /> : <ChevronRight />}
        </span>
    );
}

function Cursor({ top, left }: CursorProps) {
    return <div className={styles.dropCursor} style={{ top, left }}></div>;
}

export default DocumentList;