import React, { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';

export default function Footer() {

    useEffect(() => {
        // gsap.utils.toArray('.footer').forEach(element => {
        //     gsap.to(element, {
        //       y: 0,
        //       opacity: 1,
        //       stagger: 0.2, 
        //       scrollTrigger: {
        //         trigger: element,
        //         start: 'top 95%',
        //         end: 'bottom top',
        //         toggleActions: 'play none none none',
        //       }
        //     });
        //   });

        gsap.to(".footer", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            stagger: 0.1
        })
    }, []);
    return (
        <div className="footer opacity-0 translate-y-10 w-full rounded-tl-[10px] rounded-tr-[10px] sm:rounded-tl-[50px] sm:rounded-tr-[50px] bg-black mt-10 sm:mt-16 py-10 sm:py-16 flex justify-center items-center gap-3 sm:gap-5 flex-col sm:flex-row">
            <Image src="/logoOlympiqueWhite.png" alt="Logo Olympique" width={100} height={100} />
            <Link href="/" className="text-white text-xl pt-5 sm:pt-0 border-t-2 sm:border-t-0 border-l-none sm:border-l-2 border-white pl-0 sm:pl-5">Accueil</Link>
            <Link href="/billetterie" className="text-white text-xl">Billetterie</Link>
            <Link href="/panier" className="text-white text-xl">Panier</Link>
            <span className="text-white text-xl">© Paris 2024</span>
        </div>
    )
}