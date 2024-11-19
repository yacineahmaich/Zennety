import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useDeleteStatus,
  useReorderStatuses,
  useUpdateStatus,
} from "@/services";
import { IBoard, IStatus } from "@/types/models";
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
import { useState } from "react";

const StatusHeader = ({
  board,
  status,
  prevStatus,
  nextStatus,
  collapsed,
  toggleCollapsed,
}: {
  board: IBoard;
  status: IStatus;
  nextStatus?: IStatus;
  prevStatus?: IStatus;
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  const { t } = useTranslation("common");
  const { deleteStatus, isLoading: isDeleting } = useDeleteStatus();
  const { updateStatus, isLoading, variables } = useUpdateStatus();

  const { reorderStatuses, optimistacallyReorderStatuses } =
    useReorderStatuses();

  const [name, setName] = useState(status.name);
  const [editing, setEditing] = useState(false);

  const handleReorderStatus = (dir: -1 | 1) => {
    if (dir === -1) if (!prevStatus) return;
    if (dir === 1 && !nextStatus) return;

    const statusesOrder = optimistacallyReorderStatuses({
      workspaceId: board.workspaceId?.toString(),
      boardId: board.id?.toString(),
      activeStatusId: status.id,
      // @ts-ignore
      overStatusId: dir === -1 ? prevStatus.id : nextStatus.id,
    });

    if (!statusesOrder) return;

    reorderStatuses({
      workspaceId: board.workspaceId?.toString(),
      boardId: board.id?.toString(),
      statusesOrder,
    });
  };

  return (
    <Card
      className={cn(
        "flex h-fit shrink-0 cursor-grab items-center justify-between gap-6 bg-primary px-4 py-2 text-background transition-[width]",
        collapsed ? "w-16 cursor-grab" : "w-72"
      )}
    >
      {editing ? (
        <input
          className="m-0 !min-w-0 !max-w-fit bg-transparent p-0 text-sm font-semibold uppercase"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onBlur={() => {
            setEditing(false);
            if (name === status.name) return;
            if (name === "") {
              setName(status.name);
              return;
            }
            updateStatus({
              workspaceId: board.workspaceId,
              boardId: board.id,
              statusId: status.id,
              data: {
                name,
              },
            });
          }}
        />
      ) : (
        <h4
          className="line-clamp-1 break-all text-sm font-semibold uppercase"
          onClick={() => setEditing(true)}
        >
          {isLoading ? (variables?.data?.name as string) : status.name} [
          {status.cards?.length}]
        </h4>
      )}

      {collapsed ? (
        <button onClick={toggleCollapsed}>
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
              onClick={toggleCollapsed}
            >
              <ChevronsRightLeftIcon size={16} />
              {t("collapse")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setEditing(true)}
            >
              <Edit3Icon size={16} />
              {t("rename")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleReorderStatus(1)}
              disabled={!nextStatus}
            >
              <ArrowRightToLineIcon size={16} />
              {t("move")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleReorderStatus(-1)}
              disabled={!prevStatus}
            >
              <ArrowLeftToLineIcon size={16} />
              {t("move")}
            </DropdownMenuItem>
            <ConfirmationDialog
              desc={t("delete-resource-desc", { resource: t("status") })}
              onConfirm={async () =>
                await deleteStatus({
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
