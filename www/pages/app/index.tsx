import { AppLayout } from "@/components/layouts";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { groupWorkspacesByOwnership } from "@/lib/helpers";
import { useMyWorkspaces, useUser } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Dashboard: NextPageWithLayout = () => {
  const { workspaces, isLoading } = useMyWorkspaces();
  const { user } = useUser();
  const { t } = useTranslation("common");

  const groupedWorkspaces = groupWorkspacesByOwnership(workspaces || [], user);

  if (isLoading) return <div></div>;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-tight text-muted-foreground">
          {t("my-workspaces")}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {groupedWorkspaces?.owner.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-tight text-muted-foreground">
          {t("guest-workspaces")}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {groupedWorkspaces?.guest.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </section>
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

Dashboard.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
