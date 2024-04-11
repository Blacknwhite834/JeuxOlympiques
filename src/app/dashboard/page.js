"use client";
// pages/admin-only-page.js
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { useEffect, useState } from 'react';
import Sidenav from '../components/dashboard/sidenav';
import ChartComponent from '../components/dashboard/chart';
import Graphic from '../components/dashboard/graphic';

export default function AdminOnlyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ventes, setVentes] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetch('/api/offres/ventes')
      .then(res => res.json())
      .then(data => {
        setVentes(data.ventesCount);
        setUserCount(data.userCount);
      })
      .catch(err => console.error('Erreur lors de la récupération des ventes:', err));
  }, []);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  const borderColorRandom = () => {
    const colors = ['border-sky-600', 'border-amber-400', 'border-rose-600', 'border-green-600'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  

  const labels = ventes && ventes.map(offre => offre.title);
  const values = ventes && ventes.map(offre => offre.nombreVentes);

  const labelsRecettes = ventes && ventes.map(offre => offre.title);
  const valuesRecettes = ventes && ventes.map(offre => offre.nombreVentes * offre.prix);

  return (
    <div className='h-screen flex flex-col xl:flex-row'>
      <Sidenav />
      <div className='flex-1 p-5 sm:p-10'>
        <h1 className="text-center sm:text-left text-black text-4xl sm:text-5xl font-bold">Tableau de bord</h1>
        <div className="mt-5 flex gap-10 justify-start h-fit flex-wrap w-full">

          <div className="flex flex-col w-fit bg-zinc-100 rounded-[30px] p-10 shadow-md">
          <h2 className="text-2xl font-bold text-center sm:text-left">Nombre de vente par offre</h2>
          {/* Composant de graphique pour afficher les ventes par offre */}
          <div className="mt-5 flex gap-5 flex-wrap justify-center sm:justify-start">

          {ventes && ventes.map(offre => (
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
                <span className="text-lg">{ventes && ventes.reduce((total, offre) => total + offre.nombreVentes, 0)}</span> 
                <span>VENDU</span>
              </div>
            </div>

            

            <div className="w-full sm:w-fit flex justify-center">
            <ChartComponent data={{ labels, values }}  type="pie" titre={"Nombre de vente par offre"}/>
            </div>
            </div>


          </div>

            <div className='flex flex-col items-center gap-5 justify-between flex-1'>

          <div className="flex flex-col bg-zinc-100 rounded-[30px] p-5 shadow-md gap-5 h-fit w-full">
            <h2 className="text-2xl font-bold text-center">Retourner sur le site</h2>
            <img src="/logoOlympique.png" alt="Logo Olympique" className="mx-auto" />
              <button onClick={() => router.push('/')} className="bg-black text-white px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300">Retourner sur le site Officiel</button>
          </div>

          <div className="flex flex-col bg-zinc-100 rounded-[30px] p-5 shadow-md w-full gap-5 h-fit">
            <h2 className="text-2xl font-bold text-center">Ajouter une offre</h2>
            <p className="text-center text-sm">Ajouter une nouvelle offre à la liste des offres disponibles sur le site.</p>
            <button onClick={() => router.push('/dashboard/offre/create')} className="bg-black text-white px-5 py-2 rounded-md hover:bg-opacity-70 transition duration-300">Ajouter une offre</button>
          </div>

            </div>

          <div className="flex flex-col bg-zinc-100 rounded-[30px] p-10 shadow-md w-fit">
          <h2 className="text-2xl font-bold text-center sm:text-left ">Recettes par offre</h2>
          <div className="mt-5 flex gap-5 flex-wrap justify-center sm:justify-start">

          {ventes && ventes.map(offre => (
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
                <span className="text-lg">{ventes && ventes.reduce((total, offre) => total + offre.nombreVentes * offre.prix, 0)}</span>
                <span>€</span>
              </div>
            </div>

            <div className="w-full sm:w-fit pl-5 flex justify-center">
            <ChartComponent data={{ labels: labelsRecettes, values: valuesRecettes }}
            type="bar" titre={"Recettes par offre"}/>
            </div>

            </div>
            

          </div>

          <div className='flex flex-col items-center gap-5 w-fit flex-1'>
          
          <div className="flex flex-col bg-zinc-100 rounded-[30px] p-5 shadow-md gap-2 h-fit w-full">
            <h2 className="text-2xl font-bold text-center">Nombre d'utilisateur</h2>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold">{userCount}</span>
              <span>Utilisateurs inscrits</span>
              </div>
          </div>

          <div className="flex flex-row bg-zinc-100 rounded-[30px] p-5 shadow-md gap-5 h-fit w-full justify-around">

            <div className='flex flex-col gap-2'>
            <h2 className="text-xl font-bold text-center sm:text-left">Nombre d'offres</h2>
            <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold">{ventes && ventes.length}</span>
            <span>Offres disponibles</span>
            </div>
            </div>

            <div className='w-0.5 bg-black'></div>

            <div className='flex flex-col gap-2'>
            <h2 className="text-xl font-bold text-center sm:text-left">Nombre de ventes</h2>
            <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold">{ventes && ventes.reduce((total, offre) => total + offre.nombreVentes, 0)}</span>
            <span>Ventes réalisées</span>
            </div>
            </div>

          </div>

            </div>
         



        </div>
      </div>
    </div>
  );
}
