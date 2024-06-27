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
import { useWorkspace } from "@/services";
import { Role, Visibility } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import { Globe2Icon, LockIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const WorkspaceSettings: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace, isLoading } = useWorkspace(workspaceId);

  if (isLoading) return <Loader />;
  if (!workspace) return;

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <div className="py-4">
        <div className="space-y-8 p-8">
          <WorkspaceVisibility workspace={workspace} />
          <WorkspaceOwnershipTransfer workspace={workspace} />
          <DeleteWorkspace workspace={workspace} />
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

  return (
    <div>
      <h4 className="text-sm font-semibold">{t("workspace-visibility")}</h4>
      <div className="flex items-center gap-2">
        <p className="text-xs">
          This Workspace is private. It&apos;s not indexed or visible to those
          outside the Workspace.
        </p>
        <Select value={workspace.visibility}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a role" />
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
    </div>
  );
};

const WorkspaceOwnershipTransfer = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="-ml-4 rounded-lg border border-orange-400 bg-orange-100 p-4">
      <h4 className="mb-2 text-sm font-semibold">{t("workspace-ownership")}</h4>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs">
          Transfer workspace ownership to one of its admins.
        </p>
      </div>
      <Select
        value={workspace?.members
          ?.find((m) => m.role === Role.OWNER)
          ?.userId?.toString()}
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
      <Button variant="warning-outline" className="mt-2" size="sm">
        Transfer ownership
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

  return (
    <div className="-ml-4 flex flex-col space-y-2 rounded-lg border border-destructive bg-destructive/10 p-4">
      <h4 className="text-sm font-semibold">{t("danger-zone")}</h4>
      <p className="text-xs">This is permanent and can&apos;t be undone.</p>
      <Button variant="destructive-outline" className="w-fit">
        Delete workspace
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
