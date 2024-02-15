import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon } from "lucide-react";

const StatusCard = ({ card }: { card: App.Models.Card }) => {
  return (
    <Card key={card.id} className="w-full space-y-6 border p-4 hover:shadow-md">
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
  );
};

export default StatusCard;
