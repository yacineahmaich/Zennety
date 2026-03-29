import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBoard } from "@/services";
import { IBoard } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = { board: IBoard };

const BoardInformationForm = ({ board }: Props) => {
  const { t } = useTranslation("common");
  const { updateBoard, isLoading } = useUpdateBoard();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: board.name,
      description: board.description ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: board.name,
      description: board.description ?? "",
    });
  }, [board.id, board.name, board.description, form]);

  const onSubmit = (data: FormValues) => {
    updateBoard(
      {
        workspaceId: board.workspaceId,
        boardId: board.id,
        data,
      },
      {
        onSuccess() {
          toast.success(t("success"), {
            description: t("updated", {
              resource: t("board"),
            }),
          });
        },
      }
    );
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">{t("update-board-title")}</h4>
      <p className="mb-4 mt-1 text-xs text-muted-foreground">
        {t("update-board-informations-subtitle")}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("board-name-placeholder")}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("board-name-text")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("description")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("board-description-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("board-description-text")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" disabled={isLoading}>
            {t("update-board")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardInformationForm;
