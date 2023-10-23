import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import app from "@/lib/app";
import { useTranslation } from "next-i18next";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation("common");

  return (
    <div className="container">
      <header className="container fixed left-0 top-0 flex h-20 w-full items-center justify-between py-4">
        <div>
          <Link href="/" className="text-2xl font-bold">
            <img src={app.logoUrl} alt={app.name} className="h-10" />
          </Link>
        </div>

        <div className="space-x-2">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/auth/login">{t("login")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/sign-up">{t("signup")}</Link>
          </Button>
        </div>
      </header>
      <div className="min-h-screen pt-20">{children}</div>
    </div>
  );
};

export default GuestLayout;
