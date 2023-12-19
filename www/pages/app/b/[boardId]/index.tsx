import { AppLayout } from "@/components/layouts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBoard } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import {
  CalendarSearchIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  StarIcon,
  UserPlusIcon,
} from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const { boardId } = router.query as { boardId: string };
  const { board } = useBoard(boardId);

  if (!board) return;

  return (
    <div>
      <Header board={board} />
      <Kanban />
    </div>
  );
};

const Kanban = () => {
  return (
    <main className=" overflow-x-auto p-3">
      <div className="flex gap-4">
        <Card className="flex w-64 shrink-0 items-center justify-between bg-primary px-4 py-2 text-background">
          <h4 className="text-sm font-semibold">Pending</h4>
          <button>
            <MoreHorizontalIcon size={16} />
          </button>
        </Card>
        <Card className="flex w-64 shrink-0 items-center justify-between bg-primary px-4 py-2 text-background">
          <h4 className="text-sm font-semibold">In Progress</h4>
          <button>
            <MoreHorizontalIcon size={16} />
          </button>
        </Card>
        <Card className="flex w-64 shrink-0 items-center justify-between bg-primary px-4 py-2 text-background">
          <h4 className="text-sm font-semibold">Done</h4>
          <button>
            <MoreHorizontalIcon size={16} />
          </button>
        </Card>
        <Card className="flex w-64 shrink-0 items-center justify-between bg-primary px-4 py-2 text-background">
          <h4 className="text-sm font-semibold">Review</h4>
          <button>
            <MoreHorizontalIcon size={16} />
          </button>
        </Card>
        <Card className="flex w-64 shrink-0 items-center justify-between bg-primary px-4 py-2 text-background">
          <h4 className="text-sm font-semibold">Closed</h4>
          <button>
            <MoreHorizontalIcon size={16} />
          </button>
        </Card>
      </div>
    </main>
  );
};

const Header = ({ board }: { board: App.Models.Board }) => {
  const { t } = useTranslation("common");
  return (
    <header className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{board.name}</h2>
        <button className="border-r pr-2">
          <StarIcon size={16} />
        </button>
        <div className="flex select-none items-center -space-x-2">
          <Avatar className="h-6 w-6 transition-all hover:z-40 hover:scale-150 hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 transition-all hover:z-40 hover:scale-150 hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 transition-all hover:z-40 hover:scale-150 hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button>
            <ChevronsRightIcon
              size={14}
              className="translate-x-2 text-muted-foreground"
            />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button size="sm" className="flex items-center gap-2 text-xs">
            <UserPlusIcon size={16} /> Share
          </Button>
          <Button
            size="sm"
            variant="link"
            className="flex items-center gap-2 text-xs"
          >
            <SettingsIcon size={16} /> {t("settings")}
          </Button>
          <Button
            size="sm"
            variant="link"
            className="flex items-center gap-2 text-xs"
          >
            <CalendarSearchIcon size={16} /> {t("activity")}
          </Button>
        </div>
      </div>
    </header>
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
