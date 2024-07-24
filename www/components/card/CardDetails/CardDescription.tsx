import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import { useUpdateCard } from "@/services/card";
import { PenIcon } from "lucide-react";
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
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(card.description);
  const { updateCard, isLoading } = useUpdateCard();

  const handleUpdateDescription = () => {
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
          setEditingDescription(false);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="group relative">
        {!editingDescription && (
          <button
            title={t("edit")}
            className="absolute right-0 top-0 hidden hover:slide-in-from-bottom-2 group-hover:block"
            onClick={() => setEditingDescription(true)}
          >
            <PenIcon size={12} />
          </button>
        )}

        {editingDescription ? (
          <RichTextEditor
            content={description}
            onContentChange={(content) => setDescription(content)}
            placeholder="Write a description here."
          />
        ) : description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>There&apos;s no description yet here!</p>
        )}
      </div>
      {editingDescription && (
        <div className="space-x-2">
          <Button
            size="sm"
            onClick={() => handleUpdateDescription()}
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setEditingDescription(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardDescription;
