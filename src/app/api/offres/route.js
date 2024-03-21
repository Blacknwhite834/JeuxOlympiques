// api/offres

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export async function GET(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Vérifier si l'utilisateur est connecté et a le rôle requis
    if (!session || session.role !== 'ADMIN') {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // Vérification de l'authentification concernant l'administrateur
    
    const offres = await prisma.offre.findMany();
    return new Response(JSON.stringify(offres), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Vérifier si l'utilisateur est connecté et a le rôle requis
    if (!session || session.role !== 'ADMIN') {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // Vérification de l'authentification concernant l'administrateur
    if (!session || session.user.role !== 'ADMIN') {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
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
}

