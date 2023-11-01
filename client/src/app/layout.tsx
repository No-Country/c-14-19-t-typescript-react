import { Metadata } from "next";
import "./globals.css";
import React from "react";
import { nunito } from "@/fonts/fonts";
import { GlobalContextProvider } from "@/context/store";

export const metadata: Metadata = {
  title: "EasyBank",
  description: "Home banking EasyBank for NoCountry",
  keywords: [
    "bank",
    "homebanking",
    "transferences",
    "money",
    "users",
    "easier",
    "intuitive",
  ],
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <html lang="es">
      <body className={`bg-[#e7e7d9] ${nunito.className}`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
