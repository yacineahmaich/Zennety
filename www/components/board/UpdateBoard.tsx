import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLineIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255).optional(),
});

export type UpdateBoard = z.infer<typeof formSchema>;

const UpdateBoard = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { updateBoard, isLoading } = useUpdateBoard();

  const form = useForm<UpdateBoard>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: board?.name,
      description: board?.description ?? "",
    },
  });

  const onSubmit = (data: UpdateBoard) => {
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
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <PenLineIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <div className="flex gap-8">
          <div className="flex-1">
            <DialogHeader className="mb-2">
              <DialogTitle>{t("update-board-title")}</DialogTitle>
              <DialogDescription>
                {t("update-board-subtitle")}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("workspace-name-placeholder")}
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
                      <FormDescription>
                        {t("board-description-text")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    size="sm"
                    type="submit"
                    className="mt-4 w-full"
                    disabled={isLoading}
                  >
                    {t("update-board")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBoard;
