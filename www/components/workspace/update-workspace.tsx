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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  useUpdateWorkspace,
  useUpdateWorkspaceAvatar,
} from "@/services/workspace";
import { IWorkspace } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLineIcon, UploadIcon, XSquareIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255).optional(),
});

export type UpdateWorkspace = z.infer<typeof formSchema>;

type Props = { workspace: IWorkspace };

const UpdateWorkspace = ({ workspace }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { updateWorkspace, isLoading } = useUpdateWorkspace();
  const { updateWorkspaceAvatar } = useUpdateWorkspaceAvatar();

  const form = useForm<UpdateWorkspace>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workspace.name,
      description: workspace.description ?? "",
    },
  });

  const onSubmit = (data: UpdateWorkspace) => {
    updateWorkspace(
      {
        workspaceId: workspace.id,
        data,
      },
      {
        onSuccess() {
          toast.success(t("success"), {
            description: t("updated", {
              resource: t("workspace"),
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
        <Button size="sm" variant="secondary">
          <PenLineIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <div className="flex gap-8">
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <DialogHeader className="mb-4">
                  <DialogTitle>{t("update-workspace-title")}</DialogTitle>
                  <DialogDescription>
                    {t("update-workspace-subtitle")}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <input
                      id="workspace-logo"
                      type="file"
                      hidden
                      onChange={(e) => {
                        const avatar = e.target.files?.[0];
                        if (avatar) {
                          updateWorkspaceAvatar({
                            workspaceId: workspace.id,
                            avatar,
                          });
                        }
                      }}
                    />
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={workspace.avatar}
                        alt={workspace.name}
                      />
                      <AvatarFallback>{workspace.name[0]}</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="mt-1 w-full rounded bg-accent p-1 text-xs font-medium">
                          Edit
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          asChild
                        >
                          <label htmlFor="workspace-logo">
                            <UploadIcon size={14} />
                            {t("upload-photo")}
                          </label>
                        </DropdownMenuItem>
                        {workspace.has_avatar && (
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => {
                              updateWorkspaceAvatar({
                                workspaceId: workspace.id,
                                avatar: "unset",
                              });
                            }}
                          >
                            <XSquareIcon size={14} />
                            {t("remove-photo")}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormDescription>
                    This is the visual identity that represents your workspace.
                  </FormDescription>
                </div>

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
                    {t("update-workspace")}
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

export default UpdateWorkspace;
