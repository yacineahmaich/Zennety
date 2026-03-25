import {
  CreateOrganizationModal,
  CreateOrganizationModalMode,
} from "@/components/organization/create-organization-modal";
import { useUser } from "@/services";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CreateOrganizationModalContextValue = {
  openCreateOrganizationModal: () => void;
};

const CreateOrganizationModalContext =
  createContext<CreateOrganizationModalContextValue | null>(null);

export function CreateOrganizationModalProvider({
  children,
}: PropsWithChildren) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<CreateOrganizationModalMode>("create");

  useEffect(() => {
    if (user?.needs_organization_onboarding) {
      setMode("onboarding");
      setOpen(true);
    }
  }, [user?.needs_organization_onboarding]);

  useEffect(() => {
    if (
      user &&
      user.needs_organization_onboarding === false &&
      mode === "onboarding"
    ) {
      setOpen(false);
    }
  }, [user?.needs_organization_onboarding, mode, user]);

  const openCreateOrganizationModal = useCallback(() => {
    setMode("create");
    setOpen(true);
  }, []);

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (
        !next &&
        mode === "onboarding" &&
        user?.needs_organization_onboarding
      ) {
        return;
      }
      setOpen(next);
    },
    [mode, user?.needs_organization_onboarding]
  );

  const value = useMemo(
    () => ({
      openCreateOrganizationModal,
    }),
    [openCreateOrganizationModal]
  );

  return (
    <CreateOrganizationModalContext.Provider value={value}>
      {children}
      <CreateOrganizationModal
        open={open}
        onOpenChange={onOpenChange}
        mode={mode}
      />
    </CreateOrganizationModalContext.Provider>
  );
}

export function useCreateOrganizationModal() {
  const ctx = useContext(CreateOrganizationModalContext);
  if (!ctx) {
    throw new Error(
      "useCreateOrganizationModal must be used within CreateOrganizationModalProvider"
    );
  }
  return ctx;
}
