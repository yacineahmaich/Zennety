import { GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import type { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Signup: NextPageWithLayout = () => {
  return <div>SIGN UP</div>;
};

Signup.getLayout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
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

export default Signup;
