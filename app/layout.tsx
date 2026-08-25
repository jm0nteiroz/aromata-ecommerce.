import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arômata — Essências que transformam momentos",
  description: "Velas, difusores e aromas para transformar ambientes em memórias.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "ARÔMATA — Essências que transformam momentos.",
    description: "Velas, difusores e aromas para transformar ambientes em memórias.",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "Arômata — Essências que transformam momentos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARÔMATA — Essências que transformam momentos.",
    description: "Velas, difusores e aromas para transformar ambientes em memórias.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
