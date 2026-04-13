import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

type Props = { className?: string };

export default function ThemeSwitcher({ className }: Props) {
  const { setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <div
      className={cn("inline-flex rounded-md border border-input", className)}
      role="group"
      aria-label="Theme"
    >
      <Button
        variant="ghost"
        size="icon"
        className="flex-1 bg-accent text-accent-foreground dark:bg-transparent dark:text-muted-foreground"
        onClick={() => setTheme("light")}
        aria-label={t("light")}
      >
        <SunIcon size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="flex-1 text-muted-foreground dark:bg-accent dark:text-accent-foreground"
        onClick={() => setTheme("dark")}
        aria-label={t("dark")}
      >
        <MoonIcon size={16} />
      </Button>
    </div>
  );
}
