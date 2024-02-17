import { cn } from "@/lib/utils";
import Emptyimg from "../../assets/avatar74.svg";

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <img
                src={Emptyimg}
                height="40"
                width="40"
                alt="Logo"
                className="dark:hidden"
            />
            <p className={cn("font-semibold")}>
                Jotion
            </p>
        </div>
    )
}