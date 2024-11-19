import { AppLayout } from "@/components/layouts";
import Invitations from "@/components/shared/invitations";
import Members from "@/components/shared/members";
import WorkspaceBanner from "@/components/workspace/workspace-banner";
import { useCan } from "@/hooks/use-can";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const WorkspaceMembers: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace } = useWorkspace(workspaceId);

  const canViewInvitations = useCan("update", "workspace", +workspaceId);

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <div className="space-y-8 py-4">
        <Members resourceType="workspace" resourceId={workspace.id} />
        {canViewInvitations && (
          <Invitations resourceType="workspace" resourceId={workspace.id} />
        )}
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

WorkspaceMembers.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default WorkspaceMembers;
