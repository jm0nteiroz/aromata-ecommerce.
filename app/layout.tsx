import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arômata — Essências que transformam momentos",
  description: "Velas, difusores e aromas para transformar ambientes em memórias.",
  metadataBase: new URL("https://aromata-mvp.chatgptdoscrias.chatgpt.site"),
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
      <body>{children}</body>
    </html>
  );
}
