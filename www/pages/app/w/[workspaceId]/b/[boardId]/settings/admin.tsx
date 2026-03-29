import BoardSettingsShell from "@/components/board/board-settings-shell";
import DeleteBoard from "@/components/board/settings/delete-board";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import { useCan } from "@/hooks/use-can";
import { route } from "@/lib/routes";
import { IBoard } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function BoardAdminGate({ board }: { board: IBoard }) {
  const router = useRouter();
  const canDeleteBoard = useCan("delete", "board", board.id);

  useEffect(() => {
    if (!canDeleteBoard) {
      void router.replace(
        route("board/settings", String(board.workspaceId), String(board.id))
      );
    }
  }, [canDeleteBoard, board.id, board.workspaceId, router]);

  if (!canDeleteBoard) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return <DeleteBoard board={board} />;
}

const BoardSettingsAdminPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <BoardSettingsShell
      activeSection="admin"
      pageTitle={t("board-settings-nav-admin")}
    >
      {(board) => <BoardAdminGate board={board} />}
    </BoardSettingsShell>
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

BoardSettingsAdminPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default BoardSettingsAdminPage;
