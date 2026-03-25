import { route } from "@/lib/routes";

export const ACTIVE_ORG_STORAGE_KEY = "zennety_active_organization_id";

export function readStoredActiveOrganizationId(): number | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(ACTIVE_ORG_STORAGE_KEY);
  const parsed = stored ? Number.parseInt(stored, 10) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

/** Persists the org id and reloads the app at `/app`. */
export function switchOrganization(id: number): void {
  window.localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, String(id));
  window.location.assign(route("app"));
}
