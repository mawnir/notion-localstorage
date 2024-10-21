import {
  PlusCircle,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSettings } from "@/hooks/use-settings";
import { useSearch } from "@/hooks/use-search";
import { ModeToggle } from "./HomeComps/ModeToggle";
import { nanoid } from "nanoid";
import useNoteStore from "@/hooks/use-notes";

export function NavMain() {
  const { id, data, setData, setId } = useNoteStore();
  const settings = useSettings();
  const search = useSearch();

  const handleAddPage = () => {
    console.log(' clicked');
    const newFolder = {
      id: nanoid(),
      name: "Untitled",
      body: "",
      parentId: "",
      icon: "📄",
      isFavorite: false,
      isArchived: false,
      children: []
    };
    setData([newFolder, ...data]);
    setId(newFolder.id);
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
        <SidebarMenuButton asChild isActive={false} onClick={() => handleAddPage()}  >
          <a href={'#'}>
            <PlusCircle />
            <span>Add Page</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* <ModeToggle /> */}

    </SidebarMenu>
  )
}
