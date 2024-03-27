"use client";
// login page front
import React from 'react';
import { useEffect, useState } from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const callbackUrl = localStorage.getItem('redirectAfterLogin'); // Utiliser la page d'accueil comme fallback
    const result = await signIn('credentials', {
      redirect: false, // Gérer manuellement la redirection
      email, 
      password,
      callbackUrl,
    });
  
    if (result?.error) {
      setMessage('Email ou mot de passe incorrect');
    } else {
      // Redirection vers la page souhaitée
      const session = await getSession();
      if (session.user.role === 'ADMIN' || session.user.role === 'ORGANISATEUR') {
        router.push('/dashboard');
      } else if (session.user.role === 'EMPLOYE') {
        router.push('/scanner');
      } else {
        router.push(callbackUrl);
        
      } 

    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
      <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Veuillez vous connecter</h1>
      <main className="flex-1 flex justify-center items-center">
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center sm:items-start gap-5 w-full sm:w-fit px-5 sm:px-0 mt-5 sm:mt-10'>
      {message && <p className=' text-red-500 font-bold text-base'>{message}</p>}
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className='py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl'/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required className='py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl'/>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-3 w-full'>
        <button type="submit" className='bg-black text-white px-10 py-2 rounded-md w-full hover:bg-opacity-70 transition duration-300'>Se connecter</button>
        <Link href="/register" className='text-black p-2 rounded-md text-nowrap hover:underline'>Créer un compte ?</Link>
        </div>
      </form>
      </main>

      <Footer />
    </div>
  );
}
