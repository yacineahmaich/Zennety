import { AuthLayout, GuestLayout } from "@/components/layouts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { useSendResetPasswordEmail } from "@/services";
import { Loader2Icon, LogInIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword: NextPageWithLayout = () => {
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
      <div className="mt-4 flex justify-center">
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

  // if (sent) {
  //   return (
  //     <div className="text-sm p-3 bg-accent rounded whitespace-nowrap font-semibold w-fit">
  //       <p>We've sent a password reset link to your email address.</p>
  //     </div>
  //   );
  // }

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

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

ForgotPassword.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"forgot-password"}
        description={"forgot-password-message"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default ForgotPassword;
