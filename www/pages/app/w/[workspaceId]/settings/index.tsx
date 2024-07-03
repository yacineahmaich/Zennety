import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/Loader";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner";
import DeleteWorkspace from "@/components/workspace/settings/DeleteWorkspace";
import WorkspaceOwnershipTransfer from "@/components/workspace/settings/WorkspaceOwnershipTransfer";
import WorkspaceVisibility from "@/components/workspace/settings/WorkspaceVisibility";
import { useCan } from "@/hooks/useCan";
import { useHasRole } from "@/hooks/useHasRole";
import { useWorkspace } from "@/services";
import { Role } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import { SettingsIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

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
          <h2 className="text-lg font-semibold">{t("workspace-settings")}</h2>
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
