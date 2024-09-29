import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./header";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Jamie Bower Dev",
    description: "Personal website of Jamie Bower, Software Engineer.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1250px] mx-auto`}
            >
                <Header />
                <div className="p-8 pt-12 sm:pt-8">{children}</div>
            </body>
        </html>
    );
}
