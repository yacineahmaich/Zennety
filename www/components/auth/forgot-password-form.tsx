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

const authLinkClass =
  "font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline";

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
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            {t("auth-no-account-prompt")}{" "}
            <Link href={route("register")} className={authLinkClass}>
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex items-stretch gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={t("your-email")}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="aspect-square self-stretch" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon size={20} className="animate-spin" />
          ) : (
            <SendIcon size="20" />
          )}
        </Button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
        <Link href={route("login")} className={authLinkClass}>
          {t("login")}
        </Link>
        <span className="text-muted-foreground/70" aria-hidden>
          {t("or")}
        </span>
        <Link href={route("register")} className={authLinkClass}>
          {t("register")}
        </Link>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
