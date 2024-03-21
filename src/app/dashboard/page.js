"use client";
// pages/admin-only-page.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { useEffect } from 'react';
import Sidenav from '../components/dashboard/sidenav';

export default function AdminOnlyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Attendre que la session soit chargée pour éviter les redirections inutiles pendant le chargement de la session
    if(status === "authenticated" && session.user.role !== 'ADMIN') {
      // Si l'utilisateur est authentifié mais n'est pas administrateur, rediriger
      router.push('/'); // Rediriger vers la page d'accueil ou une page "Accès refusé" appropriée
    }
  }, [session, status, router]); // Ajouter router et status aux dépendances pour éviter les effets inutiles

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (session?.user?.role !== 'ADMIN') {
    // Cette condition peut être omise si la redirection est gérée correctement par useEffect
    return null; // En principe, cette ligne ne sera jamais exécutée si la redirection fonctionne
  }

  return (
    <div className='h-screen flex flex-row'>
      <Sidenav />
      <div className='flex-1 p-10'>
        <h1 className="text-left text-black text-4xl sm:text-5xl font-bold">Tableau de bord</h1>
        {/* Votre contenu de page réservée aux administrateurs ici */}
      </div>
    </div>
  );
}
