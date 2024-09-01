import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCardComment } from "@/services/card";
import { SendIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

interface CreateCommentProps {
  status: App.Models.Status;
  board: App.Models.Board;
  card: App.Models.Card;
}

const CreateComment = ({ board, status, card }: CreateCommentProps) => {
  const { t } = useTranslation("common");

  const [content, setContent] = useState("");

  const { createCardComment, isLoading: isLoading } = useCreateCardComment();

  const handleSendComment = () => {
    createCardComment(
      {
        workspaceId: board.workspaceId,
        boardId: board.id,
        statusId: status.id,
        cardId: card.id,
        comment: content,
      },
      {
        onSuccess() {
          setContent("");
        },
      }
    );
  };

  return (
    <div className="-ml-5 border-t">
      <div className="flex w-full gap-2 p-3 pb-0">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("share-thoughts")}
        />
        <div>
          <Button
            size="sm"
            className="h-full"
            onClick={() => handleSendComment()}
            disabled={isLoading}
          >
            <SendIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
