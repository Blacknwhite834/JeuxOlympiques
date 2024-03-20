"use client";
import { redirect } from 'next/dist/server/api-utils';
// login page front
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      // Rediriger l'utilisateur vers la page protégée
      window.location.href = '/hello';
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Utilisez signIn de NextAuth pour gérer la connexion
    const result = await signIn('credentials', { redirect: false, email, password });

    if (result?.error) {
      // Si signIn retourne une erreur, affichez-la
      setMessage(result.error);
    } else {
      // Si tout va bien, redirigez vers la page protégée
      router.replace('/hello');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
