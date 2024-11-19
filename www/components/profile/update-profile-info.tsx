import { Button } from "@/components/ui/button";
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
import { useUpdateProfile, useUser } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().max(100),
  email: z.string().email(),
  bio: z.string().max(100).optional(),
});

export type UpdateWorkspace = z.infer<typeof formSchema>;

const UpdateProfileInfo = () => {
  const { t } = useTranslation("common");
  const { user } = useUser();

  const { updateProfile, isLoading } = useUpdateProfile();

  const form = useForm<UpdateWorkspace>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio ?? "",
    },
  });

  const onSubmit = (data: UpdateWorkspace) => {
    updateProfile(data, {
      onSuccess() {
        toast.success(t("success"), {
          description: t("updated", { resource: t("profile-infomations") }),
        });
      },
    });
  };
  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-semibold">{t("profile-infomations")}</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormDescription>{t("profile-name-desc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("workspace-name-placeholder")}
                      autoComplete="off"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormDescription>{t("profile-email-desc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("bio")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("workspace-description-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("profile-bio-desc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              type="submit"
              className="mt-4 w-full"
              disabled={isLoading}
            >
              {t("update-profile")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfileInfo;
