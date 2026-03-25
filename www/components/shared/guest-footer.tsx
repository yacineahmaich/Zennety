import Logo from "@/components/shared/logo";
import app from "@/lib/app";
import { route } from "@/lib/routes";
import { Github } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const GuestFooter = () => {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-accent bg-muted/30 pb-10 pt-14 backdrop-blur">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-auto rounded-full border border-accent bg-background p-3 shadow-lg ring-4 ring-background">
          <Link href={route("home")} className="flex" aria-label={app.name}>
            <Logo variant="small" className="h-10 w-10" />
          </Link>
        </div>
      </div>

      <div className="container flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
        <a
          href={app.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline"
        >
          <Github className="h-4 w-4 shrink-0" aria-hidden />
          {t("footer-github")}
        </a>
        <p className="text-xs">
          {t("footer-copyright", { year, appName: app.name })}
        </p>
      </div>
    </footer>
  );
};

export default GuestFooter;
