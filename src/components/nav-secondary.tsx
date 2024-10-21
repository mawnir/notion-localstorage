import React from "react"
import {
  Trash2,
  MessageCircleQuestion
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import TrashBox from "./NotionComps/TrashBox"
import { useMediaQuery } from "usehooks-ts"

export function NavSecondary({
  ...props
}: {
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>

          <Popover>
            <PopoverTrigger>
              <SidebarMenuItem key='Trash'>

                <SidebarMenuButton asChild isActive={false} onClick={() => { console.log('Trash') }}>
                  <a href={'#'}>
                    <Trash2 />
                    <span>Trash</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>

          <SidebarMenuItem key='Help'>
            <SidebarMenuButton asChild isActive={false}  >
              <a href={'#'}>
                <MessageCircleQuestion />
                <span>Help</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
