import { route } from "@/lib/routes";
import { useUser } from "@/services";
import { LogInIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { user, isLoading } = useUser();
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
          {!isLoading && (
            <>
              {user ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={route("app")}>
                    <UserAvatar
                      user={user}
                      showCard={false}
                      className="h-6 w-6"
                    />
                    <span className="ml-2 border-l pl-2">{user.name}</span>
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
            </>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
