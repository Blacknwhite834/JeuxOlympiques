// /api/checkout.js
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import CryptoJS from 'crypto-js';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });

    }

    const userId = session?.sub;

    const body = await req.json();
    const { paymentMethodId, total, offreId } = body;
    console.log(body);

    try {
        

        // Créer un paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, // Assurez-vous que c'est en centimes
            currency: 'eur',
            payment_method: paymentMethodId,
            confirmation_method: "automatic",
            confirm: true,
            return_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
        });

        // Générer une clé unique pour la vente
        const venteKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(16));

        // Insérer une nouvelle vente dans la base de données avec les relations
        const vente = await prisma.vente.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                offre: {
                    connect: {
                        id: offreId,
                    },
                },
                total: total,
                venteKey: venteKey,
            },
        });

        return new Response(JSON.stringify(vente), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Erreur lors du paiement : ", error.message);
        return new Response(JSON.stringify({ error: "Une erreur est survenue lors du paiement." }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
