import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "André Codato - Portfólio",
  description: "Projects, experiments and controlled chaos.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "André Codato - Portfólio",
    description: "Projects, experiments and controlled chaos.",
    images: "/favicon.svg",
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
        className={`${jetBrainsMono.variable} ${inter.variable} antialiased min-h-screen`}
      >
        <NavBar />
        <div className="flex flex-col items-center min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
