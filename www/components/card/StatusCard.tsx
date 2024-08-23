import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistance } from "date-fns";
import { MessageCircleIcon } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CardDetails from "./CardDetails";

const StatusCard = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `card-${card.id}`,
    data: {
      type: "card",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full space-y-6 text-left">
        <Card
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={cn(
            "w-full space-y-6 border p-4 hover:shadow-md",
            isDragging && "opacity-50"
          )}
        >
          <h2 className="break-words text-sm font-medium">{card.name}</h2>
          <footer className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageCircleIcon size={14} />
              <div className="h-4 w-px bg-border"></div>
              <span className="text-xs">
                updated{" "}
                {formatDistance(new Date(card?.updatedAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="flex items-center -space-x-3">
              {card?.participants
                ?.slice(0, 3)
                .map((participant) => (
                  <UserAvatar
                    key={participant.id}
                    user={participant}
                    className="h-6 w-6"
                  />
                ))}
            </div>
          </footer>
        </Card>
      </DialogTrigger>
      <DialogContent
        className="h-full max-h-full max-w-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <CardDetails cardId={card.id} status={status} board={board} />
      </DialogContent>
    </Dialog>
  );
};

export default StatusCard;
