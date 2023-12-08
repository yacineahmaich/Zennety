import { AppLayout } from "@/components/layouts";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { useMyWorkspaces, useUser } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Dashboard: NextPageWithLayout = () => {
  const { workspaces, isLoading } = useMyWorkspaces();
  const { user } = useUser();
  const { t } = useTranslation("common");

  if (isLoading) return <div></div>;

  // Group workspaces by user role (owner  => owner, else => guest)
  const groupedWorkspaces = workspaces?.reduce(
    (
      groups: { owner: App.Models.Workspace[]; guest: App.Models.Workspace[] },
      workspace
    ) => {
      const member = workspace.members?.find(
        (member) => member.id === user?.id
      );

      if (member?.role === "owner") {
        groups.owner.push(workspace);
      } else {
        groups.guest.push(workspace);
      }

      return groups;
    },
    { owner: [], guest: [] }
  );

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-tight text-muted-foreground">
          {t("your-workspaces")}
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
