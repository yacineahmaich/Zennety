import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCard } from "@/services/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  workspaceId: z.number(),
  boardId: z.number(),
  statusId: z.number(),
});

export type CreateCard = z.infer<typeof formSchema>;

const CreateCard = ({ status }: { status: App.Models.Status }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);
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
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: CreateCard) => {
    createCard(values, {
      onSuccess() {
        setShowForm(false);
        form.unregister();
      },
    });
  };

  if (!showForm) {
    return (
      <Button
        size="sm"
        variant="secondary"
        className="w-full text-xs text-muted-foreground"
        onClick={() => setShowForm(true)}
      >
        <PlusIcon size={16} className="mr-2" /> {t("add-new-card")}
      </Button>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={t("card-name-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default CreateCard;
