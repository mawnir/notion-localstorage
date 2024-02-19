import { MenuIcon } from "lucide-react";
import Title from "./Title";
import Favorite from "./Favorite";
import Menu from "./Menu";
import WordCount from "./WordCount";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {

    //   if (data === undefined) {
    //     return (
    //       <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
    //         <Title.Skeleton />
    //         <div className="flex items-center gap-x-2">
    //           {/* <Menu.Skeleton /> */}
    //         </div>
    //       </nav>
    //     )
    //   }

    //   if (data.length === 0) {
    //     return null;
    //   }

    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title />
                    <div className="flex items-center gap-x-2">
                        {/* <Publish initialData={data} /> */}
                        <WordCount />
                        <Favorite />
                        <Menu />
                    </div>
                </div>
            </nav>
        </>
    )
}