import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCard, useUpdateCard } from "@/services/card";
import { IBoard, ICard, IStatus } from "@/types/models";
import { Edit3Icon, EqualIcon, Trash2Icon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const CardTitle = ({
  board,
  status,
  card,
}: {
  board: IBoard;
  status: IStatus;
  card: ICard;
}) => {
  const { t } = useTranslation("common");
  const [name, setName] = useState(card.name);
  const [editingName, setEditingName] = useState(false);

  const { deleteCard, isLoading: isDeleting } = useDeleteCard();

  const { updateCard, variables, isLoading } = useUpdateCard();

  return (
    <div className="flex justify-between">
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
          <Button
            size="sm"
            variant="secondary"
            className="flex h-8 items-center gap-2"
          >
            <EqualIcon size={14} />
            <span>Actions</span>
          </Button>
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
            desc={t("delete-resource-desc", { resource: t("card") })}
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
