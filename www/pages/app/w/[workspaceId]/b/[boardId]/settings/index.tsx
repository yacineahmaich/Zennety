import BoardBanner from "@/components/board/BoardBanner";
import { AppLayout } from "@/components/layouts";
import Loader from "@/components/shared/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBoard, useUpdateBoard } from "@/services";
import { Visibility } from "@/types/enums";
import { NextPageWithLayout } from "@/types/next";
import { Globe2Icon, LoaderIcon, LockIcon, SettingsIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const WorkspaceSettings: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  const { board, isLoading } = useBoard(workspaceId, boardId);

  if (isLoading) return <Loader />;
  if (!board) return;

  return (
    <div>
      <BoardBanner board={board} />
      <div className="py-4">
        <span className="mb-4 flex items-center">
          <SettingsIcon size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">{t("board-settings")}</h2>
        </span>
        <div className="space-y-8 pl-4">
          <BoardVisibility board={board} />
        </div>
      </div>
    </div>
  );
};

const BoardVisibility = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation("common");
  const { updateBoard, isLoading } = useUpdateBoard();

  const handleVisibilityChange = (visibility: string) => {
    updateBoard({
      workspaceId: board.workspaceId,
      boardId: board.id,
      data: {
        visibility,
      },
    });
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">{t("board-visibility")}</h4>
      <div className="mb-4 mt-1 flex items-center gap-2">
        <p className="text-xs">
          {board.visibility === Visibility.PRIVATE &&
            t("private-board-description")}
          {board.visibility === Visibility.PUBLIC &&
            t("public-board-description")}
        </p>
      </div>
      <Select value={board.visibility} onValueChange={handleVisibilityChange}>
        <SelectTrigger className="w-fit">
          {isLoading ? (
            <LoaderIcon size={14} className="animate-spin" />
          ) : (
            <SelectValue placeholder="Select a role" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Visibility.PRIVATE}>
            <div className="flex items-center gap-2">
              <LockIcon size={16} /> <span>{Visibility.PRIVATE}</span>
            </div>
          </SelectItem>
          <SelectItem value={Visibility.PUBLIC}>
            <div className="flex items-center gap-2">
              <Globe2Icon size={16} /> <span>{Visibility.PUBLIC}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
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

WorkspaceSettings.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default WorkspaceSettings;
