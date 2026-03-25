import { AppLayout } from "@/components/layouts";
import { route } from "@/lib/routes";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

const OrganizationSettingsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { organizationId } = router.query as { organizationId: string };

  return (
    <>
      <div className="py-4">
        <h2 className="text-lg font-semibold">{t("organization-settings")}</h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          {t("organization-settings-placeholder")}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {t("organization-id-label")}: {organizationId}
        </p>
        <Link
          href={route("app")}
          className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("back-to-dashboard")}
        </Link>
      </div>
      <NextSeo title={t("organization-settings")} />
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

OrganizationSettingsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default OrganizationSettingsPage;
