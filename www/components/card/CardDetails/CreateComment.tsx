import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/services";
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
  const { user } = useUser();
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
    <div className="-mx-5 mt-auto border-t px-5">
      <div className="mt-3 flex h-full w-full gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("share-thoughts")}
        />
        <Button
          size="sm"
          className="bottom-2 right-2 h-full"
          onClick={() => handleSendComment()}
          disabled={isLoading}
        >
          <SendIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
