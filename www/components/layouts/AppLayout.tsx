import app from "@/lib/app";
import { groupWorkspacesByOwnership } from "@/lib/helpers";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useLogout, useMyWorkspaces, useUser, useWorkspace } from "@/services";
import {
  ChevronDownIcon,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  KanbanSquareIcon,
  LayersIcon,
  Loader2Icon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
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
    <div
      className={cn("flex transition-[padding]", collapsed ? "pl-12" : "pl-64")}
    >
      <aside
        className={cn(
          "fixed left-0 top-0 flex h-screen shrink-0 flex-col space-y-5 overflow-hidden border-r border-border bg-background px-4 pb-4 transition-[width]",
          collapsed ? "w-12" : "w-64"
        )}
      >
        <Logo
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed((c) => !c)}
        />

        {!collapsed && <SideNav />}
        {!collapsed && <UserDropdown />}
      </aside>
      <div className="min-w-[1024px] flex-1 p-4">
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
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useUser();
  const { workspaces, isLoading } = useMyWorkspaces();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace } = useWorkspace(+workspaceId);

  const groupedWorkspaces = groupWorkspacesByOwnership(workspaces || [], user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <LayersIcon size={20} className="mr-2" />
          <span>{workspace?.name || t("my-workspaces")}</span>
          <ChevronDownIcon size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        {isLoading ? (
          <Loader2Icon size={30} className="mx-auto my-6 animate-spin" />
        ) : (
          <>
            <DropdownMenuLabel>{t("my-workspaces")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {groupedWorkspaces.owner.map((workspace) => (
                <DropdownMenuItem key={workspace.id} asChild>
                  <Link
                    href={route("workspace", workspace.id)}
                    className="cursor-pointer"
                  >
                    <KanbanSquareIcon size={16} className="mr-2" />
                    <span>{workspace.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuLabel>{t("guest-workspaces")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {groupedWorkspaces.guest.map((workspace) => (
                <DropdownMenuItem key={workspace.id} asChild>
                  <Link
                    href={route("workspace", workspace.id)}
                    className="cursor-pointer"
                  >
                    <span>{workspace.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
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
        "-mx-4 flex h-20 items-center justify-between px-4 py-4",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && (
        <Link href={route("app")}>
          <div className="flex items-center gap-2">
            <img src={app.logoUrl} alt={app.name} className="h-10" />
            <span className="text-xl font-bold">{app.name}</span>
          </div>
        </Link>
      )}
      <Button size="icon" variant="link" onClick={toggleCollapsed}>
        {collapsed ? <ChevronRightSquareIcon /> : <ChevronLeftSquareIcon />}
      </Button>
    </div>
  );
};

const SideNav = () => {
  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden">
      <ul className="space-y-2">
        <li>
          <Button variant="ghost" className="justify-start" asChild>
            <a href="#" className="w-full">
              <KanbanSquareIcon className="mr-2" /> Boards
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const UserDropdown = () => {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto select-none overflow-hidden p-2"
        >
          <div className="mt-auto flex items-center gap-4 py-2">
            <img src={app.logoUrl} alt={app.name} className="h-7" />
            <div className="line-clamp-1 flex flex-col items-start">
              <span>{user?.name}</span>
              <small className="text-xs">{user?.email}</small>
            </div>
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
