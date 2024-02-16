import { useMemo, useState } from "react";
import {
    CreateHandler,
    DeleteHandler,
    MoveHandler,
    RenameHandler,
} from "./handlers";
import { SimpleTree } from "react-arborist";
import { noteType } from "@/type";
import useNoteStore from "@/hooks/use-notes";
import { deleteObjectById, findTodoById2, pushObjectById } from "./DBTools";

let nextId = 0;

export function useSimpleTree<T extends noteType>(initialData: readonly T[]) {

    const { data, setData } = useNoteStore(); // Access data and setData from your Zustand store
    const tree = useMemo(
        () =>
            new SimpleTree<// @ts-ignore
                T>(data),
        [data]
    );

    const onMove: MoveHandler<T> = (args: {
        dragIds: string[];
        parentId: null | string;
        index: number;
    }) => {
        for (const id of args.dragIds) {
            //- tree.move({ id, parentId: args.parentId, index: args.index });
            const sdata = moveData(id, args.parentId, data, args.index);
            if (sdata) {
                setData(sdata)
            }
        }

        //- setData(tree.data);
    };

    const onRename: RenameHandler<T> = ({ name, id }) => {
        tree.update({ id, changes: { name } as any });
        setData(tree.data);
    };

    const onCreate: CreateHandler<T> = ({ parentId, index, type }) => {
        const data = { id: `KOI-tree-id-${nextId++}`, name: "name" } as any;
        if (type === "internal") data.children = [];
        tree.create({ parentId, index, data });
        setData(tree.data);
        return data;
    };

    const onDelete: DeleteHandler<T> = (args: { ids: string[] }) => {
        args.ids.forEach((id) => tree.drop({ id }));
        setData(tree.data);
    };

    const controller = { onMove, onRename, onCreate, onDelete };

    return [data, setData, controller] as const;
}

function moveData(id: string, parentId: string | null, data: noteType[], index: number) {

    console.log(id, parentId, index);

    const clonedData = JSON.parse(JSON.stringify(data));

    const movedObject = findTodoById2(id, data);

    if (!movedObject) return;

    const jh = deleteObjectById(id, clonedData);
    const d3 = pushObjectById(jh ? jh : clonedData, parentId, movedObject, index);

    //console.log("move data: ", d3);
    return d3 as noteType[];
}