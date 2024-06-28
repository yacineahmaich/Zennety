import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner";
import { useCan } from "@/hooks/useCan";
import { useHasRole } from "@/hooks/useHasRole";
import {
  useDeleteWorkspace,
  useTransferWorkspaceOwnership,
  useUpdateWorkspace,
  useWorkspace,
} from "@/services";
import { Role, Visibility } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import { Globe2Icon, LoaderIcon, LockIcon, SettingsIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";

const WorkspaceSettings: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace, isLoading } = useWorkspace(workspaceId);

  const isOwner = useHasRole(Role.OWNER, "workspace", workspace?.id);
  const canUpdateWorkspace = useCan("update", "workspace", workspace?.id);

  if (isLoading) return <Loader />;
  if (!workspace) return;

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <div className="py-4">
        <span className="mb-4 flex items-center">
          <SettingsIcon size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">{t("Workspace Settings")}</h2>
        </span>
        <div className="space-y-8 pl-4">
          {canUpdateWorkspace && <WorkspaceVisibility workspace={workspace} />}
          {isOwner && <WorkspaceOwnershipTransfer workspace={workspace} />}
          {isOwner && <DeleteWorkspace workspace={workspace} />}
        </div>
      </div>
    </div>
  );
};

const WorkspaceVisibility = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");
  const { updateWorkspace, isLoading } = useUpdateWorkspace();

  const handleVisibilityChange = (visibility: string) => {
    updateWorkspace({
      workspaceId: workspace.id,
      data: {
        visibility,
      },
    });
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">{t("workspace-visibility")}</h4>
      <div className="mb-4 mt-1 flex items-center gap-2">
        <p className="text-xs">
          This Workspace is private. It&apos;s not indexed or visible to those
          outside the Workspace.
        </p>
      </div>
      <Select
        value={workspace.visibility}
        onValueChange={handleVisibilityChange}
      >
        <SelectTrigger className="w-fit">
          {isLoading ? (
            <LoaderIcon size={14} className="animate-spin" />
          ) : (
            <SelectValue placeholder="Select a role" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Visibility.PRIVATE}>
            <div className="flex items-center gap-2">
              <LockIcon size={16} /> <span>{Visibility.PRIVATE}</span>
            </div>
          </SelectItem>
          <SelectItem value={Visibility.PUBLIC}>
            <div className="flex items-center gap-2">
              <Globe2Icon size={16} /> <span>{Visibility.PUBLIC}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const WorkspaceOwnershipTransfer = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");
  const [newOwner, setNewOwner] = useState<string>();

  const { transferWorkspaceOwnership, isLoading } =
    useTransferWorkspaceOwnership();

  const owner = workspace?.members?.find(
    (m) => m.role === Role.OWNER
  ) as App.Models.Member;

  const handleTrasferOwnership = () => {
    if (!newOwner || newOwner === owner?.userId?.toString()) return;

    transferWorkspaceOwnership({
      workspaceId: workspace.id,
      newOwner,
    });
  };

  return (
    <div className="-ml-4 rounded-lg border border-orange-400 bg-orange-100 p-4">
      <h4 className="text-sm font-semibold">{t("workspace-ownership")}</h4>
      <div className="mb-4 mt-1 flex items-center gap-2">
        <p className="text-xs">
          Transfer workspace ownership to one of its admins.
        </p>
      </div>
      <Select
        defaultValue={owner?.userId?.toString()}
        onValueChange={(value) => setNewOwner(value)}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {workspace?.members
            ?.filter((member) =>
              [Role.ADMIN, Role.OWNER].includes(member.role as Role)
            )
            .map((member) => (
              <SelectItem value={member.userId.toString()} key={member.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 object-cover">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {member?.profile?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.profile?.name}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button
        variant="warning-outline"
        className="mt-2"
        onClick={handleTrasferOwnership}
      >
        {isLoading ? "Transfering..." : "Transfer ownership"}
      </Button>
    </div>
  );
};

const DeleteWorkspace = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");

  const { deleteWorkspace, isLoading } = useDeleteWorkspace();

  return (
    <div className="-ml-4 flex flex-col rounded-lg border border-destructive bg-destructive/10 p-4">
      <div>
        <h4 className="text-sm font-semibold">{t("danger-zone")}</h4>
        <p className="mb-4 mt-1 text-xs">
          This is permanent and can&apos;t be undone.
        </p>
      </div>
      <Button
        variant="destructive-outline"
        className="w-fit"
        onClick={() => deleteWorkspace({ workspaceId: workspace.id })}
      >
        {isLoading ? "Deleting..." : "Delete workspace"}
      </Button>
    </div>
  );
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

WorkspaceSettings.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default WorkspaceSettings;
