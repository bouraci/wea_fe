import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ReactNode} from "react";
import clsx from "clsx";
import config from "@/tailwind.config";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import {Sidebar} from "@components/page";

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
      <body className={clsx(inter.className, "flex min-h-screen")}>
        <Toaster position="top-right" />
        <Sidebar />
        <main className="flex flex-col flex-1 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
