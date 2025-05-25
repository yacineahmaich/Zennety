import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { useUser } from "@/services";
import { LogInIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Logo from "./logo";
import ThemeSwitcher from "./theme-switcher";
import UserAvatar from "./user-avatar";

const Header = () => {
  const { user, isLoading } = useUser();
  const { t } = useTranslation("common");

  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b border-accent py-3 backdrop-blur">
      <div className="container flex items-center justify-between">
        <div>
          <Link href={route("home")} className="text-2xl font-bold">
            <Logo className="hidden sm:block" />
            <Logo variant="small" className="block h-10 w-10 sm:hidden" />
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
                    className="flex items-center gap-2"
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
                    className="flex items-center gap-2"
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
