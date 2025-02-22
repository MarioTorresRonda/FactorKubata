import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/fragments/Providers";
import NavBar from "@/components/fragments/NavBar";
import OnDocumentReady from "@/components/fragments/OnDocumentReady";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Factor Kubata",
  description: "Facctor Kubata oficial website",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200 dark:bg-stone-800`}>
        <OnDocumentReady />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
