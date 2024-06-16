import Loader from "@/components/shared/Loader";
import { useCard } from "@/services/card";
import { format } from "date-fns";
import { CalendarSearchIcon, CornerDownRightIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import CardComments from "./CardComments";
import CardDescription from "./CardDescription";
import CardTitle from "./CardTitle";

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
    <div className="grid grid-cols-5 divide-x">
      <div className="col-span-3 divide-y pr-5">
        <CardTitle board={board} status={status} card={card} />
        <CardDescription board={board} status={status} card={card} />

        <CardComments board={board} status={status} card={card} />
      </div>
      <div className="col-span-2 pl-5">
        <div className="flex items-center gap-2">
          <CalendarSearchIcon size={18} className="flex-shrink-0" />
          <h2 className="break-all">{t("activity")}</h2>
        </div>
        <div className="mt-2">
          <ul className="space-y-2">
            {card?.activities.map((activity) => (
              <li
                key={activity.id}
                className="text-wrap flex flex-col rounded border border-l-4 border-l-primary p-2"
              >
                <small>
                  {format(new Date(activity?.created_at), "dd MM yyyy")}
                </small>
                <div className="flex items-center gap-1">
                  <CornerDownRightIcon size={12} />
                  <span>{activity.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
