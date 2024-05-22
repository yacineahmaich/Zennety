import { CalendarSearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import CardComments from "./CardComments";
import CardDescription from "./CardDescription";
import CardTitle from "./CardTitle";

const CardDetails = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="grid grid-cols-5 divide-x">
      <div className="col-span-3 divide-y pr-5">
        <CardTitle board={board} status={status} card={card} />
        <CardDescription board={board} status={status} card={card} />

        <CardComments board={board} status={status} card={card} />
      </div>
      <div className="pl-5">
        <div className="flex items-center gap-2">
          <CalendarSearchIcon size={18} className="flex-shrink-0" />
          <h2 className="break-all">{t("activity")}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
