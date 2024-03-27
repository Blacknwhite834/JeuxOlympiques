import React from "react";
import Image from "next/image";

export default function PresentationJO() {
  return (
    <div className="h-fit w-full mt-5 sm:mt-10" id="presentation">

        <img src="/anneaux4.png" alt="anneaux olympiques" className="w-fit hidden lg:block absolute -z-10" />
        <img src="/anneaux3.png" alt="anneaux olympiques" className="w-fit hidden lg:block absolute mt-96 -z-10" />
        <img src="/anneaux2.png" alt="anneaux olympiques" className="w-fit hidden lg:block absolute mt-96 right-0 -z-10" />
        <img src="/anneaux1.png" alt="anneaux olympiques" className="w-fit hidden lg:block absolute right-0 -z-10" />
        <div className="flex flex-col justify-center items-center w-full gap-5 px-5">
        <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center">Les Jeux Olympiques <br/> Paris 2024</h1>
        <Image src="/logoOlympique.png" alt="Paris 2024" width={100} height={100} />
        </div>

        <div className="w-full flex justify-center mt-5 sm:mt-10 px-5">
            <p className="text-center w-full lg:w-4/6 text-base sm:text-xl lg:text-2xl bg-zinc-100 rounded-[30px] sm:rounded-[50px] py-5 sm:py-10 px-5 sm:px-10 flex flex-col gap-5">
            <span>
            Paris 2024 promet d'être une édition spectaculaire des Jeux Olympiques, marquant la troisième fois que la capitale française accueille cet événement mondial après les éditions de 1900 et 1924. Sous le slogan "Venez partager", Paris 2024 vise à être une célébration de l'unité, de l'innovation et de la durabilité, reflétant les valeurs olympiques d'excellence, d'amitié et de respect.
            </span>
            <span>
            Avec l'intention de rendre les jeux accessibles à tous et de mettre en avant la beauté de la ville et de son héritage, Paris prévoit d'utiliser des sites emblématiques comme toile de fond pour les compétitions, y compris le Stade de France, le Grand Palais, et la Tour Eiffel. Paris 2024 se distingue également par son engagement envers l'environnement et la durabilité, visant à organiser les Jeux Olympiques les plus verts de l'histoire.
            </span>
            <span>
            Les Jeux de Paris 2024 seront un moment historique, non seulement pour le sport mais aussi pour le mouvement olympique, en incarnant un avenir plus inclusif et durable. Ils offriront au monde entier une vitrine de l'esprit humain et de l'unité à travers le sport, tout en célébrant la richesse culturelle et l'esprit indomptable de Paris et de la France.
            </span>            
            </p>
        </div>
    </div>
  );
}