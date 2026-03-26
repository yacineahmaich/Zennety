import type { OrganizationSettingsSection } from "@/components/organization/organization-settings-sections";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useCan } from "@/hooks/use-can";
import { useHasRole } from "@/hooks/use-has-role";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Role } from "@/types/enums";
import { IOrganization } from "@/types/models";
import { ShieldAlertIcon, UserRoundIcon, WrenchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
  organization: IOrganization;
  /** Sub-page navigation (organization settings area only). */
  settingsActiveSection?: OrganizationSettingsSection | null;
};

const OrganizationBanner = ({
  organization,
  settingsActiveSection = null,
}: Props) => {
  const { t } = useTranslation("common");
  const canUpdateOrganization = useCan(
    "update",
    "organization",
    organization.id
  );
  const canDeleteOrganization = useCan(
    "delete",
    "organization",
    organization.id
  );
  const isOwner = useHasRole(Role.OWNER, "organization", organization.id);

  const showAdminNav = isOwner || canDeleteOrganization;
  const orgId = String(organization.id);

  const navClass = (section: OrganizationSettingsSection) =>
    cn(
      buttonVariants({ size: "sm", variant: "ghost" }),
      "justify-start gap-2",
      settingsActiveSection === section &&
        "bg-accent text-accent-foreground hover:bg-accent/90"
    );

  return (
    <div className="-mx-4 border-b p-4">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="h-20 w-20 shrink-0">
          <AvatarImage src={organization.avatar} alt={organization.name} />
          <AvatarFallback>{organization.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <h2 className="font-semibold">{organization.name}</h2>
        </div>
      </div>
      {organization.description && (
        <p className="mt-2 max-w-2xl break-all text-sm text-muted-foreground">
          {organization.description}
        </p>
      )}
      {settingsActiveSection != null && (
        <nav
          className="mt-4 flex flex-wrap gap-1 border-t border-border pt-4"
          aria-label={t("organization-settings")}
        >
          {canUpdateOrganization && (
            <Link
              href={route("organization/settings/details", orgId)}
              className={navClass("details")}
            >
              <WrenchIcon size={16} className="shrink-0 opacity-70" />
              {t("organization-settings-nav-details")}
            </Link>
          )}
          <Link
            href={route("organization/settings/members", orgId)}
            className={navClass("members")}
          >
            <UserRoundIcon size={16} className="shrink-0 opacity-70" />
            {t("organization-settings-nav-members")}
          </Link>
          {showAdminNav && (
            <Link
              href={route("organization/settings/admin", orgId)}
              className={navClass("admin")}
            >
              <ShieldAlertIcon size={16} className="shrink-0 opacity-70" />
              {t("organization-settings-nav-admin")}
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default OrganizationBanner;
