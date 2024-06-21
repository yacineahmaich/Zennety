import BoardBanner from "@/components/board/BoardBanner";
import { AppLayout } from "@/components/layouts";
import Invitations from "@/components/shared/Invitations";
import Loader from "@/components/shared/Loader";
import Members from "@/components/shared/Members";
import { useCan } from "@/hooks/useCan";
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

  const canViewInvitations = useCan("update", "board", +boardId);

  const { board, isLoading } = useBoard(workspaceId, boardId);

  if (isLoading) return <Loader />;
  if (!board) return;

  return (
    <div>
      <BoardBanner board={board} />
      <Members resourceType="board" resourceId={board.id} />
      {canViewInvitations && (
        <Invitations resourceType="board" resourceId={board.id} />
      )}
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
