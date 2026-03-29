import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import DeleteWorkspace from "@/components/workspace/settings/delete-workspace";
import WorkspaceOwnershipTransfer from "@/components/workspace/settings/workspace-ownership-transfer";
import WorkspaceSettingsShell from "@/components/workspace/workspace-settings-shell";
import { useCan } from "@/hooks/use-can";
import { useHasRole } from "@/hooks/use-has-role";
import { route } from "@/lib/routes";
import { Role } from "@/types/enums";
import { IWorkspace } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function WorkspaceAdminGate({ workspace }: { workspace: IWorkspace }) {
  const router = useRouter();
  const isOwner = useHasRole(Role.OWNER, "workspace", workspace.id);
  const canDeleteWorkspace = useCan("delete", "workspace", workspace.id);

  const showAdmin = isOwner || canDeleteWorkspace;

  useEffect(() => {
    if (!showAdmin) {
      void router.replace(route("workspace/settings", String(workspace.id)));
    }
  }, [showAdmin, workspace.id, router]);

  if (!showAdmin) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isOwner && <WorkspaceOwnershipTransfer workspace={workspace} />}
      {canDeleteWorkspace && <DeleteWorkspace workspace={workspace} />}
    </div>
  );
}

const WorkspaceSettingsAdminPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <WorkspaceSettingsShell
      activeSection="admin"
      pageTitle={t("workspace-settings-nav-admin")}
    >
      {(workspace) => <WorkspaceAdminGate workspace={workspace} />}
    </WorkspaceSettingsShell>
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

WorkspaceSettingsAdminPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default WorkspaceSettingsAdminPage;
