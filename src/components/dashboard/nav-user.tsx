import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { ThemeSubMenu } from "../theme-switcher";
import { signOut, useSession } from "next-auth/react";

export function NavUser() {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  console.log("Session data:", session);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.builtbybit?.member?.avatar_url}
                  alt={session?.user?.builtbybit?.member?.username}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user?.builtbybit?.member?.username
                    ?.slice(0, 2)
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user?.builtbybit?.member?.username}
                </span>
                <span className="truncate text-xs">
                  {session?.user?.builtbybit?.member?.discord_id}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.builtbybit?.member?.avatar_url}
                    alt={session?.user?.builtbybit?.member?.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.builtbybit?.member?.username
                      ?.slice(0, 2)
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user?.builtbybit?.member?.username}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.builtbybit?.member?.discord_id}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeSubMenu />
            <DropdownMenuSeparator />
            <DropdownMenu>
              <DropdownMenuItem
                onClick={() => signOut({ redirect: true, redirectTo: "/" })}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
