import BoardBanner from "@/components/board/board-banner";
import { AppLayout } from "@/components/layouts";
import Invitations from "@/components/shared/invitations";
import Members from "@/components/shared/members";
import { useCan } from "@/hooks/use-can";
import { useBoard, useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const BoardMembers: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  const canViewInvitations = useCan("update", "board", +boardId);

  const { workspace } = useWorkspace(workspaceId);
  const { board } = useBoard(workspaceId, boardId);

  return (
    <>
      <div>
        <BoardBanner board={board} />
        <div className="space-y-8 py-4">
          <Members resourceType="board" resourceId={board.id} />
          {canViewInvitations && (
            <Invitations resourceType="board" resourceId={board.id} />
          )}
        </div>
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

BoardMembers.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BoardMembers;
