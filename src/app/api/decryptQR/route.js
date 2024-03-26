// api/decryptQR

import CryptoJS from "crypto-js";
import { PrismaClient } from '@prisma/client';
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session || session.role !== 'ADMIN' && session.role !== 'EMPLOYE') {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const { qrData } = await req.json();
    console.log( "qrData", qrData);

    try {
        const bytes = CryptoJS.AES.decrypt(qrData, process.env.SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const [venteKey, accountKey] = decryptedData.split('-');
        console.log( "venteKey", venteKey);
        console.log( "accountKey", accountKey);

        if (!decryptedData) {
            console.log('Failed to decrypt data.');
            throw new Error('Failed to decrypt data.');
        }

    

        const vente = await prisma.vente.findFirst({
            where: { venteKey: venteKey },
            include: {
                user: true,
                offre: true,
            },
        });

      if (!vente) {
        return new Response(JSON.stringify({ error: "Vente non trouvée" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }

    return new Response(JSON.stringify({ user: vente.user, offre: vente.offre, venteDate: vente.date }), {
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