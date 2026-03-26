import { AppLayout } from "@/components/layouts";
import OrganizationSettingsShell from "@/components/organization/organization-settings-shell";
import Invitations from "@/components/shared/invitations";
import InviteMembers from "@/components/shared/invite-members";
import Members from "@/components/shared/members";
import { Button } from "@/components/ui/button";
import { useCan } from "@/hooks/use-can";
import { IOrganization } from "@/types/models";
import { NextPageWithLayout } from "@/types/next";
import { UserPlusIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function OrganizationMembersContent({
  organization,
}: {
  organization: IOrganization;
}) {
  const { t } = useTranslation("common");
  const canUpdateOrganization = useCan(
    "update",
    "organization",
    organization.id
  );

  return (
    <div className="space-y-2">
      {canUpdateOrganization && (
        <div className="flex justify-end">
          <InviteMembers
            resourceType="organization"
            resourceId={organization.id}
            title={t("invite-to-organization-title")}
            subtitle={t("invite-to-organization-subtitle")}
            openTrigger={
              <Button size="sm" variant="secondary">
                <UserPlusIcon size={20} />
                <span className="ml-2 hidden md:inline">
                  {t("invite-organization-members")}
                </span>
              </Button>
            }
          />
        </div>
      )}
      <Members resourceType="organization" resourceId={organization.id} />
      {canUpdateOrganization && (
        <Invitations resourceType="organization" resourceId={organization.id} />
      )}
    </div>
  );
}

const OrganizationSettingsMembersPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <OrganizationSettingsShell
      activeSection="members"
      pageTitle={t("organization-settings-nav-members")}
    >
      {(organization) => (
        <OrganizationMembersContent organization={organization} />
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

OrganizationSettingsMembersPage.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationSettingsMembersPage;
