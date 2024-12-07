import { AuthLayout, GuestLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { route } from "@/lib/routes";
import { useLogin } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export type UserLogin = z.infer<typeof formSchema>;

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { login, isLoading } = useLogin();

  const { email } = router.query as { email: string };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
    <>
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
                      placeholder={t("your-email")}
                      autoComplete="username"
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
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex items-center space-x-2">
                    <FormLabel htmlFor={field.name}>
                      <Checkbox
                        id={field.name}
                        className="my-2 mr-2"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      {t("remember-me")}
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isLoading}>
              {t("login")}
            </Button>
            <Link
              href={route("forgot-password")}
              className="mt-4 block text-sm text-secondary-foreground hover:underline"
            >
              {t("forgot-password")}
            </Link>
          </form>
        </Form>
      </div>

      {/* ======= SEO START ======= */}
      <NextSeo title={t("login-to-your-account")} />
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

Login.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"welcome-back"}
        description={"login-to-your-account"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default Login;
