import LogoutButton from "@/components/buttons/LogoutButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: 'EasyBank - Homebanking',
    description: 'Homebanking intuitivo tanto para mayores de edad como para personas con discapacidad.',
    keywords: [
        "bank",
        "homebanking",
        "transferences",
        "money",
        "users",
        "easier",
        "intuitive",
      ],
}

const HomebankingLayout = ({children}: { children: React.ReactNode }) => {
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
      <LogoutButton />
    </nav>
    {children}
    </>
  );
};

export default HomebankingLayout;
