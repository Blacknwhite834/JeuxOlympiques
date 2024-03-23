"use client"
import { useEffect, useState } from "react";
import { useCart } from "@/app/CartContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Header from "../components/header";
import { signIn, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/navigation";

export default function Checkout() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
            signIn();
        }
    
    }, [session, status]);


    const { cartItems, clearCart } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

   

    const handlePaymentSubmission = async (event) => {


        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js n'a pas encore été chargé
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setCheckoutError(error.message);
            setIsProcessing(false);
            return;
        }

        // Ici, envoyez `paymentMethod.id` à votre serveur pour traiter le paiement
        const paymentResult = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                total: cartItems.reduce((acc, item) => acc + item.prix, 0), // Convertir le total en centimes
                offreId: cartItems[0].id, // Supposer que vous voulez utiliser l'ID de la première offre dans le panier,
                userId: session.user.id,
            }),
        }).then(r => r.json());



        if (paymentResult.error) {
            setCheckoutError(paymentResult.error);
            setIsProcessing(false);
        } else {
            setCheckoutSuccess(true);
            router.push(`/checkout/success/${paymentResult.venteId}`);
            clearCart();
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Paiement</h1>

            <div className="flex flex-col w-full sm:w-1/2 mx-auto gap-5 sm:gap-10 mt-5 sm:mt-16 px-10 h-full">
            <h2 className="text-2xl sm:text-4xl font-bold">Récapitulatif de la commande</h2>
            <ul className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                        <span>{item.title}</span>
                        <span>{item.prix} €</span>
                    </li>
                ))}
            </ul>
            {checkoutError && <p style={{ color: "red" }}>{checkoutError}</p>}
            {checkoutSuccess ? (
                <p>Paiement réussi! Merci pour votre achat.</p>
            ) : (
                <form onSubmit={handlePaymentSubmission}>
                    <CardElement />
                    <button disabled={isProcessing || !stripe || !elements} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-opacity-70 transition duration-300 mt-5 text-center">
                        {isProcessing ? "Traitement…" : "Payer"}
                    </button>
                </form>
            )}
            </div>
        </div>
    );
}
