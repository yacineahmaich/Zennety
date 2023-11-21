import { PlusCircleIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
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

const CreateWorkspace = () => {
  const { t } = useTranslation();
  const form = useForm();

  const onSubmit = () => {};

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
            <DialogHeader>
              <DialogTitle>{t("create-workspace-title")}</DialogTitle>
              <DialogDescription>
                {t("create-workspace-subtitle")}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
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
              </form>
            </Form>
            <DialogFooter>
              <Button size="sm" type="submit" className="mt-4 w-full">
                {t("create-workspace")}
              </Button>
            </DialogFooter>
          </div>
          <div className="flex-1 rounded-lg bg-foreground"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
