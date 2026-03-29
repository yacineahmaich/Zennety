import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import { useCan } from "@/hooks/use-can";
import { route } from "@/lib/routes";
import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function BoardSettingsRedirectInner({
  workspaceId,
  boardId,
}: {
  workspaceId: string;
  boardId: string;
}) {
  const router = useRouter();
  const { board } = useBoard(workspaceId, boardId);

  const canUpdateBoard = useCan("update", "board", board.id);
  const canDeleteBoard = useCan("delete", "board", board.id);

  useEffect(() => {
    if (canUpdateBoard) {
      void router.replace(
        route("board/settings/details", workspaceId, boardId)
      );
    } else if (canDeleteBoard) {
      void router.replace(route("board/settings/admin", workspaceId, boardId));
    } else {
      void router.replace(route("board", workspaceId, boardId));
    }
  }, [router, workspaceId, boardId, canUpdateBoard, canDeleteBoard]);

  return (
    <div className="py-8">
      <Loader />
    </div>
  );
}

const BoardSettingsIndexPage: NextPageWithLayout = () => {
  const router = useRouter();

  const workspaceIdParam = router.query.workspaceId;
  const boardIdParam = router.query.boardId;
  const workspaceId =
    router.isReady &&
    typeof workspaceIdParam === "string" &&
    workspaceIdParam.length > 0
      ? workspaceIdParam
      : null;
  const boardId =
    router.isReady &&
    typeof boardIdParam === "string" &&
    boardIdParam.length > 0
      ? boardIdParam
      : null;

  if (!router.isReady || workspaceId == null || boardId == null) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <BoardSettingsRedirectInner workspaceId={workspaceId} boardId={boardId} />
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

BoardSettingsIndexPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default BoardSettingsIndexPage;
