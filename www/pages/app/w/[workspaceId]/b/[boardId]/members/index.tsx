import BoardBanner from "@/components/board/BoardBanner";
import { AppLayout } from "@/components/layouts";
import Members from "@/components/shared/Members";
import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const BoardMembers: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { board } = useBoard(workspaceId, boardId);

  if (!board) return;

  return (
    <div>
      <BoardBanner board={board} />
      <Members resourceType="board" resourceId={board.id} />
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

BoardMembers.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BoardMembers;
