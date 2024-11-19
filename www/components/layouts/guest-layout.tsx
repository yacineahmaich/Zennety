import ErrorBoundary from "@/components/shared/error-boundary";
import Header from "@/components/shared/header";
import { ReactNode } from "react";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
};

export default GuestLayout;
