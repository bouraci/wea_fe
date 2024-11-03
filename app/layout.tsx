import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ReactNode} from "react";
import clsx from "clsx";
import config from "@/tailwind.config";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import {Sidebar} from "@components/page";
import {FilterProvider} from "@contexts/FilterContext";
import {UserProvider} from "@contexts/UserContext";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";

config.autoAddCss = false;

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "WEA - Bouráci",
    description: "WEA course project",
};

export default async function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} className="h-full w-full">
            <body className={clsx(inter.className, "flex h-full w-full overflow-hidden")}>
            <NextIntlClientProvider messages={messages}>
                <UserProvider>
                    <FilterProvider>
                        <Toaster position="top-right"/>
                        <Sidebar/>
                        <main className="flex flex-col flex-1 p-4 overflow-auto h-full">
                            {children}
                        </main>
                    </FilterProvider>
                </UserProvider>
            </NextIntlClientProvider>
            </body>
        </html>
    );
}
