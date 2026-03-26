import OrganizationBanner from "@/components/organization/organization-banner";
import type { OrganizationSettingsSection } from "@/components/organization/organization-settings-sections";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { useOrganizationById } from "@/services/organization";
import { IOrganization } from "@/types/models";
import { SettingsIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  activeSection: OrganizationSettingsSection;
  pageTitle: string;
  children: (organization: IOrganization) => ReactNode;
};

const OrganizationSettingsShell = ({
  activeSection,
  pageTitle,
  children,
}: Props) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const organizationIdParam = router.query.organizationId;
  const organizationId =
    router.isReady &&
    typeof organizationIdParam === "string" &&
    organizationIdParam.length > 0
      ? Number(organizationIdParam)
      : null;

  const resolvedId =
    organizationId != null && !Number.isNaN(organizationId)
      ? organizationId
      : null;

  const { organization, isLoading, isError } = useOrganizationById(resolvedId);

  if (!router.isReady || resolvedId == null) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          {t("something-went-wrong")}
        </p>
        <Button variant="link" className="mt-4 h-auto p-0" asChild>
          <Link href={route("app")}>{t("back-to-dashboard")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        <OrganizationBanner
          organization={organization}
          settingsActiveSection={activeSection}
        />
        <div className="py-4">
          <span className="mb-4 flex items-center">
            <SettingsIcon size={20} className="mr-2" />
            <h2 className="text-lg font-semibold">{pageTitle}</h2>
          </span>
          <div className="pl-4">{children(organization)}</div>
        </div>
      </div>
      <NextSeo
        title={`${organization.name} — ${pageTitle}`}
        description={organization.description ?? organization.name}
      />
    </>
  );
};

export default OrganizationSettingsShell;
