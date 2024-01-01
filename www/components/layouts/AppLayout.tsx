import app from "@/lib/app";
import { groupWorkspacesByOwnership } from "@/lib/helpers";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  useLogout,
  useMyWorkspaces,
  useNotifications,
  useUser,
} from "@/services";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  CircleDotIcon,
  FolderKanbanIcon,
  InboxIcon,
  KanbanSquareIcon,
  LayersIcon,
  MailWarningIcon,
  SettingsIcon,
  Trash2Icon,
  UserIcon,
  WalletCardsIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { ThemeSwitcher } from "../shared/ThemeSwitcher";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
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
          <div className="flex items-center gap-2">
            <Notifications />
            <ThemeSwitcher />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <InboxIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px] overflow-y-scroll p-3">
        <SheetHeader>
          <SheetTitle>Notifications(0)</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {notifications?.map((notification, i) => (
            <Link
              href={notification.link}
              key={notification.id}
              className="group flex items-center rounded-lg border p-3 ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2"
            >
              <div className="mr-2 self-start">
                {i % 2 === 0 ? (
                  <MailWarningIcon size={14} />
                ) : (
                  <CircleDotIcon size={14} />
                )}
                {/* <AlertCircleIcon size={14} /> */}
              </div>
              <div className="mr-4 self-start">
                <h2 className="text-xs font-semibold">
                  {notification.title}
                  {/* worksapce invitation */}
                </h2>
                <p className="line-clamp-2 text-xs">
                  {/* New Team action in the Sidebar doesn't open the Modal when it
                  was open once */}
                  {notification.description}
                </p>
              </div>
              <div className="ml-auto flex flex-col justify-end space-y-1 opacity-0 group-hover:opacity-100">
                <Button variant="outline" className="h-5 text-xs font-medium">
                  <CheckIcon size={14} />
                </Button>
                <Button variant="outline" className="h-5 text-xs font-medium">
                  <Trash2Icon size={14} />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const WorkspacesDropdown = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useUser();
  const { workspaces, isLoading } = useMyWorkspaces();
  const { workspaceId } = router.query as { workspaceId: string };

  const currentWorkspace = useMemo(() => {
    return workspaces?.find(
      (worksapce) => worksapce.id.toString() === workspaceId
    );
  }, [workspaceId]);

  const groupedWorkspaces = useMemo(() => {
    return groupWorkspacesByOwnership(workspaces, user);
  }, [workspaces?.length]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <LayersIcon size={20} className="mr-2" />
          <span>{currentWorkspace?.name || t("my-workspaces")}</span>
          <ChevronDownIcon size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        {groupedWorkspaces.owner.length > 0 && (
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
          </>
        )}
        {groupedWorkspaces.guest.length > 0 && (
          <>
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
  const { t } = useTranslation();

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden">
      <ul className="space-y-2 border-b border-accent pb-2">
        <li>
          <Link
            href={route("app")}
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-full justify-start"
            )}
          >
            <FolderKanbanIcon className="mr-2" /> {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-full justify-start [&[aria-disabled]]:cursor-not-allowed"
            )}
            aria-disabled
          >
            <WalletCardsIcon className="mr-2" /> {t("templates")}
          </Link>
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
