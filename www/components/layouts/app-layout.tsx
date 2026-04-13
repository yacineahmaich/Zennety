import Notifications from "@/components/_partials/notifications";
import SideNav from "@/components/_partials/side-nav";
import SidebarLogo from "@/components/_partials/sidebar-logo";
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
import app from "@/lib/app";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/services/organization";
import { ArrowUpRight, GithubIcon, PlusCircleIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import AppBreadcrumb from "../_partials/app-breadcrumb";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
            "flex pl-14 transition-[padding]",
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
              "fixed left-0 top-0 flex h-[100dvh] shrink-0 flex-col overflow-hidden border-r border-border bg-background pb-4 transition-[width]",
              collapsed ? "w-14 px-1" : "z-50 w-64 px-4"
            )}
          >
            <SidebarLogo
              collapsed={collapsed}
              toggleCollapsed={() => setCollapsed((c) => !c)}
            />
            <SidebarOrganizationSwitcher collapsed={collapsed} />
            <SideNav collapsed={collapsed} />
            <SidebarWorkspaces collapsed={collapsed} />
            <div
              className={cn(
                "mt-auto flex pt-2",
                collapsed ? "flex-col items-center gap-1" : "flex-col gap-2"
              )}
            >
              {collapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <a
                        href={app.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("star-on-github")}
                      >
                        <GithubIcon size={16} />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {t("star-on-github")}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Card className="w-full overflow-hidden shadow-none">
                  <a
                    href={app.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    <GithubIcon size={16} className="shrink-0" />
                    <span className="min-w-0 flex-1 leading-snug">
                      {t("star-on-github")}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-muted-foreground"
                    />
                  </a>
                </Card>
              )}
              <ThemeSwitcher collapsed={collapsed} className="w-full" />
            </div>
          </aside>
          <div className="flex-1 overflow-x-auto px-4 py-3 pb-0">
            <header className="-mx-4 flex items-center justify-between border-b px-4 pb-3">
              <div className="flex items-center gap-2">
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
                <UserDropdown />
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
