import BoardCard from "@/components/board/BoardCard";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/Loader";
import { buttonVariants } from "@/components/ui/button";
import EmptyWorkspace from "@/components/workspace/EmptyWorkspace";
import { useCan } from "@/hooks/useCan";
import { useHasRole } from "@/hooks/useHasRole";
import { getPinnedBoard, groupWorkspacesByOwnership } from "@/lib/helpers";
import { route } from "@/lib/routes";
import { useMyWorkspaces, useUser } from "@/services";
import { Role } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import {
  FolderKanbanIcon,
  GripHorizontalIcon,
  KanbanSquareIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const AppPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const { workspaces, isLoading } = useMyWorkspaces();
  const { user } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const groupedWorkspaces = groupWorkspacesByOwnership(workspaces || [], user);
  const pinnedBoards = getPinnedBoard(workspaces || []);

  return (
    <div>
      {pinnedBoards?.length > 0 && (
        <section>
          <h2 className="flex items-center text-sm font-semibold uppercase tracking-tight">
            <StarIcon className="mr-2 w-6 stroke-yellow-300" />
            <span className="text-yellow-300">{t("pinned")}</span>
          </h2>

          <div className="ml-3 border-l border-accent p-4 pb-5">
            <div className="grid grid-cols-3 gap-4">
              {pinnedBoards?.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </div>
        </section>
      )}
      <WorkspaceGroup
        title="my-workspaces"
        workspaces={groupedWorkspaces.owner}
      />
      <WorkspaceGroup
        title="guest-workspaces"
        workspaces={groupedWorkspaces.guest}
      />
    </div>
  );
};

const WorkspaceGroup = ({
  title,
  workspaces,
}: {
  title: string;
  workspaces: App.Models.Workspace[];
}) => {
  const { t } = useTranslation("common");

  if (workspaces.length === 0) return;

  return (
    <section>
      <h2 className="flex items-center text-sm font-semibold uppercase tracking-tight">
        <FolderKanbanIcon className="mr-2 w-6" />
        <span>{t(title)}</span>
      </h2>

      <div className="ml-3 border-l border-accent pb-5">
        {workspaces.map((workspace) => (
          <WorkspaceSection key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </section>
  );
};

const WorkspaceSection = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");

  const isOwner = useHasRole(Role.OWNER, "workspace", workspace?.id);
  const canUpdateWorkspace = useCan("update", "workspace", workspace.id);

  const canViewSettings = isOwner || canUpdateWorkspace;

  return (
    <div key={workspace.id} className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="-ml-4 flex items-center gap-1 text-sm font-semibold tracking-tight text-muted-foreground">
          <span className="h-px w-4 bg-accent"></span>
          <GripHorizontalIcon size={20} />
          {workspace.name}
        </h3>
        <div className="space-x-1 text-muted-foreground">
          <Link
            href={route("workspace", workspace.id)}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            <KanbanSquareIcon size={16} className="mr-2" />
            {t("boards")} ({workspace.boards?.length})
          </Link>
          <Link
            href={route("workspace/members", workspace.id)}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            <UserIcon size={16} className="mr-2" />
            {t("members")} ({workspace.members?.length})
          </Link>
          {canViewSettings && (
            <Link
              href={route("workspace/settings", workspace.id)}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              <SettingsIcon size={16} className="mr-2" /> {t("settings")}
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {workspace?.boards?.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        {workspace.boards?.length === 0 && (
          <EmptyWorkspace workspace={workspace} />
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

AppPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AppPage;
