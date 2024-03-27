"use client"

import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useCart } from "../CartContext";
import { useRouter } from "next/navigation";

export default function Billetterie() {
    const { addToCart } = useCart();
    const [offres, setOffres] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/offres')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.prix - b.prix);
                setOffres(sortedData);
            })
            .catch(error => console.error("Erreur lors de la récupération des offres:", error));
    }, []);

    const colorRandom = () => {
        const colors = ['border-sky-600', 'border-amber-400', 'border-rose-600', 'border-green-600'];
        return colors[Math.floor(Math.random() * colors.length)];
      }

    const handleAddToCart = (offre) => {
        addToCart(offre);
        router.push('/panier');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Découvrez nos offres</h1>
            <main className="flex-grow w-full flex justify-center items-center">
                <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-5 sm:gap-16 mt-5 sm:mt-16 px-10 h-full">
                    {offres.map(offre => (
                        <div key={offre.id} className={`flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 py-5 sm:py-10 px-5 shadow-xl border-[#D7C378] w-full sm:w-1/2`}>
                            <h1 className="text-2xl sm:text-4xl text-black font-bold text-center">{offre.title}</h1>
                            <p className="text-black text-center text-base sm:text-2xl">{offre.description}</p>
                            <button className={`text-white rounded-full px-5 py-3 text-base sm:text-xl font-bold bg-black hover:opacity-70 transition-all duration-300 ${colorRandom()}`} onClick={() => handleAddToCart(offre)} title="Ajouter au panier">
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
