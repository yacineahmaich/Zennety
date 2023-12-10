import BoardCard from "@/components/board/BoardCard";
import { AppLayout } from "@/components/layouts";
import { buttonVariants } from "@/components/ui/button";
import { groupWorkspacesByOwnership } from "@/lib/helpers";
import { useMyWorkspaces, useUser } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { KanbanSquareIcon, SettingsIcon, UserIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Dashboard: NextPageWithLayout = () => {
  const { workspaces, isLoading } = useMyWorkspaces();
  const { user } = useUser();

  const groupedWorkspaces = groupWorkspacesByOwnership(workspaces || [], user);

  if (isLoading) return <div></div>;

  return (
    <div className="space-y-10">
      <WorkspaceSection
        title="my-workspaces"
        workspaces={groupedWorkspaces.owner}
      />
      <WorkspaceSection
        title="guest-workspaces"
        workspaces={groupedWorkspaces.guest}
      />
    </div>
  );
};

const WorkspaceSection = ({
  title,
  workspaces,
}: {
  title: string;
  workspaces: App.Models.Workspace[];
}) => {
  const { t } = useTranslation("common");

  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-tight text-muted-foreground">
        {t(title)}
      </h2>

      <div>
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="p-4">
            <div className="mb-4 flex items-center justify-between rounded">
              <h3 className="text-sm font-semibold tracking-tight text-muted-foreground">
                {workspace.name}
              </h3>
              <div className="space-x-1 text-muted-foreground">
                <Link
                  href=""
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  <KanbanSquareIcon size={16} className="mr-2" />
                  {t("boards")}
                </Link>
                <Link
                  href=""
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  <UserIcon size={16} className="mr-2" /> {t("members")}
                </Link>
                <Link
                  href=""
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  <SettingsIcon size={16} className="mr-2" /> {t("settings")}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {workspace?.boards?.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
