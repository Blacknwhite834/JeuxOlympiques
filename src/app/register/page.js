"use client";
// pages/register.js
import React from 'react';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const router = useRouter();

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage('Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial et faire au moins 8 caractères de longueur.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
      
    });
    console.log('email ' + email)
    console.log('name ' + name)

    if (!response.ok) {
      setMessage('Une erreur est survenue lors de l\'inscription.');
      return;
    }

    try {
      const data = await response.json();
      setMessage(data.message);
      router.push('/login');
      console.log(" user created successfully")
    } catch (error) {
      console.error('Erreur lors de la conversion de la réponse en JSON:', error);
      setMessage('Une erreur est survenue lors de l\'obtention de la réponse.');
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
      <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Veuillez vous inscrire</h1>
      <main className="flex-1 flex justify-center items-center flex-col">
        <p className='text-black text-base font-normal'>Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial et faire au moins 8 caractères de longueur.</p>
        {message && <p className=' text-red-500 font-bold text-base'>{message}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center sm:items-start gap-5 w-full sm:w-fit px-5 sm:px-0 mt-5'>
        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required className='py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl'/>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className='py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl'/>
        <div className="relative">
  <input
    type="password"
    placeholder="Mot de passe"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      setIsPasswordValid(checkPasswordStrength(e.target.value));
    }}
    required
    className="py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl"
  />
  {isPasswordValid ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )}
</div>
<div className="relative">
<input
    type="password"
    placeholder="Confirmer mot de passe"
    onChange={(e) => {
      setConfirmPassword(e.target.value);
      setIsPasswordMatch(password === e.target.value);
    }}
    required
    className="py-2 w-full sm:w-fit px-5 pr-0 sm:pr-56 border-2 border-black rounded-full placeholder:text-black text-base sm:text-xl"
  />
  {isPasswordMatch ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )}
  </div>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-3 w-full'>
        <button type="submit" className='bg-black text-white px-10 py-2 rounded-md w-full hover:bg-opacity-70 transition duration-300'>S'inscrire</button>
        <Link href="/login" className='text-black p-2 rounded-md text-nowrap hover:underline'>Retourner en arrière</Link>
        </div>
      </form>
      </main>

      <Footer />
    </div>
  );
}
