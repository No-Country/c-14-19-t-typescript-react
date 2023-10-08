import { Metadata } from "next";
import "./globals.css";
import React from "react";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
