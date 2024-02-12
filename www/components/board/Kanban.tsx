import { MessageCircleIcon, PlusIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import CreateCard from "./card/CreateCard";
import CreateStatus from "./status/CreateStatus";
import StatusHeader from "./status/StatusHeader";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  return (
    <main className="flex-1 overflow-x-auto p-3">
      <div className="flex h-full items-start gap-4">
        {board?.statuses?.map((status) => (
          <Status key={status.id} status={status} />
        ))}
        <CreateStatus board={board} />
      </div>
    </main>
  );
};

const Status = ({ status }: { status: App.Models.Status }) => {
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex h-full w-72 flex-col space-y-4">
      <StatusHeader status={status} />
      <div className="flex flex-col space-y-2 overflow-y-hidden rounded-lg bg-accent px-1 py-2 shadow-md">
        {((status?.cards && status.cards.length > 0) || showForm) && (
          <div className="w-full flex-1 space-y-2 overflow-y-auto px-1 pb-2">
            {status?.cards?.map((card) => (
              <StatusCard key={card.id} card={card} />
            ))}
            {showForm && (
              <div className="pt-1">
                <CreateCard status={status} onHide={() => setShowForm(false)} />
              </div>
            )}
          </div>
        )}
        {!showForm && (
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-xs text-muted-foreground"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <PlusIcon size={16} className="mr-2" /> {t("add-new-card")}
          </Button>
        )}
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
export default Kanban;
