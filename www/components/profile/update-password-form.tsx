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
import { useUpdatePassword } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    old_password: z.string(),
    new_password: z.string().min(8),
    new_password_confirmation: z.string(),
  })
  .superRefine(({ new_password, new_password_confirmation }, ctx) => {
    if (new_password_confirmation !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["new_password_confirmation"],
      });
    }
  });

export type UpdatePassword = z.infer<typeof formSchema>;

const UpdatePasswordForm = () => {
  const { t } = useTranslation("common");

  const { updatePassword, isLoading } = useUpdatePassword();

  const form = useForm<UpdatePassword>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: UpdatePassword) => {
    updatePassword(data, {
      onSuccess() {
        toast.success(t("success"), {
          description: t("updated", { resource: t("password") }),
        });
      },
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-semibold">{t("update-password")}</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("old-password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("old-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the password you currently use to log in to your
                    account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("new-password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("new-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Create a new password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirm-new-password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("confirm-new-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Re-enter your new password to confirm it matches.
                  </FormDescription>
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
              {t("update-password")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
