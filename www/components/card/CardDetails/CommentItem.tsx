import UserAvatar from "@/components/shared/UserAvatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CommentItemProps {
  pending?: boolean;
  comment: App.Models.Comment;
}

const CommentItem = ({ comment, pending }: CommentItemProps) => {
  return (
    <div
      className={cn(
        "space-y-2 p-3 text-sm transition-colors",
        pending && "opacity-75"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar user={comment.causer} className="rounded" />
          <div className="flex flex-col">
            <h6>{comment.causer?.name}</h6>
            <small className="text-accent-foreground">
              {format(new Date(comment?.createdAt), "d MMMM yyyy H:mm")}
            </small>
          </div>
        </div>
      </div>
      <p>{comment.content}</p>
    </div>
  );
};

export default CommentItem;
