import Loader from "@/components/shared/Loader";
import PriorityIcon from "@/components/shared/PriorityIcon";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { priorties } from "@/lib/constants";
import { useStatuses } from "@/services";
import { useCard, useUpdateCard } from "@/services/card";
import { Priority } from "@/types/enums";
import { format } from "date-fns";
import {
  CalendarIcon,
  CalendarSearchIcon,
  CircleDashedIcon,
  FlagTriangleRightIcon,
  UserPlusIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ActivityList from "./ActivityList";
import CardDescription from "./CardDescription";
import CardTitle from "./CardTitle";
import CreateComment from "./CreateComment";

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

  const [deadlinePickerOpen, setDeadlinePickerOpen] = useState(false);

  const { statuses } = useStatuses(
    board.workspaceId?.toString(),
    board.id?.toString()
  );

  const { card, isLoading } = useCard({
    workspaceId: board.workspaceId,
    boardId: board.id,
    statusId: status.id,
    cardId: cardId,
  });

  const { updateCard, isLoading: isUpdating } = useUpdateCard();

  if (isLoading)
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );

  if (!card) return null;

  return (
    <div className="grid max-h-full flex-1 grid-cols-6 divide-x overflow-hidden">
      <div className="col-span-4 divide-y">
        <div className="p-5">
          <CardTitle board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <CardDescription board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-y-4">
            <div className="space-y-3">
              <h6 className="text-sm font-medium">Status</h6>
              <Select
                onValueChange={(statusId) => {
                  updateCard({
                    workspaceId: board.workspaceId,
                    boardId: board.id,
                    cardId: card.id,
                    statusId: status.id,
                    data: {
                      status_id: statusId,
                    },
                  });
                }}
                disabled={isUpdating}
              >
                <SelectTrigger className="flex h-auto w-auto items-center gap-2 p-2 text-xs font-medium [&>svg:last-child]:hidden">
                  <CircleDashedIcon size={14} />
                  <span>{status.name}</span>
                </SelectTrigger>
                <SelectContent>
                  {statuses?.map((status) => (
                    <SelectItem key={status.id} value={status.id?.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <h6 className="text-sm font-medium">Assignee</h6>
              <Select
                value={
                  board?.members
                    ?.find((m) => m.profile?.id === card?.assignee.id)
                    ?.id?.toString() ?? ""
                }
                onValueChange={(assignee) => {
                  updateCard({
                    workspaceId: board.workspaceId,
                    boardId: board.id,
                    cardId: card.id,
                    statusId: status.id,
                    data: {
                      assignee,
                    },
                  });
                }}
                disabled={isUpdating}
              >
                <SelectTrigger className="flex h-auto w-auto items-center p-2 text-xs font-medium [&>svg:last-child]:hidden">
                  {card.assignee ? (
                    <div className="flex items-center">
                      <UserAvatar
                        className="h-3.5 w-3.5"
                        user={card.assignee}
                      />
                      <span className="ml-2 border-l pl-2 capitalize">
                        {card.assignee.name}
                      </span>
                    </div>
                  ) : (
                    <UserPlusIcon size={14} />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {board?.members?.map((member) => (
                    <SelectItem key={member.id} value={member.id?.toString()}>
                      <div className="flex items-center">
                        <UserAvatar
                          className="h-3.5 w-3.5"
                          user={card.assignee}
                        />
                        <span className="ml-2 border-l pl-2 capitalize">
                          {card.assignee.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <h6 className="text-sm font-medium">Prority</h6>
              <Select
                onValueChange={(priority) => {
                  updateCard({
                    workspaceId: board.workspaceId,
                    boardId: board.id,
                    cardId: card.id,
                    statusId: status.id,
                    data: {
                      priority,
                    },
                  });
                }}
                disabled={isUpdating}
              >
                <SelectTrigger className="flex h-auto w-auto items-center gap-2 p-2 text-xs font-medium [&>svg:last-child]:hidden">
                  {card.priority ? (
                    <div className="flex items-center gap-2">
                      <PriorityIcon priority={card.priority as Priority} />
                      <span>{card.priority}</span>
                    </div>
                  ) : (
                    <FlagTriangleRightIcon size={14} />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorties.map((priority) => (
                      <SelectItem key={priority.label} value={priority.label}>
                        <div className="flex items-center gap-2">
                          <FlagTriangleRightIcon
                            size={14}
                            color={
                              priorties.find((p) => p.label === priority.label)
                                ?.color
                            }
                            fill={
                              priorties.find((p) => p.label === priority.label)
                                ?.color
                            }
                          />
                          <span>{priority.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <h6 className="text-sm font-medium">Deadline</h6>
              <Popover
                open={deadlinePickerOpen}
                onOpenChange={setDeadlinePickerOpen}
                modal={true}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isUpdating}
                    className="flex h-auto w-auto items-center gap-2 rounded border p-2 text-xs font-medium [&>svg:last-child]:hidden"
                  >
                    <div>
                      <CalendarIcon size={14} />
                    </div>
                    {card.deadline && (
                      <span>
                        {format(new Date(card.deadline), "d MMMM yyyy")}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      card.deadline ? new Date(card.deadline) : undefined
                    }
                    onSelect={(deadline) => {
                      updateCard({
                        workspaceId: board.workspaceId,
                        boardId: board.id,
                        cardId: card.id,
                        statusId: status.id,
                        data: {
                          deadline,
                        },
                      });
                      setDeadlinePickerOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden p-5 pr-0">
        <div className="flex h-full w-full flex-1 flex-col">
          <div className="flex items-center gap-2">
            <CalendarSearchIcon size={18} className="flex-shrink-0" />
            <h2 className="break-all">{t("activity")}</h2>
          </div>
          <ActivityList activities={card.activities ?? []} />
          <CreateComment board={board} status={status} card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
