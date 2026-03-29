import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import WorkspaceInformationForm from "@/components/workspace/workspace-information-form";
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

function WorkspaceDetailsGate({ workspace }: { workspace: IWorkspace }) {
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

  return <WorkspaceInformationForm workspace={workspace} />;
}

const WorkspaceSettingsDetailsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <WorkspaceSettingsShell
      activeSection="details"
      pageTitle={t("workspace-settings-nav-details")}
    >
      {(workspace) => <WorkspaceDetailsGate workspace={workspace} />}
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

WorkspaceSettingsDetailsPage.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkspaceSettingsDetailsPage;
