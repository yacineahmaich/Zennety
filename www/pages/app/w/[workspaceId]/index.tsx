import BoardCard from "@/components/board/BoardCard";
import CreateBoard from "@/components/board/CreateBoard";
import EmptyWorkspace from "@/components/board/EmptyWorkspace";
import { AppLayout } from "@/components/layouts";
import Error from "@/components/shared/Error";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WorkspaceLoading from "@/components/workspace/WorkspaceLoading";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import {
  Globe2Icon,
  KanbanSquareIcon,
  LockIcon,
  PenSquareIcon,
  UserPlusIcon,
} from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Workspace: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace, isLoading, isError, error } = useWorkspace(workspaceId);

  if (isError) {
    return <Error message={error?.message} />;
  }

  if (isLoading) {
    return <WorkspaceLoading />;
  }

  return (
    <div>
      <div className="w-full border-b p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-20 w-20 rounded-xl bg-accent shadow-xl">
                <img
                  src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
                  alt="logo"
                  className="h-full w-full rounded-[inherit]"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold">{workspace?.name}</h2>
                <div className="flex gap-2 text-xs font-medium">
                  <span>Premium</span>
                  <p className="flex items-center space-x-1">
                    {workspace?.visibility === "Private" && (
                      <LockIcon size={16} />
                    )}
                    {workspace?.visibility === "Public" && (
                      <Globe2Icon size={16} />
                    )}
                    <span>{workspace?.visibility}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button size="sm" variant="secondary">
            <UserPlusIcon size={20} className="mr-2" />
            {t("invite-workspace-members")}
          </Button>
        </div>
        {workspace?.description && (
          <p className="mt-2 max-w-2xl break-all text-sm text-muted-foreground">
            {workspace.description}
          </p>
        )}
      </div>
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
            <EmptyWorkspace workspace={workspace} />
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
