import { AppLayout } from "@/components/layouts";
import Invitations from "@/components/shared/Invitations";
import Members from "@/components/shared/Members";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const WorkspaceMembers: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace } = useWorkspace(workspaceId);

  if (!workspace) return;

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <Members resourceType="workspace" resourceId={workspace.id} />
      <Invitations resourceType="workspace" resourceId={workspace.id} />
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

WorkspaceMembers.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default WorkspaceMembers;
