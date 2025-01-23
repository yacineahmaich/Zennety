import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCard } from "@/services/card";
import { IBoard, ICard, IStatus } from "@/types/models";
import { AlignLeftIcon, CornerDownRightIcon, PenLineIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
  board: IBoard;
  status: IStatus;
  card: ICard;
};

const CardDescription = ({ board, status, card }: Props) => {
  const { t } = useTranslation("common");
  const [editingDesc, setEditingDesc] = useState(false);
  const [description, setDescription] = useState(card.description);
  const { updateCard, isLoading } = useUpdateCard();

  return (
    <div className="group space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <AlignLeftIcon size={16} />
        <span>{t("description")}</span>
        <button
          className="scale-0 transition-transform group-hover:scale-100"
          onClick={() => setEditingDesc(true)}
        >
          <PenLineIcon size={12} />
        </button>
      </h3>
      <div className="text-sm text-muted-foreground">
        {editingDesc ? (
          <div className="space-y-2">
            <Textarea
              rows={5}
              placeholder={t("board-description-placeholder")}
              className="resize-none p-2 pb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex items-center justify-end gap-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditingDesc(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={isLoading}
                onClick={() => {
                  if (description === card.description) {
                    setEditingDesc(false);
                    return;
                  }

                  updateCard(
                    {
                      workspaceId: board.workspaceId,
                      boardId: board.id,
                      statusId: status.id,
                      cardId: card.id,
                      data: {
                        description,
                      },
                    },
                    {
                      onSuccess() {
                        setEditingDesc(false);
                      },
                    }
                  );
                }}
              >
                <CornerDownRightIcon size={12} className="mr-2" />
                <span className="text-xs">Save</span>
              </Button>
            </div>
          </div>
        ) : (
          <p className="p-2">{card.description || t("card-no-description")}</p>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
