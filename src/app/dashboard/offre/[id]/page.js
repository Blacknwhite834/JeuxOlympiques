"use client";
import Sidenav from "@/app/components/dashboard/sidenav";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OffreDetail() {
    const [offre, setOffre] = useState({
        title: '',
        description: '',
        prix: 0,
        nombre: 0
    });
    const [offreInitial, setOffreInitial] = useState({});
    const [isModified, setIsModified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`/api/offres/${id}`)
                .then(response => response.json())
                .then(data => {
                    setOffre(data);
                    setOffreInitial(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération de l'offre:", error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    useEffect(() => {
        const isDataModified = JSON.stringify(offre) !== JSON.stringify(offreInitial);
        setIsModified(isDataModified);
    }, [offre, offreInitial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffre({ ...offre, [name]: value });
        setUpdateMessage(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`/api/offres/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(offre),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Offre mise à jour", data);
                setIsLoading(false);
                setUpdateMessage(true)
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'offre:", error);
                setIsLoading(false);
            });
    };

    const handleDelete = async () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
            setIsLoading(true);
            fetch(`/api/offres/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    console.log("Offre supprimée");
                    router.push('/dashboard/offres'); 
                } else {
                    throw new Error('Problème lors de la suppression de l\'offre');
                }
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de l'offre:", error);
            })
            .finally(() => setIsLoading(false));
        }
    };

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="h-screen flex flex-row">
            <Sidenav />
            <div className='flex-1 p-10'>
                <h1 className="text-left text-black text-4xl sm:text-5xl font-bold">Détails de l'offre</h1>
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="mb-4">
                        <label htmlFor="title" className="block">Titre:</label>
                        <input type="text" id="title" name="title" value={offre.title || ''} onChange={handleChange} className="input border-2 border-black rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description:</label>
                        <textarea id="description" name="description" value={offre.description || ''} onChange={handleChange} className=" w-full h-32 border-2 border-black rounded-md p-2" required />
                    </div>
                    <div className="flex flex-row gap-4">
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block">Nombre:</label>
                        <input type="number" id="nombre" name="nombre" value={offre.nombre} onChange={handleChange} className="input border-2 border-black rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="prix" className="block">Prix:</label>
                        <input type="number" id="prix" name="prix" value={offre.prix} onChange={handleChange} className="input border-2 border-black rounded-md p-2" required />
                    </div>
                    </div>
                    <button type="submit" className={`bg-blue-500 text-white px-3 py-1 rounded-md transition duration-300 ${isModified ? '' : 'opacity-70 cursor-not-allowed'}`} disabled={!isModified || isLoading}>
                    {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
                    </button>
                </form>
                <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300 mt-5" disabled={isLoading}>
                {isLoading ? 'Suppression...' : 'Supprimer'}
                </button>
                {updateMessage && <p className="mt-2 text-green-500">Offre mise à jour avec succès</p>}
            </div>
        </div>
    );
}
