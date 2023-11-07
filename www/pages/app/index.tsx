import { AppLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types/next';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Dashboard.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
