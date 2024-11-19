import BoardBanner from "@/components/board/board-banner";
import { AppLayout } from "@/components/layouts";
import Invitations from "@/components/shared/invitations";
import Members from "@/components/shared/members";
import { useCan } from "@/hooks/use-can";
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

  const { board } = useBoard(workspaceId, boardId);

  return (
    <div>
      <BoardBanner board={board} />
      <div className="space-y-8 py-4">
        <Members resourceType="board" resourceId={board.id} />
        {canViewInvitations && (
          <Invitations resourceType="board" resourceId={board.id} />
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

BoardMembers.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BoardMembers;
