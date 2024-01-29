import { useCreateStatus } from "@/services/status";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string(),
  workspaceId: z.number(),
  boardId: z.number(),
});

export type CreateStatus = z.infer<typeof formSchema>;

const CreateStatus = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);
  const { createStatus, isLoading } = useCreateStatus();

  const form = useForm<CreateStatus>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardId: board.id,
      workspaceId: board.workspaceId,
    },
  });

  const onSubmit = (values: CreateStatus) => {
    createStatus(values, {
      onSuccess(data) {
        toast({ title: `Status ${data.name} created` });
        setShowForm(false);
        form.unregister();
      },
    });
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)}>
        <Card className="flex w-64 shrink-0 items-center justify-between px-4 py-2">
          <h4 className="text-sm font-semibold">{t("add-new-status")}</h4>
          <PlusIcon size={16} />
        </Card>
      </button>
    );
  }
  return (
    <div className="w-64 shrink-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("status-name-placeholder")}
                    className="uppercase placeholder:normal-case"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <div className="flex gap-1">
            <Button
              size="icon"
              className="h-7 w-full text-xs"
              disabled={isLoading}
            >
              <CheckIcon size={16} className="mr-1" /> {t("save")}
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-full text-xs"
              onClick={() => {
                setShowForm(false);
                form.unregister();
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

export default CreateStatus;
