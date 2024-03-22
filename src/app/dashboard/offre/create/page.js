"use client"
import Sidenav from "@/app/components/dashboard/sidenav";
import { useState } from "react";

export default function CreateOffre() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);
    const [nombre, setNombre] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [createMessage, setCreateMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('/api/offres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, prix, nombre }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Offre créée", data);
                setIsLoading(false);
                setCreateMessage(true);
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'offre:", error);
                setIsLoading(false);
                setErrorMessage('Erreur lors de la création de l\'offre');
            });
    };

    return (
        <div className="h-screen flex flex-col xl:flex-row">
            <Sidenav />
            <div className='flex-1 p-5 sm:p-10'>
            <h1 className="text-center sm:text-left text-black text-4xl sm:text-5xl font-bold">Créer une offre</h1>
            <form onSubmit={handleSubmit} className="mt-10">
                <div className="mb-4">
                    <label htmlFor="title " className="block ">Titre:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre"
                        className="input border-2 border-black rounded-md p-2 w-full sm:w-fit"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block ">Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full h-32 border-2 border-black rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block ">Nombre de billlets:</label>
                    <input
                        type="number"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                        className="input border-2 border-black rounded-md p-2 w-full sm:w-fit"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="prix" className="block ">Prix:</label>
                    <input
                        type="number"
                        name="prix"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        placeholder="Prix"
                        className="input border-2 border-black rounded-md p-2 w-full sm:w-fit"
                        required
                    />
                </div>
                </div>
                <button
                    type="submit"
                    className="bg-black text-white px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Création...' : 'Créer'}
                </button>
                {createMessage && <p className="text-green-500">Offre créée avec succès</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
            </div>
        </div>
    );
}