import app from "@/lib/app";
import { route } from "@/lib/routes";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<App.Models.User>(["user"]);
  const { t } = useTranslation("common");

  return (
    <header className=" w-full border-b border-accent py-3 backdrop-blur">
      <div className="container flex items-center justify-between">
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
              <Avatar className="h-6 w-6 transition-all hover:shadow-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <span className="ml-2">{user.name}</span>
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
      </div>
    </header>
  );
};

export default Header;
