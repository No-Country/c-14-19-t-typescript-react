import { Metadata } from "next";
import NavbarHome from "@/components/NavbarHome";
import React from "react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EasyBank - Home",
};

const App = (): React.ReactElement => {
  return (
    <div>
      <NavbarHome />

      <div className="w-full h-[100vh]">
        <div className="w-full h-full absolute mobile:text-3x1 tablet:text-5xl desktop:text-6xl text-4xl font-extrabold flex flex-col items-start justify-center eb-background">
          <h1 className="overflow-y-hidden p-4 text-[#306a46]">
            Tu Homebanking
          </h1>
          <h2 className="eb-principalColor overflow-y-hidden p-4">
            Cuidamos lo importante
          </h2>
        </div>
        <img
          src="./banner/home1.jpg"
          alt="home1"
          className="object-cover w-full h-full"
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
