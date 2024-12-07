import { AuthLayout, GuestLayout } from "@/components/layouts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useResetPassword } from "@/services";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { z } from "zod";

const formSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["password_confirmation"],
      });
    }
  });

export type ResetPassword = z.infer<typeof formSchema>;

const ResetPassword: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { resetPassword, isLoading } = useResetPassword();

  const { token, email } = router.query as { token: string; email: string };

  const form = useForm<ResetPassword>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token,
      email,
    },
  });

  function onSubmit(data: ResetPassword) {
    resetPassword(data, {
      onError() {
        form.reset({
          password: "",
          password_confirmation: "",
        });
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("your-password")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("your-confirmation-password")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="sm"
            disabled={isLoading}
            className="flex w-full items-center gap-2"
          >
            {t("reset-password")}
          </Button>
        </form>
      </Form>

      {/* ======= SEO START ======= */}
      <NextSeo title={t("reset-password")} />
      {/* ======= END START ======= */}
    </>
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

ResetPassword.getLayout = (page) => {
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

export default ResetPassword;
