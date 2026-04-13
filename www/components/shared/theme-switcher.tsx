import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

type Props = { className?: string; collapsed?: boolean };

export default function ThemeSwitcher({ className, collapsed }: Props) {
  const { setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-md border border-input",
        collapsed ? "h-auto !w-10 flex-col" : "h-9",
        className
      )}
      role="group"
      aria-label="Theme"
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-9 shrink-0 rounded-none bg-accent px-2.5 text-accent-foreground dark:bg-transparent dark:text-muted-foreground",
          collapsed ? "w-full" : "flex-1"
        )}
        onClick={() => setTheme("light")}
        aria-label={t("light")}
      >
        <SunIcon size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-9 shrink-0 rounded-none px-2.5 text-muted-foreground dark:bg-accent dark:text-accent-foreground",
          collapsed ? "w-full" : "flex-1"
        )}
        onClick={() => setTheme("dark")}
        aria-label={t("dark")}
      >
        <MoonIcon size={16} />
      </Button>
    </div>
  );
}
