import { MessageSquareWarningIcon } from "lucide-react";
import { TFunction, withTranslation } from "next-i18next";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  t: TFunction;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex w-fit flex-col items-center gap-2 pt-10">
          <MessageSquareWarningIcon />
          <h2 className="text-xl font-semibold">
            {this.props.t("something-went-wrong")}
          </h2>
          <Button size="sm" onClick={() => window.location.reload()}>
            {this.props.t("reload")}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation("common")(ErrorBoundary);
