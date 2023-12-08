import { cn } from "@/lib/utils";
import { useCreateWorkspace } from "@/services/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe2Icon, LockIcon, PlusCircleIcon } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(4).max(25),
  description: z.string().max(255).optional(),
  visibility: z.enum(["Public", "Private"]),
});

export type CreateWorkspace = z.infer<typeof formSchema>;

const CreateWorkspace = () => {
  const { t } = useTranslation();
  const { createWorkspace, isLoading } = useCreateWorkspace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visibility: "Private",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createWorkspace(values, {
      onSuccess(data) {
        if (data.id) {
          // router.push(`/app/workspace/${data.id}`);
          window.location.href = `/app/w/${data.id}`;
        }
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircleIcon size={20} className="mr-2" /> {t("create")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto lg:min-w-[85vw]">
        <div className="flex gap-8 pt-6">
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
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
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("visibility")}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-1"
                        >
                          <FormItem
                            className={cn(
                              "flex-1 rounded-lg",
                              field.value === "Private" &&
                                "ring-2 ring-ring ring-offset-2"
                            )}
                          >
                            <FormLabel className="block cursor-pointer select-none space-y-2 p-2 font-normal">
                              <div className="flex items-center space-x-2">
                                <LockIcon size={16} />
                                <FormControl>
                                  <RadioGroupItem
                                    value="Private"
                                    className="hidden"
                                  />
                                </FormControl>
                                <span>{t("private")}</span>
                              </div>
                              <FormDescription>
                                {t("private-text")}
                              </FormDescription>
                            </FormLabel>
                          </FormItem>
                          <FormItem
                            className={cn(
                              "flex-1 rounded-lg",
                              field.value === "Public" &&
                                "ring-2 ring-ring ring-offset-2"
                            )}
                          >
                            <FormLabel className="block cursor-pointer select-none space-y-2 p-2 font-normal">
                              <div className="flex items-center space-x-2">
                                <Globe2Icon size={16} />
                                <FormControl>
                                  <RadioGroupItem
                                    value="Public"
                                    className="hidden"
                                  />
                                </FormControl>
                                <span>{t("public")}</span>
                              </div>
                              <FormDescription>
                                {t("public-text")}
                              </FormDescription>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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
          <div className="hidden flex-1 rounded-lg bg-foreground lg:block"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
