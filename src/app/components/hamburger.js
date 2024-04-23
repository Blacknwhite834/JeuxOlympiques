"use client";
import React, { useEffect, useRef } from 'react';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from '../CartContext';
import gsap from 'gsap';

export default function Hamburger({ bgColor, borderColor }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const { cartItems, clearCart } = useCart();
    const menuRef = useRef(null);

    const handleClick = () => {
        if (isOpen) {
            document.getElementById("menu").classList.add("hidden");
            document.getElementById("menu").classList.remove("flex");
            setIsOpen(false);
        } else {
            document.getElementById("menu").classList.add("flex");
            document.getElementById("menu").classList.remove("hidden");
            setIsOpen(true);
        }
    };

    const redirectToLogout = () => {
        signOut();
        clearCart();
    };

    useEffect(() => {
        gsap.to(".menu", {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
        })
    })

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.inOut",
            });
        } else {
            gsap.to(menuRef.current, {
                y: "-100%",
                opacity: 1,
                duration: 1,
                ease: "power4.inOut",
            });
        }
    }, [isOpen]);

    
  return (
    <div> 

        <div className={`border rounded-full menu opacity-0 p-4 ${borderColor} z-50`} onClick={handleClick}>
            <div className="w-5 h-5 flex flex-col justify-between items-center cursor-pointer z-50">
            <div className={`w-7 h-0.5 ${bgColor} z-50`}></div>
            <div className={`w-7 h-0.5 ${bgColor} z-50`}></div>
            <div className={`w-7 h-0.5 ${bgColor} z-50`}></div>
            </div>
        </div>


        <div ref={menuRef} className="absolute bg-white w-full h-screen z-40 top-0 left-0 hidden" id="menu">

            <div className='right-0 absolute mt-10 mr-5' onClick={handleClick}>
            <div className="border border-black rounded-full menu opacity-0 p-4 z-50">
            <div className="w-5 h-5 flex flex-col justify-between items-center cursor-pointer z-50">
            <div className="w-7 h-0.5 z-50 bg-black rotate-45 translate-y-2"></div>
            <div className="hidden"></div>
            <div className="w-7 h-0.5 bg-black -rotate-45 -translate-y-2 z-50"></div>
            </div>
            </div>

            </div>

            <div className="flex flex-col justify-center items-center w-full h-full gap-3">
                <Link href="/"><img src="/logo.png" alt="Paris 2024" className="w-[100px] h-[100px]" /></Link>
                <a href="/" className="text-black text-4xl border-t-2 border-black pt-2">Accueil</a>
                <a href="/billetterie" className="text-black text-4xl">Billetterie</a>
                <a href="/panier" className="text-black text-4xl">Panier</a>
                {session ? (
                    <button onClick={redirectToLogout} className="text-white bg-black px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300">Déconnexion</button>
                ) : (
                    <Link href="/login" className=" bg-black text-white px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300">Connexion</Link>
                )
                }
            </div>
        </div>


    </div>
  );
}