"use client";

import { useEffect } from "react";
import Header from "../components/header";
import { useCart } from "../CartContext";

export default function Panier() {
    const { cartItems, clearCart } = useCart();

    return (
        <div className="flex flex-col min-h-screen pb-10">
      <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
      <div className="flex-grow w-full flex flex-col">
        <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Votre panier</h1>

        <div className="mt-10 flex w-full flex-col lg:flex-row justify-center items-center gap-10 px-5 sm:px-0">

            <div className="flex flex-col w-full sm:w-fit">
            <h2 className="text-2xl font-bold">Contenu de votre panier</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <div className="bg-zinc-100 rounded-lg p-5 my-5">
                                <span className="text-xl font-bold">Offre:</span>
                                <h2 className="text-xl ">{item.title}</h2>
                                <p className="text-xl ">Nombre de billets: {item.nombre}</p>
                                <p className="text-xl ">Prix: {item.prix}€</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xl text-center">Votre panier est vide</p>
            )}
            <button onClick={() => clearCart()} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300 mt-5">Vider le panier</button>
            </div>

            <div className="bg-zinc-100 rounded-lg p-5 sm:p-10 flex flex-col gap-3 w-full sm:w-fit">
            <h2 className="text-2xl font-bold">Récapitulatif de votre commande</h2>
            <div className="h-0.5 bg-black my-5"></div>
            <div className="flex justify-between">
            <p>Nombre d'articles: </p><span className="font-bold">{cartItems.length}</span>
            </div>
            <div className="h-0.5 bg-zinc-300"></div>
            <div className="flex justify-between">
            <p>Nombre total de billets: </p><span className="font-bold">{cartItems.reduce((total, item) => total + item.nombre, 0)}</span>
            </div>
            <div className="h-0.5 bg-zinc-300"></div>
            <div className="flex justify-between">
            <p>Total: </p>
            <span className="font-bold">{cartItems.reduce((total, item) => total + item.prix, 0)}€</span>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300 mt-5">Passer la commande</button>
            </div>


        </div>
        </div>
    </div>
    );
}