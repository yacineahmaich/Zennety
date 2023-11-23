import { useCreateWorkspace } from "@/services/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1).max(55),
  description: z.string().max(55),
});

export type CreateWorkspace = z.infer<typeof formSchema>;

const CreateWorkspace = () => {
  const { t } = useTranslation();
  const { createWorkspace, isLoading } = useCreateWorkspace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createWorkspace(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircleIcon size={20} className="mr-2" /> {t("create")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <div className="flex gap-8 pt-6">
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <DialogHeader>
                  <DialogTitle>{t("create-workspace-title")}</DialogTitle>
                  <DialogDescription>
                    {t("create-workspace-subtitle")}
                  </DialogDescription>
                </DialogHeader>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("title")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("workspace-title-placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("workspace-title-text")}
                      </FormDescription>
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
                          placeholder={t("workspace-description-placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("workspace-description-text")}
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
                    {t("create-workspace")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
          <div className="flex-1 rounded-lg bg-foreground"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
