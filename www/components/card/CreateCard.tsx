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
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  workspaceId: z.number(),
  boardId: z.number(),
  statusId: z.number(),
});

export type CreateCard = z.infer<typeof formSchema>;

const CreateCard = ({
  status,
  onHide,
}: {
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
  });

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
