import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCardComment } from "@/services/card";
import { IBoard, ICard, IStatus } from "@/types/models";
import { SendIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
  status: IStatus;
  board: IBoard;
  card: ICard;
};

const CreateComment = ({ board, status, card }: Props) => {
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
