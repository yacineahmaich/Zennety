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
  useUpdateOrganization,
  useUpdateOrganizationAvatar,
} from "@/services/organization";
import { IOrganization } from "@/types/models";
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

type Props = { organization: IOrganization };

const OrganizationInformationForm = ({ organization }: Props) => {
  const { t } = useTranslation("common");
  const { updateOrganization, isLoading } = useUpdateOrganization();
  const { updateOrganizationAvatar } = useUpdateOrganizationAvatar();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization.name,
      description: organization.description ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: organization.name,
      description: organization.description ?? "",
    });
  }, [organization.id, organization.name, organization.description, form]);

  const onSubmit = (data: FormValues) => {
    updateOrganization(
      {
        organizationId: organization.id,
        data,
      },
      {
        onSuccess() {
          toast.success(t("success"), {
            description: t("updated", {
              resource: t("organization"),
            }),
          });
        },
      }
    );
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">
        {t("update-organization-informations")}
      </h4>
      <p className="mb-4 mt-1 text-xs text-muted-foreground">
        {t("update-organization-subtitle")}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="relative">
              <input
                id="organization-logo"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const avatar = e.target.files?.[0];
                  if (avatar) {
                    updateOrganizationAvatar({
                      organizationId: organization.id,
                      avatar,
                    });
                  }
                }}
              />
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={organization.avatar}
                  alt={organization.name}
                />
                <AvatarFallback>{organization.name[0]}</AvatarFallback>
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
                    <label htmlFor="organization-logo">
                      <UploadIcon size={14} />
                      {t("upload-photo")}
                    </label>
                  </DropdownMenuItem>
                  {organization.has_avatar && (
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => {
                        updateOrganizationAvatar({
                          organizationId: organization.id,
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
            <FormDescription>{t("organization-avatar-hint")}</FormDescription>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("organization-name-placeholder")}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
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
                    placeholder={t("organization-description-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" disabled={isLoading}>
            {t("update-organization")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationInformationForm;
