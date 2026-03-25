import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateOrganizationModal } from "@/context/create-organization-modal-context";
import { switchOrganization } from "@/lib/active-organization";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/services/organization";
import { Check, ChevronDown, Plus, Settings } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";

const SidebarOrganizationSwitcher = () => {
  const { openCreateOrganizationModal } = useCreateOrganizationModal();
  const { t } = useTranslation("common");
  const router = useRouter();
  const { organizations, activeOrganizationId } = useOrganization();

  const sortedOrganizations = useMemo(() => {
    if (!organizations?.length) {
      return [];
    }
    const active = organizations.find((o) => o.id === activeOrganizationId);
    const rest = organizations.filter((o) => o.id !== activeOrganizationId);
    rest.sort((a, b) => a.name.localeCompare(b.name));
    if (active) {
      return [active, ...rest];
    }
    return [...organizations].sort((a, b) => a.name.localeCompare(b.name));
  }, [organizations, activeOrganizationId]);

  if (!organizations?.length) {
    return (
      <div className="min-w-0">
        <Button
          variant="outline"
          className="h-auto w-full justify-start gap-2 border-border py-2 pl-2 pr-2 font-normal"
          onClick={() => openCreateOrganizationModal()}
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span className="truncate">{t("create-organization")}</span>
        </Button>
      </div>
    );
  }

  const active = organizations.find((o) => o.id === activeOrganizationId);

  return (
    <div className="min-w-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "h-auto w-full justify-between border-border py-2 pl-2 pr-2 font-normal"
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2">
              {active && (
                <>
                  <Avatar className="h-6 w-6 shrink-0 rounded">
                    <AvatarImage src={active.avatar} alt={active.name} />
                    <AvatarFallback>{active.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-left">{active.name}</span>
                </>
              )}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[12rem]">
          <DropdownMenuGroup>
            {sortedOrganizations.map((org) => (
              <Fragment key={org.id}>
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => switchOrganization(org.id)}
                >
                  <Avatar className="h-6 w-6 rounded">
                    <AvatarImage src={org.avatar} alt={org.name} />
                    <AvatarFallback>{org.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate">{org.name}</span>
                  {org.id === activeOrganizationId && (
                    <Check className="h-4 w-4 shrink-0" />
                  )}
                </DropdownMenuItem>

                {org.id === activeOrganizationId && (
                  <>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      onClick={() =>
                        router.push(
                          route("organization/settings", String(org.id))
                        )
                      }
                    >
                      <Avatar className="invisible h-6 w-6 rounded"></Avatar>
                      <Settings className="h-4 w-4 shrink-0" />
                      {t("settings")}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                  </>
                )}
              </Fragment>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={() => openCreateOrganizationModal()}
            >
              <Plus className="h-4 w-4 shrink-0" />
              {t("create-organization")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarOrganizationSwitcher;
