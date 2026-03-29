import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import { useCan } from "@/hooks/use-can";
import { useHasRole } from "@/hooks/use-has-role";
import { route } from "@/lib/routes";
import { useWorkspace } from "@/services";
import { Role } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function WorkspaceSettingsRedirectInner({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const router = useRouter();
  const { workspace } = useWorkspace(workspaceId);

  const canUpdateWorkspace = useCan("update", "workspace", workspace.id);
  const canDeleteWorkspace = useCan("delete", "workspace", workspace.id);
  const isOwner = useHasRole(Role.OWNER, "workspace", workspace.id);

  useEffect(() => {
    if (canUpdateWorkspace) {
      void router.replace(route("workspace/settings/details", workspaceId));
    } else if (isOwner || canDeleteWorkspace) {
      void router.replace(route("workspace/settings/admin", workspaceId));
    } else {
      void router.replace(route("workspace", workspaceId));
    }
  }, [router, workspaceId, canUpdateWorkspace, isOwner, canDeleteWorkspace]);

  return (
    <div className="py-8">
      <Loader />
    </div>
  );
}

const WorkspaceSettingsIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const workspaceIdParam = router.query.workspaceId;
  const workspaceId =
    router.isReady &&
    typeof workspaceIdParam === "string" &&
    workspaceIdParam.length > 0
      ? workspaceIdParam
      : null;

  if (!router.isReady || workspaceId == null) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return <WorkspaceSettingsRedirectInner workspaceId={workspaceId} />;
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

WorkspaceSettingsIndexPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default WorkspaceSettingsIndexPage;
