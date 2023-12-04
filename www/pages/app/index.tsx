import BoardCard from "@/components/board/BoardCard";
import { AppLayout } from "@/components/layouts";
import { useMyWorkspaces } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Dashboard: NextPageWithLayout = () => {
  const { workspaces } = useMyWorkspaces();

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-tight text-muted-foreground">
          YOUR WORKSPACES
        </h2>

        <div>
          <h3 className="mb-4 font-medium">Ecowatt</h3>

          <div className="grid grid-cols-4 gap-4">
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-tight text-muted-foreground">
          GUEST WORKSPACES
        </h2>

        <div>
          <h3 className="mb-4 font-semibold">Test</h3>

          <div className="grid grid-cols-4 gap-4">
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
          </div>
        </div>
      </section>
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

Dashboard.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
