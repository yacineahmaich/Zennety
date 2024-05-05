import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeleteStatus } from "@/services";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  ChevronLastIcon,
  ChevronsRightLeftIcon,
  Edit3Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/card";

const StatusHeader = ({
  board,
  status,
  collapsed,
  setCollapsed,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation("common");
  const { deleteStatus, isLoading: isDeleting } = useDeleteStatus();

  return (
    <Card
      className={cn(
        "flex h-fit shrink-0 items-center justify-between gap-6 bg-primary px-4 py-2 text-background transition-[width]",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <h4 className="line-clamp-1 break-all text-sm font-semibold uppercase">
        {status.name}
      </h4>

      {collapsed ? (
        <button onClick={() => setCollapsed(false)}>
          <ChevronLastIcon size={16} />
        </button>
      ) : (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="px-2">
              <MoreHorizontalIcon size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setCollapsed(true)}
            >
              <ChevronsRightLeftIcon size={16} />
              {t("collapse")}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Edit3Icon size={16} />
              {t("rename")}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <ArrowRightToLineIcon size={16} />
              {t("move")}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <ArrowLeftToLineIcon size={16} />
              {t("move")}
            </DropdownMenuItem>
            <ConfirmationDialog
              desc={t("delete-invitation-desc")}
              onConfirm={() =>
                deleteStatus({
                  workspaceId: board.workspaceId,
                  boardId: board.id,
                  statusId: status.id,
                })
              }
              openTrigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center gap-2 hover:!text-destructive"
                >
                  <Trash2Icon size={16} />
                  {t("delete")}
                </DropdownMenuItem>
              }
              disabled={isDeleting}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Card>
  );
};

export default StatusHeader;
