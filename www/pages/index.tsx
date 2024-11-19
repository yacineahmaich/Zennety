import Hero from "@/components/landing/hero";
import { GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import type { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
    </>
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

Home.getLayout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Home;
