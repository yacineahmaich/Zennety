import CreateCard from "@/components/card/create-card";
import { Button } from "@/components/ui/button";
import { IBoard, IStatus } from "@/types/models";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { PropsWithChildren, useState } from "react";

type Props = {
  board: IBoard;
  status: IStatus;
};

const StatusColumnWrapper = ({
  board,
  status,
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col space-y-2 overflow-y-hidden rounded-lg bg-accent px-1 py-2 shadow-md">
      {((status?.cards || []).length > 0 || showForm) && (
        <div className="w-full flex-1 space-y-2 overflow-y-auto px-1 pb-2">
          {children}
          {showForm && (
            <div className="pt-1">
              <CreateCard
                board={board}
                status={status}
                onHide={() => setShowForm(false)}
              />
            </div>
          )}
        </div>
      )}
      {!showForm && (
        <Button
          size="sm"
          variant="ghost"
          className="w-full text-xs text-muted-foreground"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <PlusIcon size={16} className="mr-2" /> {t("add-new-card")}
        </Button>
      )}
    </div>
  );
};

export default StatusColumnWrapper;
