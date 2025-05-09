import UserAvatar from "@/components/shared/user-avatar";
import { IActivity } from "@/types/models";
import { format } from "date-fns";
import { CalendarSearchIcon, CornerDownRightIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect, useRef } from "react";

type Props = { activities: IActivity[] };

const CardActivity = ({ activities }: Props) => {
  const { t } = useTranslation("common");
  const listRef = useRef<HTMLUListElement>(null);

  // scroll to the new activity log
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [activities?.length]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-2">
        <CalendarSearchIcon size={18} className="flex-shrink-0" />
        <h2 className="break-all">{t("activity")}</h2>
      </div>
      <div className="mt-2 h-full flex-1 overflow-y-scroll pr-5">
        <ul ref={listRef} className="space-y-2 pb-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: IActivity }) => {
  return (
    <li>
      <small className="text-xs">
        {format(new Date(activity?.createdAt), "dd MM yyyy H:mm")}
      </small>
      <div className="flex items-center gap-1">
        <CornerDownRightIcon size={12} />
        <div className="rounded bg-accent px-3 py-1 md:min-w-[200px]">
          {activity.type === "log" && (
            <small className="font-medium">{activity.description}</small>
          )}
          {activity.type === "comment" && (
            <div>
              <div className="flex items-center gap-2">
                <UserAvatar user={activity.causer} className="h-6 w-6" />
                <h4 className="text-sm font-semibold">
                  {activity.causer.name}
                </h4>
              </div>
              <small className="font-medium">{activity.description}</small>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CardActivity;
