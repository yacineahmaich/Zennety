import { useCan } from "@/hooks/useCan";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useUpdateBoard } from "@/services";
import {
  CalendarSearchIcon,
  ChevronsRightIcon,
  KanbanIcon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import InviteMembers from "../shared/InviteMembers";
import PinButton from "../shared/PinButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";

const BoardBanner = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation("common");
  const canInvite = useCan("update", "board", board.id);
  const { updateBoard, isLoading, variables } = useUpdateBoard();

  const [name, setName] = useState(board.name);
  const [editing, setEditing] = useState(false);

  const members = board?.members || [];

  return (
    <header className="-mx-4 flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {editing ? (
          <input
            className="m-0 text-xl font-semibold"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onBlur={() => {
              setEditing(false);
              if (name === board?.name) return;
              if (name === "") {
                setName(board?.name);
                return;
              }
              updateBoard({
                workspaceId: board.workspaceId,
                boardId: board.id,
                data: {
                  name,
                },
              });
            }}
          />
        ) : (
          <h2
            className="text-xl font-semibold"
            onClick={() => setEditing(true)}
          >
            {/* @ts-ignore */}
            {isLoading ? variables?.data?.name : board?.name}
          </h2>
        )}

        <div className="border-r pr-2">
          <PinButton
            resourceType="board"
            resourceId={board?.id}
            pinned={board?.pinned}
          />
        </div>

        <div className="flex items-center">
          <div className="flex select-none items-center -space-x-2 hover:space-x-0">
            {members?.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                title={member.profile.name}
                className="h-8 w-8 transition-all hover:shadow-xl"
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={member.profile.name}
                />
                <AvatarFallback>{member.profile.name}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          {members.length > 3 && (
            <Link href={route("board/members", board.workspaceId, board.id)}>
              <ChevronsRightIcon size={14} className="text-muted-foreground" />
            </Link>
          )}
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
              resourceId={board?.id}
              resourceType="board"
              title={t("invite-to-board-title")}
              subtitle={t("invite-to-board-subtitle")}
            />
          )}
          <Link
            href={route("board", board.workspaceId, board.id)}
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-xs"
            )}
          >
            <KanbanIcon size={16} className="mr-1" /> {t("kanban")}
          </Link>
          <Link
            href={route("board/settings", board.workspaceId, board.id)}
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-xs"
            )}
          >
            <SettingsIcon size={16} className="mr-1" /> {t("settings")}
          </Link>
          <Link
            href={route("board/members", board.workspaceId, board.id)}
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-xs"
            )}
          >
            <UserIcon size={16} className="mr-1" /> {t("members")}
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-xs"
            )}
          >
            <CalendarSearchIcon size={16} className="mr-1" /> {t("activity")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BoardBanner;
