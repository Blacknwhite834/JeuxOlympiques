"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Hamburger({ bgColor, borderColor }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

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
  return (
    <div>

<div className={`border rounded-full p-4 ${isOpen ? "border-black" : borderColor} z-50`} onClick={handleClick}>
    <div className="w-5 h-5 flex flex-col justify-between items-center cursor-pointer">
    <div className={`w-7 h-0.5 ${isOpen ? "bg-black rotate-45 translate-y-2" : bgColor} z-50`}></div>
    <div className={`w-6 h-0.5 ${isOpen ? "hidden" : bgColor} z-50`}></div>
    <div className={`w-7 h-0.5 ${isOpen ? "bg-black -rotate-45 -translate-y-2" : bgColor} z-50`}></div>
    </div>
</div>


        <div className="absolute bg-white w-full h-screen z-40 top-0 left-0 hidden" id="menu">
            <div className="flex flex-col justify-center items-center w-full h-full gap-3">
                <Link href="/"><img src="/logo.png" alt="Paris 2024" className="w-[100px] h-[100px]" /></Link>
                <a href="/" className="text-black text-4xl border-t-2 border-black pt-2">Accueil</a>
                <a href="/billetterie" className="text-black text-4xl">Billetterie</a>
                <a href="/panier" className="text-black text-4xl">Panier</a>
                {session ? (
                    <button onClick={() => signOut()} className="text-black text-4xl">Déconnexion</button>
                ) : (
                    <Link href="/login" className="text-black text-4xl">Connexion</Link>
                )
                }
            </div>
        </div>


    </div>
  );
}