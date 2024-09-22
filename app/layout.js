import { Lexend } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Vital +",
  description: "Tech Solutions for Providers, MCOs & Medicaid Programs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Toaster position="bottom-left" />
        {children}
      </body>
    </html>
  );
}
