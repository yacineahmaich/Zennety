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
import { Loader2Icon, LoaderIcon, SendIcon } from "lucide-react";
import { z } from "zod";
import { useSendResetPasswordEmail } from "@/services";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword: NextPageWithLayout = () => {
  const { sendResetPasswordEmail, isLoading } = useSendResetPasswordEmail();
  const { t } = useTranslation("common");

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit({ email }: z.infer<typeof formSchema>) {
    sendResetPasswordEmail({ email });
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
        heading={"reset-password"}
        description={"reset-password-message"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default ForgotPassword;
