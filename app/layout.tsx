import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import {
  instrumentSans,
  instrumentSerif,
  instrumentSerifItalic,
} from "../fonts/fonts";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Litelaro: Gamified Literature Learning for Teachers and Students",
  description:
    "Discover Litelaro: Educational games and interactive tools to make literature fun for students and teachers. Perfect for the classroom!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} ${instrumentSerifItalic} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
