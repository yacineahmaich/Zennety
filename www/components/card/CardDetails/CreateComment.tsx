import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCardComment } from "@/services/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
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

interface CreateCommentProps {
  status: App.Models.Status;
  board: App.Models.Board;
  card: App.Models.Card;
  onCancel: () => void;
}

const CreateComment = ({
  status,
  board,
  card,
  onCancel,
}: CreateCommentProps) => {
  const { t } = useTranslation("common");

  const {
    createCardComment,
    isLoading: isCreatingComment,
    variables,
  } = useCreateCardComment();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mb-2 space-y-2 border-b p-3 text-sm">
                  <div className="flex gap-2">
                    <img
                      className="h-8 w-8 rounded object-cover"
                      src="https://avatars.githubusercontent.com/u/9768489?s=64&v=4"
                    />
                    <div className="flex flex-col">
                      <h6>Yacine</h6>
                      <small className="text-accent-foreground">
                        {format(new Date(), "d MMMM yyyy H:mm")}
                      </small>
                    </div>
                  </div>
                  <Textarea
                    {...field}
                    rows={1}
                    placeholder={t("create-comment")}
                    autoFocus
                    className="border-none p-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Button size="sm" disabled={isCreatingComment} className="h-7 px-6">
            {t("post")}
          </Button>
          <Button
            size="sm"
            type="button"
            variant="ghost"
            disabled={isCreatingComment}
            onClick={onCancel}
            className="h-7 px-6"
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateComment;
