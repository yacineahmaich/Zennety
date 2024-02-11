import { MessageCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import CreateCard from "./card/CreateCard";
import CreateStatus from "./status/CreateStatus";
import StatusHeader from "./status/StatusHeader";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  return (
    <main className="overflow-x-auto p-3">
      <div className="flex items-start gap-4">
        {board?.statuses?.map((status) => (
          <Status key={status.id} status={status} />
        ))}
        <CreateStatus board={board} />
      </div>
    </main>
  );
};

const Status = ({ status }: { status: App.Models.Status }) => {
  return (
    <div className="space-y-4">
      <StatusHeader status={status} />
      <div className="w-72 space-y-2 rounded-lg bg-accent px-1 py-2 shadow-md">
        {status?.cards && status.cards.length > 0 && (
          <div className="w-full space-y-2 overflow-y-auto px-1 pb-2">
            {status?.cards?.map((card) => (
              <StatusCard key={card.id} card={card} />
            ))}
          </div>
        )}
        <div className="px-1">
          <CreateCard status={status} />
        </div>
      </div>
    </div>
  );
};

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
        <div className="flex items-center -space-x-1 hover:space-x-0">
          <Avatar className="h-6 w-6 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
      </footer>
    </Card>
  );
};
export default Kanban;
