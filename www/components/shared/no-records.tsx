import { PackageIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

const NoRecords = () => {
  const { t } = useTranslation("common");

  return (
    <div className={"flex flex-col items-center gap-3 py-20"}>
      <PackageIcon size={50} className="stroke-1 text-muted-foreground" />
      <span className="text-muted-foreground">{t("no-records")}</span>
    </div>
  );
};

export default NoRecords;
