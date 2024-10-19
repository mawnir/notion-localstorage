import "../../index.css";

import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Page from "./page";

export default function Dashboard() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Page />
            </main>
        </SidebarProvider>
    );
}
