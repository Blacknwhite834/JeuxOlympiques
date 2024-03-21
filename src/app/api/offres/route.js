// api/offres

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const offres = await prisma.offre.findMany();
    return new Response(JSON.stringify(offres), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(req) {
    const body = await req.json();
    // Utilisation des champs spécifiés dans le schéma initial
    const { title, description, prix, nombre } = body;

    const prixInt = parseInt(prix);
    const nombreInt = parseInt(nombre);

    try {
        const offre = await prisma.offre.create({
            data: {
                title,       // Titre de l'offre
                description, // Description de l'offre
                prix: prixInt, // Prix de l'offre
                nombre: nombreInt, // Nombre d'offres disponibles
            },
        });
        return new Response(JSON.stringify(offre), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        // Gestion d'erreur simplifiée
        return new Response(JSON.stringify({ error: "Une erreur est survenue lors de la création de l'offre." }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

