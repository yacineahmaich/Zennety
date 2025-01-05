import { Layout } from "@/components/layouts";
import ErrorBoundary from "@/components/shared/error-boundary";
import { queryClient } from "@/lib/react-query";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

import { TooltipProvider } from "@/components/ui/tooltip";
import { DefaultSeo } from "next-seo";
import deafaultSeoConfig from "../next-seo.config";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // prevent creating new query client on re-renders
  const [_queryClient] = useState(queryClient);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ErrorBoundary>
      <DefaultSeo {...deafaultSeoConfig} />
      <NextTopLoader
        showSpinner={false}
        color="hsl(var(--primary))"
        shadow={false}
        speed={600}
      />
      <QueryClientProvider client={_queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(App);
