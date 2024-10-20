import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSettings } from "@/hooks/use-settings";
import { useSearch } from "@/hooks/use-search";

export function NavMain() {

  const settings = useSettings();
  const search = useSearch();
  const handleHomeClick = () => {
    console.log('Home button clicked');
  };

  return (
    <SidebarMenu>

      <SidebarMenuItem key='Search'>
        <SidebarMenuButton asChild isActive={false} onClick={search.onOpen}>
          <a href={'#'}>
            <Search />
            <span>Search</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem key='Ask AI'>
        <SidebarMenuButton asChild isActive={false}>
          <a href={'#'}>
            <Sparkles />
            <span>Ask AI</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem key='Settings'>
        <SidebarMenuButton asChild isActive={false} onClick={settings.onOpen}>
          <a href={'#'}>
            <Settings2 />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem key='Home'>
        <SidebarMenuButton asChild isActive={false} onClick={() => handleHomeClick()}  >
          <a href={'#'}>
            <Home />
            <span>Home</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

    </SidebarMenu>
  )
}
