import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCard, useUpdateCard } from "@/services/card";
import { Edit3Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const CardTitle = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const { t } = useTranslation("common");
  const [name, setName] = useState(card.name);
  const [editingName, setEditingName] = useState(false);

  const { deleteCard, isLoading: isDeleting } = useDeleteCard();

  const { updateCard, variables, isLoading } = useUpdateCard();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {editingName ? (
          <input
            className="bg-transparent text-2xl font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onBlur={() => {
              setEditingName(false);
              if (name === card.name) return;
              if (name === "") {
                setName(card.name);
                return;
              }
              updateCard({
                workspaceId: board.workspaceId,
                boardId: board.id,
                statusId: status.id,
                cardId: card.id,
                data: {
                  name,
                },
              });
            }}
          />
        ) : (
          <h2
            className="break-all text-2xl font-medium"
            onClick={() => setEditingName(true)}
          >
            {/* @ts-ignore */}
            {isLoading ? variables?.data?.name : card?.name}
          </h2>
        )}
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <EllipsisVerticalIcon size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setEditingName(true)}
          >
            <Edit3Icon size={16} />
            {t("rename")}
          </DropdownMenuItem>
          <ConfirmationDialog
            desc={t("delete-invitation-desc")}
            onConfirm={async () => {
              await deleteCard({
                workspaceId: board.workspaceId,
                boardId: board.id,
                statusId: status.id,
                cardId: card.id,
              });
            }}
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
    </div>
  );
};

export default CardTitle;
