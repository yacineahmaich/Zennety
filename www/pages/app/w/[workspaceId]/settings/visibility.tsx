import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import WorkspaceVisibility from "@/components/workspace/settings/workspace-visibility";
import WorkspaceSettingsShell from "@/components/workspace/workspace-settings-shell";
import { useCan } from "@/hooks/use-can";
import { route } from "@/lib/routes";
import { IWorkspace } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function WorkspaceVisibilityGate({ workspace }: { workspace: IWorkspace }) {
  const router = useRouter();
  const canUpdateWorkspace = useCan("update", "workspace", workspace.id);

  useEffect(() => {
    if (!canUpdateWorkspace) {
      void router.replace(route("workspace/settings", String(workspace.id)));
    }
  }, [canUpdateWorkspace, workspace.id, router]);

  if (!canUpdateWorkspace) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return <WorkspaceVisibility workspace={workspace} />;
}

const WorkspaceSettingsVisibilityPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <WorkspaceSettingsShell
      activeSection="visibility"
      pageTitle={t("workspace-settings-nav-visibility")}
    >
      {(workspace) => <WorkspaceVisibilityGate workspace={workspace} />}
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

WorkspaceSettingsVisibilityPage.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkspaceSettingsVisibilityPage;
