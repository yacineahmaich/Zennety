import { Layout } from "@/components/layouts";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { queryClient } from "@/lib/react-query";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // prevent creating new query client on re-renders
  const [_queryClient] = useState(queryClient);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ErrorBoundary>
      <NextTopLoader
        showSpinner={false}
        color="#000"
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
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ThemeProvider>
        <Toaster />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(App);
