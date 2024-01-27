import { useCan } from "@/hooks/useCan";
import { Namespace } from "@/types/enums";
import {
  CalendarSearchIcon,
  ChevronsRightIcon,
  SettingsIcon,
  StarIcon,
  UserPlusIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import InviteMembers from "../shared/InviteMembers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const BoardBanner = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation("common");
  const canInvite = useCan("update", Namespace.BOARD, board.id);

  return (
    <header className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{board.name}</h2>
        <button className="border-r pr-2">
          <StarIcon size={16} />
        </button>
        <div className="flex select-none items-center -space-x-2 hover:space-x-1">
          <Avatar className="h-7 w-7 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7 transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button>
            <ChevronsRightIcon
              size={14}
              className="translate-x-2 text-muted-foreground"
            />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {canInvite && (
            <InviteMembers
              openTrigger={
                <Button size="sm" className="flex items-center gap-2 text-xs">
                  <UserPlusIcon size={16} /> {t("share")}
                </Button>
              }
              targetId={board?.id}
              namespace={Namespace.BOARD}
              title={t("invite-to-board-title")}
              subtitle={t("invite-to-board-subtitle")}
            />
          )}
          <Button
            size="sm"
            variant="link"
            className="flex items-center gap-2 text-xs"
          >
            <SettingsIcon size={16} /> {t("settings")}
          </Button>
          <Button
            size="sm"
            variant="link"
            className="flex items-center gap-2 text-xs"
          >
            <CalendarSearchIcon size={16} /> {t("activity")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BoardBanner;
