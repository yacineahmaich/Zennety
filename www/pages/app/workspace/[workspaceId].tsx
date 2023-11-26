import { AppLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { KanbanSquareIcon, UserPlusIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Workspace: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspaceId } = router.query as { workspaceId: string };
  const { workspace, isLoading } = useWorkspace(+workspaceId);

  return (
    <div>
      <div className="flex w-full items-center justify-between border-b p-8">
        <div className="flex items-center gap-2 ">
          <img
            src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
            alt="logo"
            className="h-20 w-20 rounded-xl border shadow-xl"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold">{workspace?.name}</h2>
            <div className="space-x-2 text-xs font-medium">
              <span>Premium</span>
              <span>Private</span>
            </div>
          </div>
        </div>
        <Button size="sm" variant="secondary">
          <UserPlusIcon size={20} className="mr-2" />
          Invite workspace members
        </Button>
      </div>
      <div className="p-8">
        <span className="mb-4 flex items-center">
          <KanbanSquareIcon size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">Boards</h2>
        </span>
      </div>
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

Workspace.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Workspace;
