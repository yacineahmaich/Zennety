import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { priorties } from "@/lib/constants";
import { useCreateCard } from "@/services/card";
import { Priority } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckIcon,
  FlagTriangleRightIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PriorityIcon from "../shared/PriorityIcon";
import UserAvatar from "../shared/UserAvatar";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

const formSchema = z.object({
  workspaceId: z.number(),
  boardId: z.number(),
  statusId: z.number(),

  name: z.string(),
  description: z.string().nullable(),
  assignee: z.string().default(""),
  priority: z.nativeEnum(Priority).nullable(),
  deadline: z.date().nullable(),
});

export type CreateCard = z.infer<typeof formSchema>;

const CreateCard = ({
  board,
  status,
  onHide,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  onHide: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const { createCard, isLoading } = useCreateCard();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  const form = useForm<CreateCard>({
    defaultValues: {
      workspaceId: +workspaceId,
      boardId: +boardId,
      statusId: status.id,
      assignee: "",
      description: "",
      deadline: null,
      priority: null,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: CreateCard) => {
    createCard(values, {
      onSuccess() {
        onHide();
      },
    });
  };

  useEffect(() => {
    ref.current?.scrollIntoView();
    form.setFocus("name");
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl ref={ref}>
                  <Textarea
                    placeholder={t("card-name-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-evenly gap-1 rounded bg-background p-1">
            {/* Assignee */}
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem className="flex flex-1 rounded">
                  <FormControl ref={ref}>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="relative flex h-auto flex-1 cursor-pointer justify-center rounded-[inherit] p-1 text-muted-foreground hover:bg-accent [&>svg:last-child]:hidden">
                        {field.value ? (
                          <UserAvatar
                            className="h-3.5 w-3.5"
                            user={
                              board.members?.find(
                                (m) => m.id?.toString() === field.value
                              )?.profile!
                            }
                          />
                        ) : (
                          <UserPlusIcon size={14} />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {board.members?.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id?.toString()}
                          >
                            <div className="!flex items-center gap-2">
                              <UserAvatar
                                user={member.profile}
                                showCard={false}
                                className="h-6 w-6"
                              />
                              <div>
                                <span className="text-sm">
                                  {member.profile.name}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deadline */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex flex-1 cursor-pointer justify-center rounded border border-input bg-background p-1 text-[0.6rem] font-bold text-muted-foreground hover:bg-accent">
                        {field.value ? (
                          format(new Date(field.value), "d-MM-yy")
                        ) : (
                          <CalendarIcon size={14} />
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex-1 rounded">
                  <FormControl ref={ref}>
                    <Select
                      defaultValue={field.value as string}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="flex h-auto flex-1 cursor-pointer justify-center rounded-[inherit] p-1 text-muted-foreground hover:bg-accent [&>svg:last-child]:hidden">
                        {field.value ? (
                          <PriorityIcon priority={field.value} />
                        ) : (
                          <FlagTriangleRightIcon size={14} />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {priorties.map((priority) => (
                            <SelectItem
                              key={priority.label}
                              value={priority.label}
                            >
                              <div className="flex items-center gap-2">
                                <FlagTriangleRightIcon
                                  size={14}
                                  color={
                                    priorties.find(
                                      (p) => p.label === priority.label
                                    )?.color
                                  }
                                  fill={
                                    priorties.find(
                                      (p) => p.label === priority.label
                                    )?.color
                                  }
                                />
                                <span>{priority.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-1">
            <Button
              type="submit"
              size="icon"
              className="h-7 w-full text-xs"
              disabled={isLoading}
            >
              <CheckIcon size={16} className="mr-1" /> {t("save")}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-7 w-full text-xs"
              onClick={() => {
                onHide();
              }}
            >
              <XIcon size={16} className="mr-1" /> {t("cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCard;
