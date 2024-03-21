"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidenav() {
    return (
        <div className="flex flex-col w-1/6 h-full bg-white border-r-2 border-black text-black items-center justify-between pb-10">
            <div className="flex flex-col gap-5 px-5 py-5 justify-center w-full items-center">
                <Link href="/dashboard"><img src="/logo.png" alt="logo" className="w-30 h-30"/></Link>
                <Link href="/dashboard" className="text-2xl font-bold mt-5">Accueil</Link>
                <Link href="/dashboard/offre" className="text-2xl font-bold">Offres</Link>
            </div>
            <button onClick={() => signOut()} className="text-xl font-bold bg-black text-white py-2 px-3 rounded-md w-fit hover:bg-opacity-70 transition duration-300">Se déconnecter</button>
        </div>
    )
}