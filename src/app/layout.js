import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import MyApps from "./context";

export const metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <MyApps>{children}</MyApps>
        </body>
      </html>
    </>
  );
}
