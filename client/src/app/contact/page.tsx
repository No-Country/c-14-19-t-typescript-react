"use client";
import Footer from "@/components/Footer";
import NavbarHome from "@/components/NavbarHome";
import React from "react";

const Contact = (): React.ReactElement => {
  return (
    <div>
      <NavbarHome />
      <div className="w-full h-[100vh]">
        <div className="w-full h-full absolute mobile:text-3x1 tablet:text-5xl desktop:text-6xl text-4xl font-extrabold flex flex-col items-start justify-center eb-background">
          <h1 className="overflow-y-hidden p-4 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            ¿Tenes alguna duda?
          </h1>
          <h2 className="eb-principalColor overflow-y-hidden p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Estamos para ayudarte
          </h2>
        </div>
        <img
          src="./banner/contact1.jpg"
          alt="home1"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full h-full mobile:text-2x1 tablet:text-4xl desktop:text-4xl text-2xl font-extrabold flex flex-col items-center justify-center p-10">
        <h1 className="overflow-y-hidden p-10 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Envianos un mail a nuestra casilla de correo
        </h1>

        <h2 className="eb-principalColor overflow-y-hidden p-4">
          easybank@gmail.com
        </h2>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
