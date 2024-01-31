import { useCan } from "@/hooks/useCan";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useCreateBoard } from "@/services";
import { Visibility } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe2Icon, LockIcon } from "lucide-react";
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
  workspaceId: z.number(),
  visibility: z.nativeEnum(Visibility),
});

export type CreateBoard = z.infer<typeof formSchema>;

const CreateBoard = ({
  workspace,
  openTrigger,
}: {
  workspace: App.Models.Workspace;
  openTrigger: JSX.Element;
}) => {
  const { t } = useTranslation("common");
  const { createBoard, isLoading } = useCreateBoard();
  const canCreate = useCan("update", "workspace", workspace.id);

  const form = useForm<CreateBoard>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceId: workspace.id,
      visibility: Visibility.PRIVATE,
    },
  });

  const onSubmit = (values: CreateBoard) => {
    createBoard(values, {
      onSuccess({ workspaceId, id }) {
        if (id) {
          window.location.href = route("board", workspaceId, id);
        }
      },
    });
  };

  if (!canCreate) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto lg:min-w-[85vw]">
        <div className="flex gap-8 pt-6">
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <DialogHeader>
                  <DialogTitle>{t("create-board-title")}</DialogTitle>
                  <DialogDescription>
                    {t("create-board-subtitle")}
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
                          placeholder={t("board-name-placeholder")}
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
                              field.value === Visibility.PRIVATE &&
                                "ring-2 ring-ring ring-offset-2 ring-offset-background"
                            )}
                          >
                            <FormLabel className="block cursor-pointer select-none space-y-2 p-2 font-normal">
                              <div className="flex items-center space-x-2">
                                <LockIcon size={16} />
                                <FormControl>
                                  <RadioGroupItem
                                    value={Visibility.PRIVATE}
                                    className="hidden"
                                  />
                                </FormControl>
                                <span>{t("private")}</span>
                              </div>
                              <FormDescription>
                                {t("private-board-text")}
                              </FormDescription>
                            </FormLabel>
                          </FormItem>
                          <FormItem
                            className={cn(
                              "flex-1 rounded-lg",
                              field.value === Visibility.PUBLIC &&
                                "ring-2 ring-ring ring-offset-2 ring-offset-background"
                            )}
                          >
                            <FormLabel className="block cursor-pointer select-none space-y-2 p-2 font-normal">
                              <div className="flex items-center space-x-2">
                                <Globe2Icon size={16} />
                                <FormControl>
                                  <RadioGroupItem
                                    value={Visibility.PUBLIC}
                                    className="hidden"
                                  />
                                </FormControl>
                                <span>{t("public")}</span>
                              </div>
                              <FormDescription>
                                {t("public-board-text")}
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
                    {t("create-board")}
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

export default CreateBoard;
