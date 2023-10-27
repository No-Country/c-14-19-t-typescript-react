import Footer from "@/components/Footer";
import NavbarHome from "@/components/NavbarHome";
import React from "react";
import Image from "next/image";

const About = (): React.ReactElement => {
  return (
    <div>
      <NavbarHome />
      <div className="w-full h-[100vh]">
        <div className="w-full h-full absolute mobile:text-3x1 tablet:text-5xl desktop:text-6xl text-4xl font-extrabold flex flex-col items-start justify-center eb-background">
          <h1 className="overflow-y-hidden p-4 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            ¿Quiénes somos?
          </h1>
        </div>
        <img
          src="./banner/about1.jpg"
          alt="home1"
          className="object-cover w-full h-full desktop:object-fill"
        />
      </div>

      <div className="w-full h-full mobile:text-2x1 tablet:text-4xl desktop:text-4xl text-2xl font-extrabold flex flex-col items-center justify-center p-10">
        <h2 className="overflow-y-hidden p-10 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Nuestra misión
        </h2>

        <span className="eb-principalColor overflow-y-hidden p-4 text-center">
          En Easybank, nuestra misión es brindar a nuestros clientes una
          experiencia de homebanking excepcional. Nos comprometemos a ofrecer un
          acceso sencillo y seguro a sus cuentas financieras, priorizando la
          confianza que depositan en nosotros.
        </span>

        <h2 className="overflow-y-hidden p-10 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Dedicación a la Facilidad de Acceso
        </h2>

        <span className="eb-principalColor overflow-y-hidden p-4 text-center">
          Sabemos que la comodidad y la facilidad de acceso son esenciales en la
          vida financiera de nuestros clientes. En Easybank, hemos diseñado
          nuestro sistema de homebanking con la simplicidad en mente. Nuestra
          plataforma es intuitiva y fácil de usar, lo que le permite gestionar
          sus finanzas desde cualquier lugar, en cualquier momento. Queremos que
          administrar su dinero sea una tarea sin complicaciones.
        </span>

        <h2 className="overflow-y-hidden p-10 text-[#306a46] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Construyendo Confianza
        </h2>

        <span className="eb-principalColor overflow-y-hidden p-4 text-center">
          La confianza es la base de todas nuestras relaciones con los clientes.
          En Easybank, trabajamos incansablemente para ganarnos su confianza y
          mantenerla. Nos esforzamos por ser transparentes en todas nuestras
          operaciones y ofrecer un servicio al cliente excepcional. Nos
          enorgullece la confianza que miles de clientes han depositado en
          nosotros a lo largo de los años. Nosotros no solo somos un banco en
          línea; somos su socio financiero de confianza. Estamos aquí para
          facilitar su vida financiera, proteger su dinero y construir una
          relación sólida basada en la confianza. ¡Gracias por elegir Easybank
          como su banco en línea de confianza!
        </span>
      </div>

      <Footer />
    </div>
  );
};

export default About;
