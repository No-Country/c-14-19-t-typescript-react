"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = (): React.ReactElement => {
  return (
    <footer className="bg-[#0F2618] shadow overflow-y-hidden">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between desktop:flex desktop:items-center desktop:justify-between">
          <Link href="/">
            <Image
              src="/logo/easy2wb.png"
              height={100}
              width={100}
              alt="logo-easy"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                Quienes somos
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 desktop:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            EasyBank
          </a>
          . Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
