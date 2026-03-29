import { Button } from "@/components/ui/button";
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
import { UploadIcon, XSquareIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = { workspace: IWorkspace };

const WorkspaceInformationForm = ({ workspace }: Props) => {
  const { t } = useTranslation("common");
  const { updateWorkspace, isLoading } = useUpdateWorkspace();
  const { updateWorkspaceAvatar } = useUpdateWorkspaceAvatar();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workspace.name,
      description: workspace.description ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: workspace.name,
      description: workspace.description ?? "",
    });
  }, [workspace.id, workspace.name, workspace.description, form]);

  const onSubmit = (data: FormValues) => {
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
        },
      }
    );
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">
        {t("update-workspace-informations")}
      </h4>
      <p className="mb-4 mt-1 text-xs text-muted-foreground">
        {t("update-workspace-informations-subtitle")}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="relative">
              <input
                id="workspace-logo"
                type="file"
                hidden
                accept="image/*"
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
                <AvatarImage src={workspace.avatar} alt={workspace.name} />
                <AvatarFallback>{workspace.name[0]}</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="mt-1 w-full rounded bg-accent p-1 text-xs font-medium"
                  >
                    Edit
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex items-center gap-2" asChild>
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
            <FormDescription>{t("workspace-avatar-hint")}</FormDescription>
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
                <FormDescription>{t("workspace-name-text")}</FormDescription>
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
          <Button type="submit" size="sm" disabled={isLoading}>
            {t("update-workspace")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WorkspaceInformationForm;
