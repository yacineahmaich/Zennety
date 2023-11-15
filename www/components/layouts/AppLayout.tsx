import app from "@/lib/app";
import { cn } from "@/lib/utils";
import { useLogout, useUser } from "@/services";
import {
  AlignRightIcon,
  KanbanSquareIcon,
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

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <div className="flex">
      <aside
        className={cn(
          "flex h-screen flex-col space-y-5 overflow-hidden border-r border-border px-4 pb-4",
          collapsed ? "w-auto" : "w-64"
        )}
      >
        <div
          className={cn(
            "-mx-4 flex h-20 items-center justify-between  border-border px-4 py-4",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src={app.logoUrl} alt={app.name} className="h-10" />
              <span className="text-xl font-bold">Zennety</span>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="!p-0"
            onClick={() => setCollapsed((c) => !c)}
          >
            <AlignRightIcon size={20} />
          </Button>
        </div>

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
      </aside>
      <div className="flex-1 p-4">
        <header className="flex items-center justify-end">
          <ThemeSwitcher />
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
