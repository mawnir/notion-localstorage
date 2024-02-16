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
import { nanoid } from "nanoid";
import { filterNonArchivedTodos, pushObjectById, updateTodoById } from "@/lib/DBTools";

const DocumentList = () => {

    const { id, } = useNoteStore();

    const [data, setData, controller] = useSimpleTree<noteType>([]);

    const [term, setTerm] = useState("");

    const globalTree = (tree?: TreeApi<noteType> | null) => {
        // @ts-ignore
        window.tree = tree;
    };

    useEffect(() => {
        console.log(data);

    }, [data]);

    useEffect(() => {
        if (id === '') {

            console.log(data);
        }
    }, [id]);

    return (
        <div className="h-96">
            <div
                style={{
                    paddingLeft: 0 ? `${(0 * 12) + 12}px` : "12px"
                }}
                className={cn(
                    "group min-h-[27px] text-xs py-1 pr-3 w-full text-gray-400 font-medium"
                )}
            >
                Private
            </div>
            <FillFlexParent>
                {({ width, height }) => {
                    return (
                        <Tree
                            ref={globalTree}
                            //initialData={gmailData}
                            data={filterNonArchivedTodos(data)}{...controller}
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

    const { setId, data, setData } = useNoteStore();

    const openNote = () => {
        node.isInternal && node.toggle();
        setId(node.data.id);
    }

    const onIconSelect = async (icon: string) => {
        //node.data.icon = icon;

        const payload = {
            icon: icon,
        };

        const updated = updateTodoById(data, node.data.id, payload);
        if (updated) {
            setData(data);
        }
    };

    const onArchive = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        //node.data.isArchived = true;
        const payload = {
            isArchived: true,
        };

        const updated = updateTodoById(data, node.data.id, payload);
        if (updated) {
            setData(data);
        }

        setId('');
    };

    const onCreate = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();

        const newFolder: noteType = {
            parentId: node.data.id,
            id: nanoid(),
            name: "Untitled",
            body: "",
            // readOnly: false,
            icon: "📄",
            isFavorite: false,
            isArchived: false,
            children: []
        };

        // node.data.children?.push(newFolder);

        const xtad = pushObjectById(data, node.data.id, newFolder, 0);
        if (xtad) {
            setData(xtad)
        }
        setId(newFolder.id);
    };

    return (
        <div
            ref={dragHandle}
            style={style}
            className={clsx(styles.node, node.state, "group")}
            onClick={openNote}>

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
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" >
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

    if (node.children?.length === 0) {
        return <span></span>
    }

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