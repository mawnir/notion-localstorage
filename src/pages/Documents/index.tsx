
import "../../index.css";

import SideBarNotion from "@/components/NotionComps/SideBarNotion";

import SearchCommand from "@/components/NotionComps/SearchCommand";
import Page from "./page";

export default function Documents() {

    return (
        <div className="h-svh flex dark:bg-[rgb(31,31,31)]">

            <SideBarNotion />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                <Page />
            </main>

        </div>
    );
}
