import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className="h-full bg-background antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
