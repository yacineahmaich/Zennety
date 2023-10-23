import { AuthLayout, GuestLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NextPageWithLayout } from "@/types/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('your-email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('your-password')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">{t("login")}</Button>
        </form>
      </Form>
    </div>
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

Login.getLayout = (page) => {
  const { t } = useTranslation();

  return (
    <GuestLayout>
      <AuthLayout
        heading={t("welcome-back")}
        description={t("login-to-your-account")}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default Login;
