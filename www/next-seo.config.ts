import { DefaultSeoProps } from "next-seo";
import app from "./lib/app";

const config: DefaultSeoProps = {
  defaultTitle: app.name,
  titleTemplate: `%s | ${app.name}`,
  description: app.description,
  openGraph: {
    title: app.name,
    description: app.description,
    type: "website",
    locale: "en_IE",
    url: "http://localhost:3000",
    siteName: app.name,
    images: [
      {
        url: "/assets/zennety.png",
        width: 800,
        height: 600,
        alt: app.name,
        type: "image/png",
      },
      {
        url: "/assets/zennety.png",
        width: 900,
        height: 800,
        alt: app.name,
        type: "image/png",
      },
      { url: "/assets/zennety.png" },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default config;
