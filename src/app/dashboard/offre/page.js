"use client";
import Sidenav from "@/app/components/dashboard/sidenav";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Offres() {
    const [offres, setOffres] = useState([]);

    useEffect(() => {
        // Supposons que votre endpoint API pour récupérer toutes les offres soit '/api/offres'
        fetch('/api/offres')
            .then(response => response.json())
            .then(data => setOffres(data))
            .catch(error => console.error("Erreur lors de la récupération des offres:", error));
    }, []);

    const handleDelete = (id) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre?")) {
            return;
        } else {
        fetch(`/api/offres/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log("Offre supprimée", data);
                // Mettre à jour la liste des offres après la suppression
                setOffres(offres.filter(offre => offre.id !== id));
            })
            .catch(error => console.error("Erreur lors de la suppression de l'offre:", error));
        }
    }

    return (
        <div className="h-screen flex flex-col xl:flex-row">
    <Sidenav />
    <div className='flex-1 p-5 sm:p-10'>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 ">
        <h1 className="text-center sm:text-left text-black text-4xl sm:text-5xl font-bold">Offres</h1>
        <Link href="/dashboard/offre/create" passHref><button className="bg-black text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300">Ajouter une offre</button></Link>
        </div>
        
        {/* Tableau offre dashboard */}
        <div className="mt-10 hidden lg:block">
            <div className="grid grid-cols-6 gap-4 text-center font-bold border-b-2 border-black">
                <h2 className="text-2xl">ID</h2>
                <h2 className="text-2xl">TITRE</h2>
                <h2 className="text-2xl">DESCRIPTION</h2>
                <h2 className="text-2xl">PRIX</h2>
                <h2 className="text-2xl">NOMBRE</h2>
                <h2 className="text-2xl">ACTION</h2>
            </div>
            
            {offres.map((offre) => (
                <div key={offre.id} className="grid grid-cols-6 gap-4 text-center mt-2">
                    <p>{offre.id}</p>
                    <p>{offre.title}</p>
                    <p className="truncate">{offre.description}</p>
                    <p>{offre.prix}</p>
                    <p>{offre.nombre}</p>
                    <div className="flex justify-center items-center gap-2">
                        <Link href={`/dashboard/offre/${offre.id}`} passHref><button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300">Voir</button></Link>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300" onClick={() => handleDelete(offre.id)}>Supprimer</button>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-5 overflow-x-auto block lg:hidden">
            <div className="min-w-full divide-y divide-black">
                {offres.map((offre) => (
                    <div key={offre.id} className="grid grid-cols-1 lg:grid-cols-6 gap-1 text-center py-4">
                        <div className="lg:hidden font-bold">ID:</div><p className="truncate">{offre.id}</p>
                        <div className="lg:hidden font-bold">Titre:</div><p>{offre.title}</p>
                        <div className="col-span-1 lg:col-span-2">
                            <div className="sm:hidden font-bold">Description:</div><p className="truncate">{offre.description}</p>
                        </div>
                        <div className="lg:hidden font-bold">Prix:</div><p>{offre.prix}</p>
                        <div className="lg:hidden font-bold">Nombre:</div><p>{offre.nombre}</p>
                        <div className="flex justify-center items-center gap-2">
                            <Link href={`/dashboard/offre/${offre.id}`} passHref><button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300">Voir</button></Link>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300" onClick={() => handleDelete(offre.id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
    )
}