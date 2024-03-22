"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "./hamburger";

export default function Header({ color, bgColor, borderColor}) {
    const [decompte, setDecompte] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
    const interval = setInterval(() => {
        const date = new Date("2024-07-26T19:30:00+02:00");
        const now = new Date();
        const diff = date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDecompte({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
    }, []);

  


    return (
        <header className=" w-full py-3 px-5 sm:px-10 md:px-16 lg:px-24 flex justify-between lg:grid grid-cols-3 items-center" style={color}>
            <div className="hidden lg:flex justify-start gap-3">
                <span className="text-base xl:text-xl text-right">Ouverture des JO <br/>dans :</span>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col items-center gap-0">
                        <span className="text-base xl:text-2xl">{decompte.days}</span>
                        <span className="text-base">JOURS</span>
                    </div>
                    <div className="flex flex-col items-center gap-0">
                        <span className="text-base xl:text-2xl">{decompte.hours}</span>
                        <span className="text-base">HEURES</span>
                    </div>
                    <div className="flex flex-col items-center gap-0">
                        <span className="text-base xl:text-2xl">{decompte.minutes}</span>
                        <span className="text-base">MINS</span>
                    </div>
                    <div className="flex flex-col items-center gap-0">
                        <span className="text-base xl:text-2xl">{decompte.seconds}</span>
                        <span className="text-base">SECS</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Link href="/">
                <img src="/logo.png" alt="Paris 2024" className="w-[100px] md:w-[140px] lg:w-[160px] h-[100px] md:h-[140px] lg:h-[160px] hover:scale-105 transition duration-300" />
                </Link>
            </div>

            <div className="block sm:hidden">
                <Hamburger bgColor={bgColor} borderColor={borderColor} />
            </div>

            <div className="hidden sm:flex justify-end gap-5 text-xl xl:text-2xl">
                <Link href="/" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-orange-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Accueil
                </Link>
                <Link href="/billetterie" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-orange-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Billetterie
                </Link>
                <Link href="/panier" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-orange-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Panier
                </Link>
            </div>
        </header>
    )
}