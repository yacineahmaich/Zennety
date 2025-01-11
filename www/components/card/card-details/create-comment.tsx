import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCardComment } from "@/services/card";
import { IBoard, ICard, IStatus } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  status: IStatus;
  board: IBoard;
  card: ICard;
};

const formSchema = z.object({
  workspaceId: z.number(),
  boardId: z.number(),
  statusId: z.number(),
  cardId: z.number(),

  comment: z.string(),
});

export type CreateComment = z.infer<typeof formSchema>;

const CreateComment = ({ board, status, card }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { createCardComment, isLoading } = useCreateCardComment();

  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  const form = useForm<CreateComment>({
    defaultValues: {
      workspaceId: +workspaceId,
      boardId: +boardId,
      statusId: status.id,
      cardId: card.id,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: CreateComment) => {
    console.log(values);
    createCardComment(values, {
      onSuccess() {
        form.reset((df) => ({ ...df, comment: "" }));
      },
    });
  };

  return (
    <div className="-ml-5 border-t">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full gap-2 p-3 pb-0">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea placeholder={t("share-thoughts")} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button size="sm" className="h-full" disabled={isLoading}>
                <SendIcon size={18} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateComment;
