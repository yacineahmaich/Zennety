import { AlertTriangle, MessageCircleIcon, RefreshCcwIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const Error = ({ message }: { message?: string }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center rounded-lg p-5 text-center">
      <AlertTriangle size={30} className="mb-3 text-destructive" />
      <span className="max-w-sm text-xl font-bold">
        {message || t("something-went-wrong")}
      </span>
      <p className="mb-3 mt-1 max-w-sm text-sm font-medium text-muted-foreground">
        {"contact-us-for-problem"}
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          <RefreshCcwIcon size={20} className="mr-2" />
          {t("try-again")}
        </Button>

        <Button size="sm">
          <MessageCircleIcon size={20} className="mr-2" />
          {t("contact-us")}
        </Button>
      </div>
    </div>
  );
};

export default Error;
