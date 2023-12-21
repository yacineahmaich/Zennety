import CreateStatus from "@/components/Status/CreateStatus";
import StatusHeader from "@/components/Status/StatusHeader";
import BoardBanner from "@/components/board/BoardBanner";
import { AppLayout } from "@/components/layouts";
import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { boardId } = router.query as { boardId: string };
  const { board } = useBoard(boardId);

  if (!board) return;

  return (
    <div>
      <BoardBanner board={board} />
      <main className=" overflow-x-auto p-3">
        <div className="flex items-start gap-4">
          {board.statuses?.map((status) => (
            <StatusHeader key={status.id} status={status} />
          ))}
          <CreateStatus board={board} />
        </div>
      </main>
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
