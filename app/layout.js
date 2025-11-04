import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/fragments/Providers";
import NavBar from "@/components/fragments/NavBar";
import OnDocumentReady from "@/components/fragments/OnDocumentReady";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Factor Kubata",
  description: "Facctor Kubata oficial website",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-200 dark:bg-stone-800`}>
        <OnDocumentReady />
        <ToastContainer />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
