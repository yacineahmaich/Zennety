import { AppLayout } from "@/components/layouts";
import DeleteOrganization from "@/components/organization/delete-organization";
import OrganizationOwnershipTransfer from "@/components/organization/organization-ownership-transfer";
import OrganizationSettingsShell from "@/components/organization/organization-settings-shell";
import Loader from "@/components/shared/loader";
import { useCan } from "@/hooks/use-can";
import { useHasRole } from "@/hooks/use-has-role";
import { route } from "@/lib/routes";
import { Role } from "@/types/enums";
import { IOrganization } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function OrganizationAdminGate({
  organization,
}: {
  organization: IOrganization;
}) {
  const router = useRouter();
  const canDeleteOrganization = useCan(
    "delete",
    "organization",
    organization.id
  );
  const isOwner = useHasRole(Role.OWNER, "organization", organization.id);
  const allowed = isOwner || canDeleteOrganization;

  useEffect(() => {
    if (!allowed) {
      void router.replace(
        route("organization/settings/members", String(organization.id))
      );
    }
  }, [allowed, organization.id, router]);

  if (!allowed) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isOwner && <OrganizationOwnershipTransfer organization={organization} />}
      {canDeleteOrganization && (
        <DeleteOrganization organization={organization} />
      )}
    </div>
  );
}

const OrganizationSettingsAdminPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <OrganizationSettingsShell
      activeSection="admin"
      pageTitle={t("organization-settings-nav-admin")}
    >
      {(organization) => <OrganizationAdminGate organization={organization} />}
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

OrganizationSettingsAdminPage.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationSettingsAdminPage;
