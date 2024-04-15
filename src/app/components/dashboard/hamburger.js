"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function HamburgerDashboard() {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="">

<div className={`border rounded-md p-3 ${isOpen ? "border-black" : "border-black"} z-50`} onClick={handleClick}>
    <div className="w-5 h-5 flex flex-col justify-between items-center cursor-pointer">
    <div className={`w-6 h-0.5 ${isOpen ? "bg-black rotate-45 translate-y-2" : "bg-black"} z-50`}></div>
    <div className={`w-6 h-0.5 ${isOpen ? "hidden" : "bg-black"} z-50`}></div>
    <div className={`w-6 h-0.5 ${isOpen ? "bg-black -rotate-45 -translate-y-2" : "bg-black"} z-50`}></div>
    </div>
</div>


        <div className="absolute bg-white w-full h-screen z-40 top-0 left-0 hidden" id="menu">
            <div className="flex flex-col justify-center items-center w-full h-full gap-3">
                <Link href="/dashboard"><img src="/logo.png" alt="Paris 2024" className="w-[100px] h-[100px]" /></Link>
                <a href="/dashboard" className="text-black text-4xl border-t-2 border-black pt-2">Accueil</a>
                <a href="/dashboard/offre" className="text-black text-4xl">Offres</a>
                <button onClick={() => signOut()} className="bg-black text-white px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300">Se déconnecter</button>
            </div>
        </div>


    </div>
    )
}