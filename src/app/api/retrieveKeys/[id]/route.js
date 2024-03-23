import { getSession } from "next-auth/react"; 
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();

export async function GET(req, context) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { id } = context.params;
    if (!id) {
        return new Response("Missing 'id' parameter", { status: 400 });
    }

    const userId = session?.sub;
    console.log(userId);

    if (!session) {
        return new Response(JSON.stringify({ error: "Non autorisé à accéder à cette page" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        const vente = await prisma.vente.findUnique({
            where: { id: id },
            include: { user: true },
        });

        if (!userId || vente.user.id !== userId) {
            return new Response(JSON.stringify({ error: "Non autorisé" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const dataForQRCode = `${vente.venteKey}-${vente.user.accountKey}`;

        const encryptedDataForQRCode = CryptoJS.AES.encrypt(dataForQRCode, process.env.SECRET_KEY).toString();

        return new Response(JSON.stringify({qrData: encryptedDataForQRCode}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des clés : ", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
