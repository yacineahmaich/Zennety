import { fontSans } from "@/components/layouts/Layout";
import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className={cn("font-sans", fontSans.variable)}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
