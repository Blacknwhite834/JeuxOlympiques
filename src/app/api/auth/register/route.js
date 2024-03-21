// Register 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

const prisma = new PrismaClient();


export async function POST(req) {
  // Extraction des champs requis depuis le corps de la requête
  console.log('req.body' + req.body);

  const body = await req.json();
  const { email, password, name } = body;

  console.log('email reqbody is ' + email);
  console.log('name reqbody is ' + name);

  try {
    // Vérification de l'existence préalable de l'utilisateur
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Si un utilisateur existe déjà avec cet email, renvoie une erreur
      return new Response(JSON.stringify({ message: "Erreur" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Hashage du mot de passe
    const hashedPassword = bcrypt.hashSync(password, 10);

    const accountKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(16));
    

    // Création de l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        accountKey: accountKey,
      },
    });

    // Réponse indiquant la création réussie de l'utilisateur
    return new Response(JSON.stringify({ message: "Utilisateur créé avec succès." }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Gestion des erreurs lors de l'interaction avec la base de données
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return new Response(JSON.stringify({ message: "Une erreur est survenue lors de la création de l'utilisateur." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
