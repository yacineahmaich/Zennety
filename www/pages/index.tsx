import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import LandingFaq from "@/components/landing/landing-faq";
import { GuestLayout } from "@/components/layouts";
import app from "@/lib/app";
import { NextPageWithLayout } from "@/types/next";
import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={app.description}
        description={t("landing-seo-description")}
        openGraph={{
          title: app.name,
          description: t("landing-seo-description"),
          type: "website",
        }}
      />

      <div className="mx-auto max-w-7xl space-y-12 md:space-y-24">
        <Hero />
        <Features />
        <HowItWorks />
        <LandingFaq />
        {/* <LandingCta /> */}
      </div>
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
