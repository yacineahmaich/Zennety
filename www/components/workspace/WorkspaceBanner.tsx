import { useCan } from "@/hooks/useCan";
import { Namespace, Visibility } from "@/types/enums";
import { Globe2Icon, LockIcon, UserPlusIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import InviteMembers from "../shared/InviteMembers";
import { Button } from "../ui/button";

const WorkspaceBanner = ({
  workspace,
}: {
  workspace?: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");
  const canInvite = useCan("update", Namespace.WORKSPACE, workspace?.id);

  return (
    <div className="w-full border-b p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-20 w-20 rounded-xl bg-accent shadow-xl">
              <img
                src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
                alt="logo"
                className="h-full w-full rounded-[inherit]"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold">{workspace?.name}</h2>
              <div className="flex gap-2 text-xs font-medium">
                <span>Premium</span>
                <p className="flex items-center space-x-1">
                  {workspace?.visibility === Visibility.PRIVATE && (
                    <LockIcon size={16} />
                  )}
                  {workspace?.visibility === Visibility.PUBLIC && (
                    <Globe2Icon size={16} />
                  )}
                  <span>{workspace?.visibility}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {canInvite && (
          <InviteMembers
            targetId={workspace?.id}
            namespace={Namespace.WORKSPACE}
            title={t("invite-to-workspace-title")}
            subtitle={t("invite-to-workspace-subtitle")}
            openTrigger={
              <Button size="sm" variant="secondary">
                <UserPlusIcon size={20} className="mr-2" />
                {t("invite-workspace-members")}
              </Button>
            }
          />
        )}
      </div>
      {workspace?.description && (
        <p className="mt-2 max-w-2xl break-all text-sm text-muted-foreground">
          {workspace.description}
        </p>
      )}
    </div>
  );
};

export default WorkspaceBanner;
