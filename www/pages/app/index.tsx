import { AppLayout } from "@/components/layouts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-lg font-extrabold tracking-tight">
          YOUR WORKSPACES
        </h2>

        <div>
          <h3 className="mb-4 font-semibold">Test</h3>

          <div className="grid grid-cols-5 gap-4">
            <Card className="group relative h-28 bg-[url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center">
              <span className="absolute inset-0 rounded-lg bg-black bg-opacity-20 group-hover:bg-opacity-30" />
              <CardHeader className="p-4">
                <CardTitle className="z-10 text-lg text-white">
                  Ecowatt eshop
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-extrabold tracking-tight">
          GUEST WORKSPACES
        </h2>

        <div>
          <h3 className="mb-4 font-semibold">Test</h3>

          <div className="grid grid-cols-5 gap-4">
            <Card className="group relative h-28 bg-[url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center">
              <span className="absolute inset-0 rounded-lg bg-black bg-opacity-20 group-hover:bg-opacity-30" />
              <CardHeader className="p-4">
                <CardTitle className="z-10 text-lg text-white">
                  Ecowatt eshop
                </CardTitle>
              </CardHeader>
            </Card>
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
