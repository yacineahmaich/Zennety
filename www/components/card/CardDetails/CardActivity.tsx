import { format } from "date-fns";
import { CalendarSearchIcon, CornerDownRightIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

const CardActivity = ({ card }: { card: App.Models.Card }) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <div className="flex items-center gap-2">
        <CalendarSearchIcon size={18} className="flex-shrink-0" />
        <h2 className="break-all">{t("activity")}</h2>
      </div>
      <div className="mt-2">
        <ul className="space-y-2">
          {card?.activities.map((activity) => (
            <li key={activity.id}>
              <small className="text-xs">
                {format(new Date(activity?.created_at), "dd MM yyyy H:mm")}
              </small>
              <div className="flex items-center gap-1">
                <CornerDownRightIcon size={12} />
                <small className="rounded bg-accent px-3 py-1 font-medium">
                  {activity.description}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardActivity;
