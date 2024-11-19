import InviteMembers from "@/components/shared/invite-members";
import { Button } from "@/components/ui/button";
import { useCan } from "@/hooks/use-can";
import { Visibility } from "@/types/enums";
import { IWorkspace } from "@/types/models";
import { Globe2Icon, LockIcon, UserPlusIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import UpdateWorkspace from "./update-workspace";

const WorkspaceBanner = ({ workspace }: { workspace: IWorkspace }) => {
  const { t } = useTranslation("common");
  const canInvite = useCan("update", "workspace", workspace.id);

  return (
    <div className="-mx-4 border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-20 w-20 rounded-xl bg-accent shadow-xl">
              <img
                src={workspace.avatar}
                alt={workspace.name}
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
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
          {canInvite && (
            <UpdateWorkspace key={workspace.id} workspace={workspace} />
          )}
        </div>
      </div>
      {workspace.description && (
        <p className="mt-2 max-w-2xl break-all text-sm text-muted-foreground">
          {workspace.description}
        </p>
      )}
    </div>
  );
};

export default WorkspaceBanner;
