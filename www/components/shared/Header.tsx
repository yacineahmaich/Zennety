import { route } from "@/lib/routes";
import { useQueryClient } from "@tanstack/react-query";
import { LogInIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Logo from "./Logo";
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
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <Button asChild variant="outline" size="sm">
              <Link href={route("app")}>
                <Avatar className="h-6 w-6 transition-all hover:shadow-xl">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{user.name}</span>
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex items-center gap-2 rounded-full"
              >
                <Link href={route("login")}>
                  <LogInIcon size={14} />
                  <span>{t("login")}</span>
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="default"
                className="flex items-center gap-2 rounded-full"
              >
                <Link href={route("register")}>
                  <UserRoundIcon size={14} />
                  <span>{t("register")}</span>
                </Link>
              </Button>
            </>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
