import Notifications from "@/components/_partials/notifications";
import SideNav from "@/components/_partials/side-nav";
import SidebarLogo from "@/components/_partials/sidebar-logo";
import SidebarWorkspaces from "@/components/_partials/sidebar-workspaces";
import UserDropdown from "@/components/_partials/user-dropdown";
import WorkspacesDropdown from "@/components/_partials/workspaces-dropdown";
import ErrorBoundary from "@/components/shared/error-boundary";
import Loader from "@/components/shared/loader";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import CreateWorkspace from "@/components/workspace/create-workspace";
import { cn } from "@/lib/utils";
import { PropsWithChildren, Suspense, useState } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex pl-12 transition-[padding]",
        !collapsed && "md:pl-64"
      )}
    >
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen shrink-0 flex-col space-y-5 overflow-hidden border-r border-border bg-background px-4 pb-4 transition-[width]",
          collapsed ? "w-12" : "w-64"
        )}
      >
        <SidebarLogo
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed((c) => !c)}
        />
        {!collapsed && <SideNav />}
        {!collapsed && <SidebarWorkspaces />}
        {!collapsed && <UserDropdown />}
      </aside>
      <div className="flex-1 overflow-x-auto p-4 pb-0">
        <header className="mb-10 flex h-10 items-center justify-between">
          <div className="space-x-2">
            <WorkspacesDropdown />
            <CreateWorkspace />
          </div>
          <div className="flex items-center gap-2">
            <Notifications />
            <ThemeSwitcher />
          </div>
        </header>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AppLayout;
