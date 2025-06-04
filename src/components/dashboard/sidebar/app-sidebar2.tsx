import { Home, Download, Search, Cog, Plus, Minus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { SearchForm } from "./search-form";

const data = {
  navMain: [
    {
      title: "BuiltByBit",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        { title: "User Lookup", url: "#", isActive: true },
        { title: "Resource Lookup", url: "#" },
        { title: "Settings", url: "/settings#builtbybit" },
      ],
    },
    {
      title: "Video Downloader",
      url: "#",
      icon: Download,
      isActive: false,
      items: [
        { title: "YouTube", url: "#" },
        { title: "Streamable", url: "#" },
        { title: "Settings", url: "/settings#video-downloader" },
      ],
    },
    {
      title: "Resource Checking",
      url: "#",
      icon: Search,
      isActive: false,
      items: [
        { title: "Minecraft Setup Checker", url: "#" },
        { title: "Roblox Checker", url: "#" },
        { title: "Spigot Search", url: "#" },
        { title: "Polymart Search", url: "#" },
        { title: "Settings", url: "/settings#resource-checking" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Cog,
      isActive: false,
      items: [
        { title: "BuiltByBit", url: "/settings#builtbybit" },
        { title: "Video Downloader", url: "/settings#video-downloader" },
        { title: "Resource Checking", url: "/settings#resource-checking" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
