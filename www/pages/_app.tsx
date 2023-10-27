import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { appWithTranslation } from "next-i18next";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {getLayout(<Component {...pageProps} />)}
      </div>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
