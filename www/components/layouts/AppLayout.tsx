import app from "@/lib/app";
import { cn } from "@/lib/utils";
import { useLogout, useUser } from "@/services";
import {
  AlignRightIcon,
  ChevronDownIcon,
  KanbanSquareIcon,
  LayersIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "../shared/ThemeSwitcher";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CreateWorkspace from "../workspace/CreateWorkspace";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <aside
        className={cn(
          "flex h-screen shrink-0 flex-col space-y-5 overflow-hidden border-r border-border px-4 pb-4",
          collapsed ? "w-auto" : "w-64"
        )}
      >
        <Link href="/app">
          <Logo
            collapsed={collapsed}
            toggleCollapsed={() => setCollapsed((c) => !c)}
          />
        </Link>
        <SideNav collapsed={collapsed} />
        <UserDropdown collapsed={collapsed} />
      </aside>
      <div className="flex-1 p-4">
        <header className="mb-10 flex items-center justify-between">
          <div className="space-x-2">
            <WorkspacesDropdown />
            <CreateWorkspace />
          </div>
          <ThemeSwitcher />
        </header>
        {children}
      </div>
    </div>
  );
};

const WorkspacesDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <LayersIcon size={20} className="mr-2" /> My workspace
          <ChevronDownIcon size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        <DropdownMenuLabel>My workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <UserIcon size={20} className="mr-2" />
              Ecowat
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <SettingsIcon size={20} className="mr-2" />
              Ecotaqa
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuLabel>My workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <UserIcon size={20} className="mr-2" />
              Eshop
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Logo = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  return (
    <div
      className={cn(
        "-mx-4 flex h-20 items-center justify-between  border-border px-4 py-4",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && (
        <div className="flex items-center gap-2">
          <img src={app.logoUrl} alt={app.name} className="h-10" />
          <span className="text-xl font-bold">{app.name}</span>
        </div>
      )}
      <Button
        size="icon"
        variant="ghost"
        className="!p-0"
        onClick={toggleCollapsed}
      >
        <AlignRightIcon size={20} />
      </Button>
    </div>
  );
};

const SideNav = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <nav className="flex-1">
      <ul className="space-y-2 overflow-y-auto">
        <li>
          <Button variant="ghost" className="justify-start" asChild>
            <a
              href="#"
              className="flex w-full items-center gap-3 overflow-hidden"
            >
              <KanbanSquareIcon />
              {!collapsed && <span>Boards</span>}
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const UserDropdown = ({ collapsed }: { collapsed: boolean }) => {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto select-none overflow-hidden p-2"
        >
          <div
            className={cn(
              "mt-auto flex items-center gap-4 py-2",
              collapsed && "justify-center"
            )}
          >
            <img src={app.logoUrl} alt={app.name} className="h-7" />
            {!collapsed && (
              <div className="line-clamp-1 flex flex-col items-start">
                <span>{user?.name}</span>
                <small className="text-xs">{user?.email}</small>
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <UserIcon size={20} className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <SettingsIcon size={20} className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="mt-4" asChild>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppLayout;
