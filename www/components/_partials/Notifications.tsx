import {
  useDeleteNotification,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/services";
import { NotificationType } from "@/types/enums";
import { format } from "date-fns";
import {
  CheckIcon,
  InboxIcon,
  MessageSquareIcon,
  MessageSquareWarningIcon,
  MessageSquareXIcon,
  MinusIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Notifications = () => {
  const { t } = useTranslation("common");
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="relative">
          {notifications && notifications.some((n) => !n.isRead) && (
            <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground" />
          )}
          <InboxIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px] overflow-y-auto p-3">
        <SheetHeader>
          <SheetTitle>
            {t("notifications")} ({notifications?.length ?? 0})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {notifications?.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={() => setOpen(false)}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Notification = ({
  notification,
  onClose,
}: {
  notification: App.Models.Notification;
  onClose: () => void;
}) => {
  const { markNotificationAsRead, isLoading: isMarkingAsRead } =
    useMarkNotificationAsRead();
  const { deleteNotification, isLoading: isDeleting } = useDeleteNotification();

  return (
    <Link
      key={notification.id}
      href={notification.link}
      onClick={() => {
        if (!notification.isRead) {
          markNotificationAsRead({ id: notification.id });
        }
        onClose();
      }}
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
        <p className="line-clamp-2 text-xs">{notification.description}</p>
        <span className="text-xs">
          {format(new Date(notification.date), "d MMMM yyyy")}
        </span>
      </div>
      <div className="ml-auto flex flex-col justify-end space-y-1 opacity-0 group-hover:opacity-100">
        {!notification.isRead && (
          <Button
            variant="outline"
            className="h-5 text-xs font-medium"
            title="mark as read"
            onClick={(e) => {
              if (isMarkingAsRead) return;
              e.preventDefault();
              e.stopPropagation();
              markNotificationAsRead({ id: notification.id });
            }}
          >
            <CheckIcon size={14} />
          </Button>
        )}
        <Button
          variant="outline"
          className="h-5 text-xs font-medium"
          title="delete"
          onClick={(e) => {
            if (isDeleting) return;
            e.preventDefault();
            e.stopPropagation();
            deleteNotification({ id: notification.id });
          }}
        >
          <MinusIcon size={14} />
        </Button>
      </div>
    </Link>
  );
};

export default Notifications;
