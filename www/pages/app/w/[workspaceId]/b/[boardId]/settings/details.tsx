import BoardInformationForm from "@/components/board/board-information-form";
import BoardSettingsShell from "@/components/board/board-settings-shell";
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

function BoardDetailsGate({ board }: { board: IBoard }) {
  const router = useRouter();
  const canUpdateBoard = useCan("update", "board", board.id);

  useEffect(() => {
    if (!canUpdateBoard) {
      void router.replace(
        route("board/settings", String(board.workspaceId), String(board.id))
      );
    }
  }, [canUpdateBoard, board.id, board.workspaceId, router]);

  if (!canUpdateBoard) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return <BoardInformationForm board={board} />;
}

const BoardSettingsDetailsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <BoardSettingsShell
      activeSection="details"
      pageTitle={t("board-settings-nav-details")}
    >
      {(board) => <BoardDetailsGate board={board} />}
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

BoardSettingsDetailsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default BoardSettingsDetailsPage;
