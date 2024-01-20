import app from "@/lib/app";
import { route } from "@/lib/routes";
import { useQueryClient } from "@tanstack/react-query";
import { ZapIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitcher } from "../shared/ThemeSwitcher";
import { buttonVariants } from "../ui/button";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<App.Models.User>(["user"]);
  const { t } = useTranslation("common");

  return (
    <div className="container">
      <header className="container fixed left-0 top-0 flex h-20 w-full items-center justify-between py-4 backdrop-blur">
        <div>
          <Link href={route("home")} className="text-2xl font-bold">
            <img src={app.logoUrl} alt={app.name} className="h-10" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <Link
              href={route("app")}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <ZapIcon size={20} className="mr-2" />
              {t("back-to-zennety")}
            </Link>
          ) : (
            <>
              <Link
                href={route("login")}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t("login")}
              </Link>
              <Link
                href={route("register")}
                className={buttonVariants({ size: "sm" })}
              >
                {t("register")}
              </Link>
            </>
          )}
          <ThemeSwitcher />
        </div>
      </header>
      <div className="min-h-screen pt-20">{children}</div>
    </div>
  );
};

export default GuestLayout;
