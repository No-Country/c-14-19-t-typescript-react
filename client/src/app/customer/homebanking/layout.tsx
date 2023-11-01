import Footer from "@/components/Footer";
import LogoutButton from "@/components/buttons/LogoutButton";
import MyAccountButton from "@/components/buttons/MyAccountButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "EasyBank - Homebanking",
  description:
    "Homebanking intuitivo tanto para mayores de edad como para personas con discapacidad.",
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

const HomebankingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="flex items-center justify-between border w-full px-2">
        {
          <Link
            href="/customer/homebanking"
            className="p-2 text-xl uppercase font-bold tablet:p-3 tablet:text-2xl"
          >
            <Image
              src="/logo/easy2.png"
              width={120}
              height={100}
              alt="logo-easy"
            />
          </Link>
        }
        <div className="flex gap-3 font-medium tablet:text-xl">
          <ul className="flex gap-5">
            <MyAccountButton />

            <LogoutButton />
          </ul>
        </div>
      </nav>
      {children}

      <Footer />
    </>
  );
};

export default HomebankingLayout;
