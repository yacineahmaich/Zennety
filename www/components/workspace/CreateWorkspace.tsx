import { useCreateWorkspace } from "@/services/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
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
  name: z.string().min(4).max(55),
  description: z.string().max(55),
});

export type CreateWorkspace = z.infer<typeof formSchema>;

const CreateWorkspace = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { createWorkspace, isLoading } = useCreateWorkspace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createWorkspace(values, {
      onSuccess(data) {
        if (data.id) {
          router.push(`/app/workspace/${data.id}`);
          form.reset({ description: "", name: "" });
        }
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("workspace-name-placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("workspace-name-text")}
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
