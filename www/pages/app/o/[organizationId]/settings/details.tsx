import { AppLayout } from "@/components/layouts";
import OrganizationInformationForm from "@/components/organization/organization-information-form";
import OrganizationSettingsShell from "@/components/organization/organization-settings-shell";
import Loader from "@/components/shared/loader";
import { useCan } from "@/hooks/use-can";
import { route } from "@/lib/routes";
import { IOrganization } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function OrganizationDetailsGate({
  organization,
}: {
  organization: IOrganization;
}) {
  const router = useRouter();
  const canUpdateOrganization = useCan(
    "update",
    "organization",
    organization.id
  );

  useEffect(() => {
    if (!canUpdateOrganization) {
      void router.replace(
        route("organization/settings/members", String(organization.id))
      );
    }
  }, [canUpdateOrganization, organization.id, router]);

  if (!canUpdateOrganization) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return <OrganizationInformationForm organization={organization} />;
}

const OrganizationSettingsDetailsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <OrganizationSettingsShell
      activeSection="details"
      pageTitle={t("organization-settings-nav-details")}
    >
      {(organization) => (
        <OrganizationDetailsGate organization={organization} />
      )}
    </OrganizationSettingsShell>
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

OrganizationSettingsDetailsPage.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationSettingsDetailsPage;
