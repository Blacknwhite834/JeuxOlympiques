"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "./hamburger";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header({ color, bgColor, borderColor}) {
    const [decompte, setDecompte] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [menu, setMenu] = useState(false);
    const { data: session } = useSession();
    const menuRef = useRef(); // Référence pour le bouton/menu



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

    const handleMenu = () => {
        setMenu(!menu);
    };

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);


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

            <div className="hidden sm:flex justify-end items-center gap-5 text-xl xl:text-2xl">
                <Link href="/" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#D7C378] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Accueil
                </Link>
                <Link href="/billetterie" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#D7C378] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Billetterie
                </Link>
                <Link href="/panier" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#D7C378] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Panier
                </Link>

                <div className="flex justify-end items-center gap-5 text-xl xl:text-2xl relative h-fit" ref={menuRef}>
                <button onClick={handleMenu} className="stroke-[#D7C378]">
                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                <g clip-path="url(#clip0_51_2)">
                <path d="M7.995 34.85C9.30185 32.7049 11.1385 30.932 13.3285 29.7018C15.5185 28.4716 17.9881 27.8254 20.5 27.8254C23.0119 27.8254 25.4815 28.4716 27.6715 29.7018C29.8614 30.932 31.6981 32.7049 33.005 34.85M20.5 23.4286C22.4418 23.4286 24.304 22.6572 25.677 21.2842C27.0501 19.9111 27.8214 18.0489 27.8214 16.1071C27.8214 14.1654 27.0501 12.3031 25.677 10.9301C24.304 9.55708 22.4418 8.78571 20.5 8.78571C18.5582 8.78571 16.696 9.55708 15.323 10.9301C13.9499 12.3031 13.1786 14.1654 13.1786 16.1071C13.1786 18.0489 13.9499 19.9111 15.323 21.2842C16.696 22.6572 18.5582 23.4286 20.5 23.4286Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.5 39.5357C25.5486 39.5357 30.3904 37.5302 33.9603 33.9603C37.5302 30.3904 39.5357 25.5486 39.5357 20.5C39.5357 15.4514 37.5302 10.6096 33.9603 7.03972C30.3904 3.46983 25.5486 1.46429 20.5 1.46429C15.4514 1.46429 10.6096 3.46983 7.03973 7.03972C3.46984 10.6096 1.46429 15.4514 1.46429 20.5C1.46429 25.5486 3.46984 30.3904 7.03973 33.9603C10.6096 37.5302 15.4514 39.5357 20.5 39.5357Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_51_2">
                <rect width="41" height="41" fill=""/>
                </clipPath>
                </defs>
                </svg>
                </button>

                {menu && (
                        <div className="absolute right-0 z-50 bg-zinc-100 text-base text-black rounded-md shadow-lg mt-2 flex justify-center items-start flex-col" style={{ top: menuRef.current ? menuRef.current.offsetHeight + 'px' : '0px' }}>
                            {session ? (
                                <>
                                    <span className="px-4 py-2 font-bold">Profile</span>
                                    <div className="h-0.5 bg-black w-full"></div>
                                    <div className="px-4 pt-2 pb-1">{session.user.name}</div>
                                    <div className="px-4 pb-2 pt-1">{session.user.email}</div>
                                    <div className="px-4 py-2 hover:opacity-70 cursor-pointer w-full text-center" onClick={() => signOut()}>Déconnexion</div>
                                </>
                            ) : (
                                <div className="px-4 py-2 hover:opacity-70 cursor-pointer w-full text-center" onClick={() => signIn()}>Connexion</div>
                            )}
                        </div>
                    )}
                </div>


            </div>
        </header>
    )
}