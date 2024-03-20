"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Hello() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // La fonction est appelée lorsque l'utilisateur n'est pas authentifié
        signIn();
    },
  });

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Page Protégée</h1>
      {/* Votre contenu de page protégée ici */}
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}
