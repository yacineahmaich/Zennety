import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useUser } from "@/services";
import { useCardComments, useCreateCardComment } from "@/services/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistance } from "date-fns";
import { MessageSquareTextIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  workspaceId: z.number(),
  boardId: z.number(),
  statusId: z.number(),
  cardId: z.number(),
  comment: z.string(),
});

type CreateCardComment = z.infer<typeof formSchema>;

const CardComments = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const { t } = useTranslation("common");
  const {
    createCardComment,
    isLoading: isCreatingComment,
    variables,
  } = useCreateCardComment();
  const { user } = useUser();
  const [activated, setActivated] = useState(false);

  const { comments, isLoading } = useCardComments({
    workspaceId: board.workspaceId,
    boardId: board.id,
    statusId: status.id,
    cardId: card.id,
  });

  const form = useForm<CreateCardComment>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceId: board.workspaceId,
      boardId: board.id,
      statusId: status.id,
      cardId: card.id,
    },
  });

  const onSubmit = (values: CreateCardComment) => {
    createCardComment(values);
    form.setValue("comment", "");
  };

  return (
    <div className="space-y-4 py-5">
      <div className="flex items-center gap-2">
        <MessageSquareTextIcon size={20} className="flex-shrink-0" />
        <h2 className="break-all">{t("comments")}</h2>
      </div>
      <div className="space-y-2">
        <div className="space-y-2 py-3 text-sm">
          <div className="w-full space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("create-comment")}
                          rows={1}
                          className={cn(
                            activated
                              ? "cursor-auto"
                              : "cursor-pointer bg-accent focus-visible:ring-0"
                          )}
                          onClick={() => setActivated(true)}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {activated && (
                  <div className="space-x-2">
                    <Button size="sm" disabled={isLoading}>
                      {t("post")}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
        <div className="space-y-2">
          {isCreatingComment && (
            <div className="space-y-2 rounded-lg px-5 py-3 text-sm opacity-75 transition-colors hover:bg-accent">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <h6>{user.name}</h6>
              </div>
              <p>{variables?.comment}</p>
            </div>
          )}
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="space-y-2 rounded-lg bg-accent px-5 py-3 text-sm transition-colors"
            >
              <div className="flex items-center gap-2 pb-2">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://avatars.githubusercontent.com/u/9768489?s=64&v=4"
                />
                <div>
                  <h6>{comment.causer?.name}</h6>
                  <small className="text-accent-foreground">
                    {formatDistance(new Date(comment?.created_at), new Date(), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
              </div>
              <p>{comment.properties?.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComments;
