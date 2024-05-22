import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import { useUpdateCard } from "@/services/card";
import { MessageCircleWarningIcon } from "lucide-react";
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
        description,
      },
      {
        onSuccess() {
          setEditingDescription(false);
        },
      }
    );
  };

  return (
    <div className="group space-y-4 py-5">
      <div className="relative">
        <div className="flex items-center gap-2">
          <MessageCircleWarningIcon size={20} className="flex-shrink-0" />
          <h2 className="break-all">Description</h2>
        </div>
        {!editingDescription && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute right-0 top-0 hidden group-hover:block"
            onClick={() => setEditingDescription(true)}
          >
            {t("edit")}
          </Button>
        )}
      </div>
      {editingDescription ? (
        <RichTextEditor
          content={description}
          onContentChange={(content) => setDescription(content)}
          placeholder="Write a description here."
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}
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
