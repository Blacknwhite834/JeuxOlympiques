"use client"

import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useCart } from "../CartContext";
import { useRouter } from "next/navigation";
import gsap from 'gsap';

export default function Billetterie() {
    const { addToCart } = useCart();
    const [offres, setOffres] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/offres')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.prix - b.prix);
                setLoading(false);
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

    useEffect(() => {
        gsap.to(".title", {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            stagger: 0.1
        })
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5 title opacity-0">Découvrez nos offres</h1>
            <main className="flex-grow w-full flex justify-center items-center">
                <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-5 sm:gap-16 mt-5 sm:mt-16 px-10 h-full">
                    {loading && (
                        <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    )}
                    {offres.map(offre => (
                        <div key={offre.id} className={`flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 py-5 sm:py-10 px-5 shadow-xl border-[#D7C378] w-full sm:w-1/2 title opacity-0`}>
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
