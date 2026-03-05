import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "André Codato - Portfólio",
  description: "Projects, experiments and controlled chaos.",
  openGraph: {
    title: "André Codato - Portfólio",
    description: "Projects, experiments and controlled chaos.",
    url: "https://codato.dev",
    siteName: "André Codato - Portfólio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
