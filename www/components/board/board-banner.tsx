import type { BoardSettingsSection } from "@/components/board/board-settings-sections";
import BookmarkButton from "@/components/shared/bookmark-button";
import InviteMembers from "@/components/shared/invite-members";
import UserAvatar from "@/components/shared/user-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCan } from "@/hooks/use-can";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useUpdateBoard } from "@/services";
import { IBoard } from "@/types/models";
import {
  ChevronsRightIcon,
  Globe2Icon,
  KanbanIcon,
  SettingsIcon,
  ShieldAlertIcon,
  UserIcon,
  UserPlusIcon,
  WrenchIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";

type Props = {
  board: IBoard;
  /** Sub-page navigation (board settings area only). */
  settingsActiveSection?: BoardSettingsSection | null;
};

const BoardBanner = ({ board, settingsActiveSection = null }: Props) => {
  const { t } = useTranslation("common");
  const canUpdate = useCan("update", "board", board.id);
  const canDeleteBoard = useCan("delete", "board", board.id);
  const { updateBoard, isLoading, variables } = useUpdateBoard();

  const [name, setName] = useState(board.name);
  const [editing, setEditing] = useState(false);

  const navClass = (section: BoardSettingsSection) =>
    cn(
      buttonVariants({ size: "sm", variant: "ghost" }),
      "justify-start gap-2",
      settingsActiveSection === section &&
        "bg-accent text-accent-foreground hover:bg-accent/90"
    );

  return (
    <section className="-mx-4 flex flex-col gap-4 border-b p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          {editing ? (
            <input
              className="m-0 text-xl font-semibold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onBlur={() => {
                setEditing(false);
                if (name === board.name) return;
                if (name === "") {
                  setName(board.name);
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
              {isLoading ? variables?.data?.name : board.name}
            </h2>
          )}

          <div className="border-r pr-2">
            <BookmarkButton
              resourceType="board"
              resourceId={board.id}
              pinned={board.pinned}
            />
          </div>

          <div className="flex items-center">
            <div className="flex select-none items-center -space-x-2">
              {board.members
                ?.slice(0, 3)
                .map((member) => (
                  <UserAvatar key={member.id} user={member.profile} />
                ))}
            </div>
            {board.members && board.members.length > 3 && (
              <Link href={route("board/members", board.workspaceId, board.id)}>
                <ChevronsRightIcon
                  size={14}
                  className="text-muted-foreground"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center overflow-x-auto p-1">
            {canUpdate && (
              <InviteMembers
                openTrigger={
                  <Button size="sm" className="flex items-center gap-2 text-xs">
                    <UserPlusIcon size={16} />
                    <span className="hidden sm:block">{t("share")}</span>
                  </Button>
                }
                resourceId={board.id}
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
              <KanbanIcon size={16} className="mr-1" />
              <span>{t("kanban")}</span>
            </Link>
            <Link
              href={route("board/settings", board.workspaceId, board.id)}
              className={cn(
                buttonVariants({ size: "sm", variant: "link" }),
                "text-xs"
              )}
            >
              <SettingsIcon size={16} className="mr-1" />
              <span>{t("settings")}</span>
            </Link>
            <Link
              href={route("board/members", board.workspaceId, board.id)}
              className={cn(
                buttonVariants({ size: "sm", variant: "link" }),
                "text-xs"
              )}
            >
              <UserIcon size={16} className="mr-1" />
              <span>{t("members")}</span>
            </Link>
          </div>
        </div>
      </div>

      {settingsActiveSection != null && (
        <nav
          className="flex flex-wrap gap-1 border-t border-border pt-4"
          aria-label={t("board-settings")}
        >
          {canUpdate && (
            <Link
              href={route(
                "board/settings/details",
                board.workspaceId,
                board.id
              )}
              className={navClass("details")}
            >
              <WrenchIcon size={16} className="shrink-0 opacity-70" />
              {t("board-settings-nav-details")}
            </Link>
          )}
          {canUpdate && (
            <Link
              href={route(
                "board/settings/visibility",
                board.workspaceId,
                board.id
              )}
              className={navClass("visibility")}
            >
              <Globe2Icon size={16} className="shrink-0 opacity-70" />
              {t("board-settings-nav-visibility")}
            </Link>
          )}
          {canDeleteBoard && (
            <Link
              href={route("board/settings/admin", board.workspaceId, board.id)}
              className={navClass("admin")}
            >
              <ShieldAlertIcon size={16} className="shrink-0 opacity-70" />
              {t("board-settings-nav-admin")}
            </Link>
          )}
        </nav>
      )}
    </section>
  );
};

export default BoardBanner;
