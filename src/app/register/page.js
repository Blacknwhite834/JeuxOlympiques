"use client";
// pages/register.js
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // Gérer le cas d'une réponse non satisfaisante ici, par exemple :
      setMessage('Une erreur est survenue lors de l\'inscription.');
      return;
    }

    try {
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      // Gérer l'erreur si la réponse ne peut pas être convertie en JSON
      console.error('Erreur lors de la conversion de la réponse en JSON:', error);
      setMessage('Une erreur est survenue lors de l\'obtention de la réponse.');
    }
  }

  return (
    <div>
      <h2>Inscription</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
