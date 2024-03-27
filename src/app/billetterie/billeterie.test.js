import React, { use } from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Billetterie from './page';
import { CartProvider } from '../CartContext';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

const mockOffres = [
  { id: '1', title: 'Offre 1', description: 'Description 1', prix: 100, nombre: 2 },
];

const mockPush = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockOffres),
  })
);

describe('Billetterie Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  test('affiche les offres disponibles', async () => {
    const { findByText } = render(
    <SessionProvider session={null}>
      <CartProvider>
        <Billetterie />
      </CartProvider>
        </SessionProvider>
    );

    for (const offre of mockOffres) {
      expect(await findByText(offre.title)).toBeInTheDocument();
      expect(await findByText(offre.description)).toBeInTheDocument();
    expect(await findByText(`Prix pour ${offre.nombre} billets:`)).toBeInTheDocument();
    }
  });

  test('ajoute une offre au panier et redirige vers le panier', async () => {
    const { findByText } = render(
        <SessionProvider session={null}>
      <CartProvider>
        <Billetterie />
      </CartProvider>
        </SessionProvider>
    );

    const button = await findByText(`Prix pour ${mockOffres[0].nombre} billets:`);
    fireEvent.click(button);

    // redirige vers le panier
    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/panier');
    });
   
    });
});
