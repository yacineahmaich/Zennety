import { Button } from "@/components/ui/button";
import { useCardComments } from "@/services/card";
import { GanttChartIcon, PlusIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment";

const CardComments = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const { t } = useTranslation("common");

  const [showForm, setShowForm] = useState(false);

  const { comments, isLoading } = useCardComments({
    workspaceId: board.workspaceId,
    boardId: board.id,
    statusId: status.id,
    cardId: card.id,
  });

  return (
    <div className="space-y-4 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GanttChartIcon size={20} className="flex-shrink-0" />
          <h2 className="break-all">{t("comments")}</h2>
        </div>
        <Button
          size="sm"
          type="button"
          variant="ghost"
          title={t("create-comment")}
          disabled={isLoading}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1"
        >
          <PlusIcon size={16} />
        </Button>
      </div>
      <div className="space-y-6">
        {showForm && (
          <div className="space-y-2 py-3 text-sm">
            <div className="w-full space-y-2">
              <CreateComment
                board={board}
                status={status}
                card={card}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
        <div className="space-y-2 divide-y">
          {/* {isCreatingComment && (
            <CommentItem
              pending
              comment={{
                id: new Date().getTime(),
                causer: { name: user.name, email: "", id: 1, memberships: [] },
                description: variables?.comment ?? "",
                created_at: new Date().toString(),
                properties: {
                  type: "comment",
                  comment: variables?.comment ?? "",
                },
              }}
            />
          )} */}
          {comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComments;
