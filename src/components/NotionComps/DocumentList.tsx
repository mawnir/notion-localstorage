import useNoteStore from "@/hooks/use-notes";
import { useSimpleTree } from "@/lib/use-simple-tree";
import { noteType } from "@/type";
import { useEffect, useState } from "react";
import { CursorProps, NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { FillFlexParent } from "../TreeBarComps/FillFlexParent";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IconPicker } from "../IconPicker";
import clsx from "clsx";
import styles from "../TreeBarComps/treebar.module.css";
import { cn } from "@/lib/utils";

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
        setData(storetodos);
    }, [storetodos]);

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

    function openNote() {
        node.isInternal && node.toggle();
        setId(node.data.id)
    }

    const onIconSelect = async (icon: string) => {
        node.data.icon = icon
    };

    return (
        <div
            ref={dragHandle}
            style={style}
            className={clsx(styles.node, node.state)}
            onClick={openNote}
        >
            <FolderArrow node={node} />

            <IconPicker onChange={onIconSelect}>
                <p className="shrink-0 ml-1 mr-2 text-[18px]">
                    {node.data.icon}
                </p>
            </IconPicker>

            <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
            {/* <span>{node.data.unread === 0 ? null : node.data.unread}</span> */}
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