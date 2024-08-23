import Loader from "@/components/shared/Loader";
import { useCard } from "@/services/card";
import { CalendarSearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import ActivityList from "./ActivityList";
import CardTitle from "./CardTitle";
import CreateComment from "./CreateComment";

const CardDetails = ({
  board,
  status,
  cardId,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  cardId: number;
}) => {
  const { t } = useTranslation("common");

  const { card, isLoading } = useCard({
    workspaceId: board.workspaceId,
    boardId: board.id,
    statusId: status.id,
    cardId: cardId,
  });

  if (isLoading)
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );

  if (!card) return null;

  return (
    <div className="grid max-h-full flex-1 grid-cols-6 divide-x overflow-hidden">
      <div className="col-span-4 divide-y">
        <div className="space-y-6 p-5">
          <CardTitle board={board} status={status} card={card} />
        </div>
        <div className="p-5">HMMMM....</div>
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden p-5 pr-0">
        <div className="flex h-full w-full flex-1 flex-col">
          <div className="flex items-center gap-2">
            <CalendarSearchIcon size={18} className="flex-shrink-0" />
            <h2 className="break-all">{t("activity")}</h2>
          </div>
          <ActivityList activities={card.activities ?? []} />
          <CreateComment board={board} status={status} card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
