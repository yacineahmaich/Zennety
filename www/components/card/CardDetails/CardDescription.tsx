import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCard } from "@/services/card";
import { AlignLeftIcon, CornerDownRightIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const CardDescription = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const { t } = useTranslation("common");
  const [editingDesc, setEditingDesc] = useState(false);
  const [description, setDescription] = useState(card.description);
  const { updateCard, isLoading } = useUpdateCard();

  return (
    <div className="space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <AlignLeftIcon size={16} />
        <span>Description</span>
      </h3>
      <div className="w-1/2 text-sm text-muted-foreground">
        {editingDesc ? (
          <div className="relative">
            <Textarea
              rows={5}
              placeholder={t("board-description-placeholder")}
              className="resize-none p-2 pb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Button
                size="sm"
                variant="secondary"
                className="h-7"
                onClick={() => setEditingDesc(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex h-7 items-center gap-1"
                disabled={isLoading}
                onClick={() => {
                  if (description === card.description) return;

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
                <CornerDownRightIcon size={12} />
                <span className="text-xs">Save</span>
              </Button>
            </div>
          </div>
        ) : (
          <p onClick={() => setEditingDesc(true)} className="p-2">
            {card.description || t("card-no-description")}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
