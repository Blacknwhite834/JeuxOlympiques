import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation'; // Importer next/router au lieu de next/navigation
import { SessionProvider } from 'next-auth/react';
import Register from "../../register/page";
import { CartProvider } from "../../CartContext";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

const mockPush = jest.fn();

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: 'Utilisateur créé avec succès' }),
    })
);

describe('Register Component Tests', () => {

    test('affichage du formulaire d\'inscription', () => {
        render(
            <SessionProvider session={null}>
                <CartProvider>
                    <Register />
                </CartProvider>
            </SessionProvider>
        );

        expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirmer mot de passe')).toBeInTheDocument();
        expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
    });

    test('inscription avec des informations valides', async () => {
        render(
            <SessionProvider session={null}>
                <CartProvider>
                    <Register />
                </CartProvider>
            </SessionProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'john@mail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Confirmer mot de passe'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('S\'inscrire'));

         waitFor(() => {
            expect(screen.getByText('Utilisateur créé avec succès')).toBeInTheDocument();
            expect(mockPush).toHaveBeenCalledWith('/login');
        });

        

    });
});