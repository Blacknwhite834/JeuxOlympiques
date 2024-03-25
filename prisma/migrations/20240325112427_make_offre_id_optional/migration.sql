-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_offreId_fkey";

-- AlterTable
ALTER TABLE "Vente" ALTER COLUMN "offreId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_offreId_fkey" FOREIGN KEY ("offreId") REFERENCES "Offre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
