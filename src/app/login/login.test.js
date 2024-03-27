import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { SessionProvider, getSession } from 'next-auth/react';
import Login from "./page";
import {useSession} from "next-auth/react";
import { CartProvider } from "../CartContext";
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    ...jest.requireActual('next-auth/react'), // Conserver les implémentations réelles pour les autres fonctions
    signIn: jest.fn(), // Simuler signIn
    getSession: jest.fn() // Simuler getSession
  }));

  beforeEach(() => {
    signIn.mockResolvedValue({ error: null }); // Simuler un retour réussi pour signIn
    getSession.mockResolvedValue({
      user: { role: 'ADMIN' }, // Simuler une session avec un utilisateur admin
      expires: '2024-05-27T14:00:00.000Z'
    });
  });


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));;

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

  
describe('Login Component Tests', () => {
    test('affichage du formulaire de connexion', () => {
      render(
        <SessionProvider session={null}>
            <CartProvider>
                <Login />
            </CartProvider>
        </SessionProvider>
      );
  
      expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
      expect(screen.getByText('Se connecter')).toBeInTheDocument();
    });
  
test('connexion avec des identifiants valides', async () => {
        render(
            <SessionProvider session={null}>
                <CartProvider>
                    <Login />
                </CartProvider>
            </SessionProvider>
            );
  
      fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'password' } });
      fireEvent.click(screen.getByText('Se connecter'));
  
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('credentials', {
          redirect: false,
          email: 'test@example.com',
          password: 'password',
          callbackUrl: null,
        });
        // Ici, vous pouvez ajouter plus de vérifications, comme la redirection ou l'affichage de messages d'erreur
      });
    });
  });