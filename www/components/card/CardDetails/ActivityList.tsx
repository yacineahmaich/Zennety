import UserAvatar from "@/components/shared/UserAvatar";
import { format } from "date-fns";
import { CornerDownRightIcon } from "lucide-react";

const ActivityList = ({
  activities,
}: {
  activities: App.Models.Activity[];
}) => {
  return (
    <div className="mt-2 flex-1">
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id}>
            <small className="text-xs">
              {format(new Date(activity?.createdAt), "dd MM yyyy H:mm")}
            </small>
            <div className="flex items-center gap-1">
              <CornerDownRightIcon size={12} />
              <div className="min-w-[200px] rounded bg-accent px-3 py-1">
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
                    <small className="font-medium">
                      {activity.description}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
