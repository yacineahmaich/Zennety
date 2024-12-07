import { route } from "@/lib/routes";
import { useSendResetPasswordEmail } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LogInIcon, SendIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPasswordForm = () => {
  const { sendResetPasswordEmail, isLoading } = useSendResetPasswordEmail();
  const { t } = useTranslation("common");

  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit({ email }: z.infer<typeof formSchema>) {
    sendResetPasswordEmail(
      { email },
      {
        onSuccess() {
          setSent(true);
          toast.success(t("success"), {
            description: t("reset-password-email-sent", { email }),
          });
        },
      }
    );
  }

  if (sent) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <Button
          size="sm"
          variant="secondary"
          asChild
          className="flex items-center gap-2"
        >
          <Link href={route("login")}>
            <LogInIcon size={18} />
            <span>{t("back-to-login")}</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("your-email")}
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="icon" className="self-start" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon size={20} className="animate-spin" />
          ) : (
            <SendIcon size="20" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
