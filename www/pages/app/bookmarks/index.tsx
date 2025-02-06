import BoardCard from "@/components/board/board-card";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/loader";
import { getPinnedBoard } from "@/lib/helpers";
import { useMyWorkspaces } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { BookMarkedIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Bookmarks: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const { workspaces, isLoading } = useMyWorkspaces();
  const pinnedBoards = getPinnedBoard(workspaces || []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <section>
        <h2 className="flex items-center text-sm font-semibold uppercase tracking-tight">
          <BookMarkedIcon className="mr-2 w-6 " />
          <span className="">{t("bookmarks")}</span>
        </h2>

        <div className="ml-3 border-l border-accent p-4 pb-5">
          <div className="grid grid-cols-3 gap-4">
            {pinnedBoards?.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </div>
      </section>
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

Bookmarks.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Bookmarks;
