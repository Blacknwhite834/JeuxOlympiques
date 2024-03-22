"use client";
// pages/admin-only-page.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { useEffect, useState } from 'react';
import Sidenav from '../components/dashboard/sidenav';

export default function AdminOnlyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    fetch('/api/offres/ventes')
      .then(res => res.json())
      .then(data => setVentes(data))
      .catch(err => console.error('Erreur lors de la récupération des ventes:', err));
  }, []);

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

  const borderColorRandom = () => {
    const colors = ['border-sky-600', 'border-amber-400', 'border-rose-600', 'border-green-600'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className='h-screen flex flex-col xl:flex-row'>
      <Sidenav />
      <div className='flex-1 p-5 sm:p-10'>
        <h1 className="text-center sm:text-left text-black text-4xl sm:text-5xl font-bold">Tableau de bord</h1>
        <div className="mt-10 flex flex-col gap-16">

          <div className="flex flex-col w-fit">
          <h2 className="text-2xl font-bold">Nombre de vente par offre</h2>
          {/* Composant de graphique pour afficher les ventes par offre */}
          <div className="mt-5 flex gap-5">

          {ventes.map(offre => (
              <div key={offre.id} className="flex justify-center items-center flex-col w-fit gap-2">
                <h3 className="text-xl font-bold">{offre.title}</h3>
                <div className={`rounded-full border-[10px] h-32 w-32 flex flex-col justify-center items-center ${borderColorRandom()}`}>
                  <span className="text-lg">{offre.nombreVentes}</span> 
                  <span>VENDU</span>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center flex-col w-fit gap-2">
              <h3 className="text-xl font-bold">Total</h3>
              <div className="rounded-full border-[10px] border-black h-32 w-32 flex flex-col justify-center items-center">
                <span className="text-lg">{ventes.reduce((total, offre) => total + offre.nombreVentes, 0)}</span> 
                <span>VENDU</span>
              </div>
            </div>
            </div>
          </div>

          <div className="flex flex-col">
          <h2 className="text-2xl font-bold ">Recettes par offre</h2>
          {/* Composant de graphique pour afficher les ventes par offre */}
          <div className="mt-5 flex gap-5">

          {ventes.map(offre => (
              <div key={offre.id} className="flex justify-center items-center flex-col w-fit gap-2">
                <h3 className="text-xl font-bold">{offre.title}</h3>
                <div className={`rounded-full border-[10px] h-32 w-32 flex flex-col justify-center items-center ${borderColorRandom()}`}>
                  <span className="text-lg">{offre.nombreVentes * offre.prix}</span>
                  <span>€</span>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center flex-col w-fit gap-2">
              <h3 className="text-xl font-bold">Total</h3>
              <div className="rounded-full border-[10px] border-black h-32 w-32 flex flex-col justify-center items-center">
                <span className="text-lg">{ventes.reduce((total, offre) => total + offre.nombreVentes * offre.prix, 0)}</span>
                <span>€</span>
              </div>
            </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
