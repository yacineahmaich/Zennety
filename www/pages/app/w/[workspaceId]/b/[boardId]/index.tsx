import CreateStatus from "@/components/Status/CreateStatus";
import StatusHeader from "@/components/Status/StatusHeader";
import BoardBanner from "@/components/board/BoardBanner";
import { AppLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { board } = useBoard(workspaceId, boardId);

  console.log(workspaceId, boardId);

  if (!board) return;

  return (
    <div>
      <BoardBanner board={board} />
      <main className=" overflow-x-auto p-3">
        <div className="flex items-start gap-4">
          {board.statuses?.map((status) => (
            <div key={status.id} className="space-y-2">
              <StatusHeader status={status} />
              <CreateCard status={status} />
            </div>
          ))}
          <CreateStatus board={board} />
        </div>
      </main>
    </div>
  );
};

const formSchema = z.object({
  name: z.string(),
  statusId: z.number(),
});

export type CreateCard = z.infer<typeof formSchema>;

const CreateCard = ({ status }: { status: App.Models.Status }) => {
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);

  const form = useForm<CreateCard>({
    defaultValues: {
      statusId: status.id,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: CreateCard) => {
    console.log(values);
  };

  if (!showForm) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="w-full text-xs text-muted-foreground"
        onClick={() => setShowForm(true)}
      >
        <PlusIcon size={16} className="mr-2" /> {t("add-new-card")}
      </Button>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={t("card-name-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-1">
            <Button size="icon" className="h-7 w-full text-xs">
              <CheckIcon size={16} className="mr-1" /> {t("save")}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-7 w-full text-xs"
              onClick={() => {
                setShowForm(false);
                form.unregister();
              }}
            >
              <XIcon size={16} className="mr-1" /> {t("cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

Board.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Board;
