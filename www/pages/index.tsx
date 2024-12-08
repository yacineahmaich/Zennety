import Hero from "@/components/landing/hero";
import { GuestLayout } from "@/components/layouts";
import app from "@/lib/app";
import { NextPageWithLayout } from "@/types/next";
import type { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />

      {/* ======= SEO START ======= */}
      <NextSeo title={app.description} />
      {/* ======= END START ======= */}
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
