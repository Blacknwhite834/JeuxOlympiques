import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const ventesParOffre = await prisma.offre.findMany({
        select: {
          id: true,
          title: true,
          ventes: {
            select: {
              id: true
            }
          },
        }
        });

        const ventesCount = ventesParOffre.map(offre => ({
            ...offre,
            nombreVentes: offre.ventes.length
        }))

        return new Response(JSON.stringify(ventesCount), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });


}