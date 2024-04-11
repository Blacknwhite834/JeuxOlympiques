// test pour la génération du QRCode

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as Navigation from 'next/navigation';
import SuccessPage from "@/app/checkout/success/[venteId]/page";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/app/CartContext";

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
  }));
  
describe('SuccessPage Component', () => {
    beforeEach(() => {ç
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ qrData: 'some-qr-data', offre: { title: 'Ticket', nombre: 1, prix: 100 } }),
          })
        );

        Navigation.useParams.mockReturnValue({ venteId: '123' });
      });
  
    it('renders the QR code with fetched data', async () => {
      render(
        <SessionProvider session={null}>
            <CartProvider>
                <SuccessPage />
            </CartProvider>
      </SessionProvider>
    );
  
     await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
  
      await waitFor(() => {
        expect(screen.getByText('Merci !')).toBeInTheDocument();
        expect(screen.getByText('Ticket')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); 
        expect(screen.getByText('100€')).toBeInTheDocument(); 
      });
    });
  });