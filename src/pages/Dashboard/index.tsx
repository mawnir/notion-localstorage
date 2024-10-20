import "../../index.css";

import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Page from "./page";
import { useEffect } from "react";
import SearchCommand from "@/components/NotionComps/SearchCommand";
import { SettingsModal } from "@/components/NotionComps/SettingsModal";

export default function Dashboard() {

    useEffect(() => {
        document.title = "Dashboard"; // Set your desired title here
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <SearchCommand />
                <SettingsModal />
                <Page />
            </main>
        </SidebarProvider>
    );
}
