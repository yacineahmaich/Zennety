import app from "@/lib/app";
import { useUser } from "@/services";
import { ZapIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitcher } from "../shared/ThemeSwitcher";
import { Button } from "../ui/button";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { t } = useTranslation("common");

  return (
    <div className="container">
      <header className="container fixed left-0 top-0 flex h-20 w-full items-center justify-between py-4 backdrop-blur">
        <div>
          <Link href="/" className="text-2xl font-bold">
            <img src={app.logoUrl} alt={app.name} className="h-10" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <Button size="sm" variant="outline" asChild>
              <Link href="/app">
                <ZapIcon size={20} className="mr-2" />
                {t("back-to-zennety")}
              </Link>
            </Button>
          ) : (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/auth/login">{t("login")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">{t("register")}</Link>
              </Button>
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
