import { useNotifications } from "@/services";
import { NotificationType } from "@/types/enums";
import { format } from "date-fns";
import {
  CheckIcon,
  InboxIcon,
  MessageSquareIcon,
  MessageSquareWarningIcon,
  MessageSquareXIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <InboxIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px] overflow-y-scroll p-3">
        <SheetHeader>
          <SheetTitle>Notifications ({notifications?.length ?? 0})</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {notifications?.map((notification) => (
            <Link
              key={notification.id}
              href={notification.link}
              className="group relative flex items-center rounded-lg border p-3 ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2"
            >
              {!notification.isRead && (
                <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground" />
              )}
              <div className="mr-2 self-start">
                {notification.type === NotificationType.NORMAL && (
                  <MessageSquareIcon size={14} />
                )}
                {notification.type === NotificationType.WARNING && (
                  <MessageSquareWarningIcon size={14} />
                )}
                {notification.type === NotificationType.DANGER && (
                  <MessageSquareXIcon size={14} />
                )}
              </div>
              <div className="mr-4 self-start">
                <h2 className="text-xs font-semibold">{notification.title}</h2>
                <p className="line-clamp-2 text-xs">
                  {notification.description}
                </p>
                <span className="text-xs">
                  {format(new Date(notification.date), "d MMMM yyyy")}
                </span>
              </div>
              <div className="ml-auto flex flex-col justify-end space-y-1 opacity-0 group-hover:opacity-100">
                <Button
                  variant="outline"
                  className="h-5 text-xs font-medium"
                  title="mark as read"
                >
                  <CheckIcon size={14} />
                </Button>
                <Button
                  variant="outline"
                  className="h-5 text-xs font-medium"
                  title="delete"
                >
                  <XIcon size={14} />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
