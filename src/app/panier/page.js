"use client";

import { useEffect } from "react";
import Header from "../components/header";
import { useCart } from "../CartContext";

export default function Panier() {
    const { cartItems, clearCart } = useCart();

    return (
        <div className="flex flex-col min-h-screen">
      <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
      <div className="flex-grow w-full flex justify-center">
        <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Votre panier</h1>
        <div className="">
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Prix: {item.prix}€</p>
                                {/* Affichez ici d'autres détails que vous souhaitez montrer */}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Votre panier est vide.</p>
            )}


            <button onClick={() => clearCart()}>Vider le panier</button>
        </div>
        </div>
    </div>
    );
}