import { AppLayout } from "@/components/layouts";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner";
import WorkspaceMembers from "@/components/workspace/WorkspaceMembers";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Workspace: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace } = useWorkspace(workspaceId);

  if (!workspace) return;

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <WorkspaceMembers workspace={workspace} />
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

Workspace.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Workspace;
