import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CardDetails from "./CardDetails";

const StatusCard = ({ card }: { card: App.Models.Card }) => {
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
              <span className="text-xs">updated 3 hours ago</span>
            </div>
            <div className="flex items-center -space-x-1">
              <Avatar className="h-6 w-6 transition-all hover:z-10 hover:shadow-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6 transition-all hover:z-10 hover:shadow-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6 transition-all hover:z-10 hover:shadow-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </div>
          </footer>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-screen min-h-[90vh] max-w-[900px] overflow-y-auto">
        <CardDetails card={card} />
      </DialogContent>
    </Dialog>
  );
};

export default StatusCard;
