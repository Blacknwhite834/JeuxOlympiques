// api/offres/[id]

import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(req, context) {
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
    const { id } = context.params;
    if (!id) {
        return new Response("Missing 'id' parameter", { status: 400 });
    }

    try {
        const offre = await prisma.offre.findUnique({
            where: {
                id: id, // Assurez-vous que id est une chaîne si votre clé primaire est un UUID
            },
        });

        if (!offre) {
            return new Response("Offre not found", { status: 404 });
        }

        return new Response(JSON.stringify(offre), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function PUT(req, context) {
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
    const { id } = context.params;
    if (!id) {
        return new Response("Missing 'id' parameter", { status: 400 });
    }

    const body = await req.json();
    const { title, description, prix, nombre } = body; // Utilisez les champs appropriés de votre modèle

    const prixInt = parseInt(prix);
    const nombreInt = parseInt(nombre);

    try {
        const updatedOffre = await prisma.offre.update({
            where: {
                id: id,
            },
            data: {
                title,
                description,
                prix: prixInt,
                nombre: nombreInt,
            },
        });

        return new Response(JSON.stringify(updatedOffre), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function DELETE(req, context) {
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
    const { id } = context.params;
    if (!id) {
        return new Response("Missing 'id' parameter", { status: 400 });
    }

    try {
        await prisma.offre.delete({
            where: {
                id: id,
            },
        });

        return new Response(JSON.stringify({ message: "Offre deleted successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}