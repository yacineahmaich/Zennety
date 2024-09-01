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
import { useUpdateCard } from "@/services/card";
import { Priority } from "@/types/enums";
import { format } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  FlagTriangleRightIcon,
  UserPlusIcon,
} from "lucide-react";
import { useState } from "react";

const CardOptions = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const [deadlinePickerOpen, setDeadlinePickerOpen] = useState(false);

  const { statuses } = useStatuses(
    board.workspaceId?.toString(),
    board.id?.toString()
  );

  const { updateCard, isLoading: isUpdating } = useUpdateCard();
  return (
    <div className="grid grid-cols-2 gap-y-4">
      <div className="space-y-3">
        <h6 className="text-sm font-medium">Status</h6>
        <Select
          value={status.id?.toString()}
          disabled={isUpdating}
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
              ?.find((m) => m.profile?.id === card?.assignee?.id)
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
                <UserAvatar className="h-3.5 w-3.5" user={card.assignee} />
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
                  <UserAvatar className="h-3.5 w-3.5" user={member.profile} />
                  <span className="ml-2 border-l pl-2 capitalize">
                    {member.profile.name}
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
          value={card.priority}
          disabled={isUpdating}
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
        >
          <SelectTrigger className="flex h-auto w-auto items-center gap-2 p-2 text-xs font-medium [&>svg:last-child]:hidden">
            {card.priority ? (
              <>
                <PriorityIcon priority={card.priority as Priority} />
                {card.priority && <span>{card.priority}</span>}
              </>
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
                        priorties.find((p) => p.label === priority.label)?.color
                      }
                      fill={
                        priorties.find((p) => p.label === priority.label)?.color
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
                <span>{format(new Date(card.deadline), "d MMMM yyyy")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={card.deadline ? new Date(card.deadline) : undefined}
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
  );
};

export default CardOptions;
