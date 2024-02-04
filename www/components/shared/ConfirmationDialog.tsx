import { useTranslation } from "next-i18next";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type ConfirmationDialogProps = {
  title?: string;
  desc: string;
  onConfirm: () => void | Promise<any>;
  confirmBtnText?: string;
  cancelBtnText?: string;
  disabled?: boolean;
  openTrigger: JSX.Element;
};

export const ConfirmationDialog = ({
  title,
  desc,
  confirmBtnText,
  cancelBtnText,
  onConfirm,
  disabled = false,
  openTrigger,
}: ConfirmationDialogProps) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{openTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || t("confirmation")}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={disabled}
          >
            {cancelBtnText || t("cancel")}
          </Button>
          <Button disabled={disabled} onClick={handleConfirm}>
            {confirmBtnText || t("confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
