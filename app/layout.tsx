import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ReactNode} from "react";
import clsx from "clsx";
import config from "@/tailwind.config";
import "./globals.css";
import {Toaster} from "react-hot-toast";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEA - Bouráci",
  description: "WEA course project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "flex min-h-screen flex-col")}>
        <Toaster position="top-right" />
        <main className="flex flex-col flex-1 px-4 pb-4 container justify-center max-w-screen-xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
