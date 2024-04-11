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
    const { paymentMethodId, total, offreId, billingDetails } = body;
    // console.log(body);

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, 
            currency: 'eur',
            payment_method: paymentMethodId,
            confirmation_method: "automatic",
            confirm: true,
            return_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
        });

        const venteKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(16));

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

        const venteId = vente.id;
        // console.log("Vente créée avec succès : ", venteId);
        // console.log("Paiement créé avec succès : ", paymentIntent);
        // console.log("Vente créée avec succès : ", venteId);
        // console.log("Paiement créé avec succès : ", vente);


        return new Response(JSON.stringify({ success: true, venteId: venteId }), {
            status: 200,
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
