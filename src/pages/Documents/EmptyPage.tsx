import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Emptyimg from "../../assets/empty.png";
import { nanoid } from "nanoid";
import { useSimpleTree } from "@/lib/use-simple-tree";
import useNoteStore from "@/hooks/use-notes";
import { noteType } from "@/type";
import { useEffect } from "react";

const EmptyPage = () => {

    const { id, setId } = useNoteStore();
    const [data, setData] = useSimpleTree<noteType>([]);

    const onCreate = async () => {
        const newFolder = {
            id: nanoid(),
            name: "Untitled",
            body: "",
            parentId: "",
            // readOnly: false,
            icon: "📄",
            isFavorite: false,
            isArchived: false,
            children: []
        };
        setData([newFolder, ...data]);
        setId(newFolder.id);
    }

    useEffect(() => {
        setData(data);
        //console.log(data);
    }, [data]);

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <img
                src={Emptyimg}
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />

            <h2 className="text-lg font-medium">
                Welcome to Mawn Trud&apos;s Jotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    );
}

export default EmptyPage;