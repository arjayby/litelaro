import type { Metadata } from "next";

export const privatePageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  other: {
    "X-Robots-Tag": "noindex, nofollow",
  },
};