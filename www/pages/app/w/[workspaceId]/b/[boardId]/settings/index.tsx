import BoardBanner from "@/components/board/board-banner";
import { AppLayout } from "@/components/layouts";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCan } from "@/hooks/use-can";
import { useBoard, useDeleteBoard, useUpdateBoard } from "@/services";
import { Visibility } from "@/types/enums";
import { IBoard } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { Globe2Icon, LoaderIcon, LockIcon, SettingsIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";

const WorkspaceSettings: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  const { board } = useBoard(workspaceId, boardId);

  const canUpdateBoard = useCan("update", "board", board.id);
  const canDeleteBoard = useCan("delete", "board", board.id);

  return (
    <div>
      <BoardBanner board={board} />
      <div className="py-4">
        <span className="mb-4 flex items-center">
          <SettingsIcon size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">{t("board-settings")}</h2>
        </span>
        <div className="space-y-8 pl-4">
          {canUpdateBoard && <BoardVisibility board={board} />}
          {canDeleteBoard && <DeleteBoard board={board} />}
        </div>
      </div>
    </div>
  );
};

const BoardVisibility = ({ board }: { board: IBoard }) => {
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

const DeleteBoard = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation("common");
  const [confirmText, setConfirmationText] = useState("");
  const [open, setOpen] = useState(false);

  const { deleteBoard, isLoading } = useDeleteBoard();

  const confirmationWord = `b/${board.name}`;

  const handleConfirmDelete = () => {
    deleteBoard(
      { workspaceId: board.workspaceId, boardId: board.id },
      {
        onSuccess() {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div className="-ml-4 flex flex-col rounded-lg border border-destructive bg-destructive/10 p-4">
      <div>
        <h4 className="text-sm font-semibold">{t("danger-zone")}</h4>
        <p className="mb-4 mt-1 text-xs">{t("permanent-action")}</p>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive-outline" className="w-fit">
            {t("delete-board")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmation")}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-foreground">
              <div>
                This will permanently delete the
                <span className="mx-2 rounded bg-accent px-1 font-semibold">
                  {confirmationWord}
                </span>
                and its boards, statuses, cards, activities and remove all
                collaborator associations.
              </div>
              <div className="space-y-2">
                <div>
                  To confirm, type
                  <span className="mx-2 rounded bg-accent px-1 font-semibold">
                    {confirmationWord}
                  </span>
                  in the box below
                </div>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel className="w-1/3" disabled={isLoading}>
              {t("cancel")}
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="w-2/3"
              disabled={confirmText !== confirmationWord || isLoading}
              onClick={handleConfirmDelete}
            >
              {isLoading ? t("delelting") : t("delete-board")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
