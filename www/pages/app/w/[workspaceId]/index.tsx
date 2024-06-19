import BoardCard from "@/components/board/BoardCard";
import CreateBoard from "@/components/board/CreateBoard";
import { AppLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyWorkspace from "@/components/workspace/EmptyWorkspace";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner";
import WorkspaceLoading from "@/components/workspace/WorkspaceLoading";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { KanbanSquareIcon, PenSquareIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Workspace: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace, isLoading } = useWorkspace(workspaceId);

  if (isLoading) {
    return <WorkspaceLoading />;
  }

  return (
    <div>
      <WorkspaceBanner workspace={workspace} />
      <div className="p-8">
        <span className="mb-4 flex items-center">
          <KanbanSquareIcon size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">{t("boards")}</h2>
        </span>

        <div className="grid grid-cols-3 gap-6">
          {workspace?.boards?.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}

          {workspace?.boards?.length === 0 && (
            <EmptyWorkspace workspace={workspace} withIcon />
          )}

          {workspace?.boards && workspace.boards.length > 0 && (
            <CreateBoard
              openTrigger={
                <Card className="flex h-card items-center justify-center ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2">
                  <Button variant="ghost" className="h-full w-full">
                    <PenSquareIcon size={16} className="mr-2" />
                    {t("create-new-board")}
                  </Button>
                </Card>
              }
              workspace={workspace}
            />
          )}
        </div>
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

Workspace.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Workspace;
