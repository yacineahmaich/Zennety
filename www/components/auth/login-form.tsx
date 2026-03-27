import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { route } from "@/lib/routes";
import { useLogin } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export type UserLogin = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { login, isLoading } = useLogin();

  const { email } = router.query as { email: string };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:
        email ??
        process.env.NEXT_PUBLIC_DEMO_LOGIN_EMAIL ??
        "yacine@zennety.app",
      password: process.env.NEXT_PUBLIC_DEMO_LOGIN_PASSWORD ?? "Demo123@",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
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
        <div className="flex items-center justify-between">
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
          <Link
            href={route("forgot-password")}
            className="block text-sm text-secondary-foreground hover:underline"
          >
            {t("forgot-password")}
          </Link>
        </div>
        <Button className="w-full" disabled={isLoading}>
          {t("login")}
        </Button>
        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            {t("auth-no-account-prompt")}{" "}
            <Link
              href={route("register")}
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline"
            >
              {t("register")}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
