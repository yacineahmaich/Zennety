import BoardBanner from "@/components/board/BoardBanner";
import Kanban from "@/components/board/Kanban";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/Loader";

import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Suspense } from "react";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { board } = useBoard(workspaceId, boardId);

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <BoardBanner board={board} />
      <Suspense fallback={<Loader />}>
        <Kanban board={board} />
      </Suspense>
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

Board.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Board;
