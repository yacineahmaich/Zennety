import { ReactNode } from "react";
import ErrorBoundary from "../shared/ErrorBoundary";
import Header from "../shared/Header";

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
