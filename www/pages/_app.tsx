import { Layout } from "@/components/layouts";
import { queryClient } from "@/lib/react-query";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // prevent creating new query client on re-renders
  const [_queryClient] = useState(queryClient);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={_queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
