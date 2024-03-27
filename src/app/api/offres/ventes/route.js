import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function GET(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session || session.role !== "ADMIN" && session.role !== "ORGANISATEUR") {
        return new Response(JSON.stringify({ error: "Non autorisé" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const userCount = await prisma.user.count();

    const ventesParOffre = await prisma.offre.findMany({
        select: {
          id: true,
          title: true,
          prix: true,
          ventes: {
            select: {
              id: true,
            }
          },
        }
        });

        const ventesCount = ventesParOffre.map(offre => ({
            ...offre,
            nombreVentes: offre.ventes.length
        }))

        return new Response(JSON.stringify({ userCount, ventesCount }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });


}