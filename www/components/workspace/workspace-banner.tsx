import InviteMembers from "@/components/shared/invite-members";
import { Button, buttonVariants } from "@/components/ui/button";
import type { WorkspaceSettingsSection } from "@/components/workspace/workspace-settings-sections";
import { useCan } from "@/hooks/use-can";
import { useHasRole } from "@/hooks/use-has-role";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Role, Visibility } from "@/types/enums";
import { IWorkspace } from "@/types/models";
import {
  Globe2Icon,
  LockIcon,
  ShieldAlertIcon,
  UserPlusIcon,
  WrenchIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  workspace: IWorkspace;
  /** Sub-page navigation (workspace settings area only). */
  settingsActiveSection?: WorkspaceSettingsSection | null;
};

const WorkspaceBanner = ({
  workspace,
  settingsActiveSection = null,
}: Props) => {
  const { t } = useTranslation("common");
  const canInvite = useCan("update", "workspace", workspace.id);
  const canUpdateWorkspace = useCan("update", "workspace", workspace.id);
  const canDeleteWorkspace = useCan("delete", "workspace", workspace.id);
  const isOwner = useHasRole(Role.OWNER, "workspace", workspace.id);

  const showAdminNav = isOwner || canDeleteWorkspace;
  const wsId = String(workspace.id);

  const navClass = (section: WorkspaceSettingsSection) =>
    cn(
      buttonVariants({ size: "sm", variant: "ghost" }),
      "justify-start gap-2",
      settingsActiveSection === section &&
        "bg-accent text-accent-foreground hover:bg-accent/90"
    );

  return (
    <div className="-mx-4 border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={workspace.avatar} alt={workspace.name} />
              <AvatarFallback>{workspace.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-semibold">{workspace.name}</h2>
              <div className="flex gap-2 text-xs font-medium">
                <span>Premium</span>
                <p className="flex items-center space-x-1">
                  {workspace.visibility === Visibility.PRIVATE && (
                    <LockIcon size={16} />
                  )}
                  {workspace.visibility === Visibility.PUBLIC && (
                    <Globe2Icon size={16} />
                  )}
                  <span>{workspace.visibility}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canInvite && (
            <InviteMembers
              resourceType="workspace"
              resourceId={workspace.id}
              title={t("invite-to-workspace-title")}
              subtitle={t("invite-to-workspace-subtitle")}
              openTrigger={
                <Button size="sm" variant="secondary">
                  <UserPlusIcon size={20} />
                  <span className="ml-2 hidden md:block">
                    {t("invite-workspace-members")}
                  </span>
                </Button>
              }
            />
          )}
        </div>
      </div>
      {workspace.description && (
        <p className="mt-2 max-w-2xl break-all text-sm text-muted-foreground">
          {workspace.description}
        </p>
      )}
      {settingsActiveSection != null && (
        <nav
          className="mt-4 flex flex-wrap gap-1 border-t border-border pt-4"
          aria-label={t("workspace-settings")}
        >
          {canUpdateWorkspace && (
            <Link
              href={route("workspace/settings/details", wsId)}
              className={navClass("details")}
            >
              <WrenchIcon size={16} className="shrink-0 opacity-70" />
              {t("workspace-settings-nav-details")}
            </Link>
          )}
          {canUpdateWorkspace && (
            <Link
              href={route("workspace/settings/visibility", wsId)}
              className={navClass("visibility")}
            >
              <Globe2Icon size={16} className="shrink-0 opacity-70" />
              {t("workspace-settings-nav-visibility")}
            </Link>
          )}
          {showAdminNav && (
            <Link
              href={route("workspace/settings/admin", wsId)}
              className={navClass("admin")}
            >
              <ShieldAlertIcon size={16} className="shrink-0 opacity-70" />
              {t("workspace-settings-nav-admin")}
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default WorkspaceBanner;
