import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareTextIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  comment: z.string(),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <div className="space-y-4 py-5">
      <div className="flex items-center gap-2">
        <MessageSquareTextIcon size={20} className="flex-shrink-0" />
        <h2 className="break-all">{t("comments")}</h2>
      </div>
      <div className="space-y-2">
        <div className="space-y-2 px-5 py-3 text-sm">
          <div className="flex gap-2">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300"></div>
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
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-x-2">
                    <Button variant="secondary" size="sm">
                      {t("create-comment")}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="space-y-2 rounded-lg px-5 py-3 text-sm transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <h6>yacine</h6>
            </div>
            <p>Cant go a day without coding. ❤️🟡</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComments;
