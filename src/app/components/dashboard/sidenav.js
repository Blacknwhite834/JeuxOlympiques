"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import HamburgerDashboard from "./hamburger";

export default function Sidenav() {
    return (
        <div className="flex flex-row xl:flex-col x-full xl:w-1/6 h-fit xl:h-full bg-white border-b-2 xl:border-b-none border-r-none xl:border-r-2 border-black text-black items-center justify-between pb-0 xl:pb-10">

            <div className="hidden xl:flex flex-col gap-5 px-5 py-5 justify-center w-full items-center">
                <Link href="/dashboard"><img src="/logo.png" alt="logo" className="w-30 h-30"/></Link>
                <Link href="/dashboard" className="text-2xl font-bold mt-5">Accueil</Link>
                <Link href="/dashboard/offre" className="text-2xl font-bold">Offres</Link>
            </div>

            <div className="flex xl:hidden flex-row px-5 py-2 justify-between w-full items-center">
            <Link href="/dashboard"><img src="/logo.png" alt="logo" className="w-24 h-24"/></Link>
            <HamburgerDashboard />
            </div>

            <button onClick={() => signOut()} className="hidden xl:block text-xl font-bold bg-black text-white py-2 px-3 rounded-md w-fit hover:bg-opacity-70 transition duration-300">Se déconnecter</button>
        </div>
    )
}