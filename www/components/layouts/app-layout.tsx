import Notifications from "@/components/_partials/notifications";
import SideNav from "@/components/_partials/side-nav";
import SidebarOrganizationSwitcher from "@/components/_partials/sidebar-organization-switcher";
import SidebarWorkspaces from "@/components/_partials/sidebar-workspaces";
import UserDropdown from "@/components/_partials/user-dropdown";
import WorkspacesDropdown from "@/components/_partials/workspaces-dropdown";
import ErrorBoundary from "@/components/shared/error-boundary";
import Loader from "@/components/shared/loader";
import Logo from "@/components/shared/logo";
import ThemeSwitcher from "@/components/shared/theme-switcher";
import CreateWorkspace from "@/components/workspace/create-workspace";
import { CreateOrganizationModalProvider } from "@/context/create-organization-modal-context";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/services/organization";
import {
  PlusCircleIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import AppBreadcrumb from "../_partials/app-breadcrumb";
import { Button } from "../ui/button";

function isMobile() {
  return window.innerWidth < 768;
}

const AppLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isOrganizationShellReady } = useOrganization();
  const [collapsed, setCollapsed] = useState(isMobile);

  /**
   * Collapse sidebar when navigating to other router on mobile
   */
  useEffect(() => {
    if (isMobile() && !collapsed) {
      setCollapsed(true);
    }
  }, [router.asPath]);

  return (
    <CreateOrganizationModalProvider>
      {!isOrganizationShellReady ? (
        <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-background">
          <Logo height={50} />
        </div>
      ) : (
        <div
          className={cn(
            "flex pl-12 transition-[padding]",
            !collapsed && "md:pl-64"
          )}
        >
          <div
            className={cn(
              "fixed inset-0 z-50 bg-black/80 md:hidden",
              collapsed && "hidden"
            )}
            onClick={() => setCollapsed(true)}
          />
          <aside
            className={cn(
              "fixed left-0 top-0 flex h-[100dvh] shrink-0 flex-col space-y-5 overflow-hidden border-r border-border bg-background px-4 pb-4 transition-[width]",
              collapsed ? "w-12" : "z-50 w-64"
            )}
          >
            {!collapsed && (
              <div className="-mx-4 shrink-0 border-b border-border px-4 pb-3 pt-3">
                <div className="min-w-0">
                  <SidebarOrganizationSwitcher />
                </div>
              </div>
            )}
            {!collapsed && <SideNav />}
            {!collapsed && <SidebarWorkspaces />}
            {!collapsed && <UserDropdown />}
          </aside>
          <div className="flex-1 overflow-x-auto px-4 py-3 pb-0">
            <header className="-mx-4 flex items-center justify-between border-b px-4 pb-3">
              <div className="flex -translate-x-4 items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0 -translate-x-1/3 rounded-l-none"
                  onClick={() => setCollapsed((c) => !c)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {collapsed ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
                </Button>
                <WorkspacesDropdown />
                <CreateWorkspace
                  openTrigger={
                    <Button size="sm">
                      <PlusCircleIcon size={20} />
                      <span className="ml-2 hidden sm:block">
                        {t("create")}
                      </span>
                    </Button>
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Notifications />
                <ThemeSwitcher />
              </div>
            </header>

            <AppBreadcrumb />

            <ErrorBoundary>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </ErrorBoundary>
          </div>
        </div>
      )}
    </CreateOrganizationModalProvider>
  );
};

export default AppLayout;
