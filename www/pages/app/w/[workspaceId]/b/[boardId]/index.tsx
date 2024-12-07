import BoardBanner from "@/components/board/board-banner";
import Kanban from "@/components/board/kanban";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";

import { useBoard, useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Suspense } from "react";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { workspace } = useWorkspace(workspaceId);
  const { board } = useBoard(workspaceId, boardId);

  return (
    <>
      <div className="flex h-[calc(100vh-6rem)] flex-col">
        <BoardBanner board={board} />
        <Suspense fallback={<Loader />}>
          <Kanban board={board} />
        </Suspense>
      </div>

      {/* ======= SEO START ======= */}
      <NextSeo
        title={board.name}
        description={board.description}
        openGraph={{
          title: board.name,
          description: board.description,
          images: [
            {
              url: workspace.avatar,
              alt: board.name,
            },
          ],
        }}
      />
      {/* ======= END START ======= */}
    </>
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
