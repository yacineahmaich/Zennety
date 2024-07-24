import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CommentItemProps {
  pending?: boolean;
  comment: App.Models.Activity<{
    type: string;
    comment: string;
  }>;
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
          <img
            className="h-8 w-8 rounded object-cover"
            src="https://avatars.githubusercontent.com/u/9768489?s=64&v=4"
          />
          <div className="flex flex-col">
            <h6>{comment.causer?.name}</h6>
            <small className="text-accent-foreground">
              {format(new Date(comment?.created_at), "d MMMM yyyy H:mm")}
            </small>
          </div>
        </div>
      </div>
      <p>{comment.properties?.comment}</p>
    </div>
  );
};

export default CommentItem;
