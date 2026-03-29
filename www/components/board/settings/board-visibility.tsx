import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateBoard } from "@/services";
import { Visibility } from "@/types/enums";
import { IBoard } from "@/types/models";
import { Globe2Icon, LoaderIcon, LockIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

type Props = { board: IBoard };

const BoardVisibility = ({ board }: Props) => {
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

export default BoardVisibility;
