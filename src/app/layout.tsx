import type { Metadata } from "next";
import { Poppins, Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/authprovider";
import Header from "@/components/layout/header";
import { SearchProvider } from "@/context/searchContext";
import Footer from "@/components/layout/footer";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Games Next ",
  description: "Descubra os melhores e mais novos jogos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${poppins.variable} ${manrope.variable}`}>
      <body className="bg-black">
        <AuthProvider>
          <SearchProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
