"use client"

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useCart } from "../CartContext";

export default function Billetterie() {
    const { addToCart } = useCart();
    const [offres, setOffres] = useState([]);

    useEffect(() => {
        fetch('/api/offres')
            .then(response => response.json())
            .then(data => {
                // Attribuer une couleur unique à chaque offre lors de leur chargement
                const colors = ['sky-600', 'amber-400', 'rose-600', 'green-600'];
                const offresAvecCouleur = data.map(offre => ({
                    ...offre,
                    colorClass: colors[Math.floor(Math.random() * colors.length)]
                }));
                setOffres(offresAvecCouleur);
            })
            .catch(error => console.error("Erreur lors de la récupération des offres:", error));
    }, []);

    const handleAddToCart = (offre) => {
        addToCart(offre);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Découvrez nos offres</h1>
            <main className="flex-grow w-full flex justify-center items-center">
                <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-5 sm:gap-16 mt-5 sm:mt-16 px-10 h-full">
                    {offres.map(offre => (
                        <div key={offre.id} className={`flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 py-5 sm:py-10 px-5 shadow-xl border-${offre.colorClass}`}>
                            <h1 className="text-2xl sm:text-4xl text-black font-bold text-center">{offre.title}</h1>
                            <p className="text-black text-center text-base sm:text-2xl">{offre.description}</p>
                            <button className={`text-white rounded-full px-5 py-3 text-base sm:text-xl font-bold bg-${offre.colorClass}`} onClick={() => handleAddToCart(offre)}>
                                <span className="font-normal" >Prix pour {offre.nombre} billets:</span> {offre.prix}€
                                </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
