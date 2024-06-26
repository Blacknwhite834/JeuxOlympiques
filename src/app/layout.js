import React from "react";
import { CartProvider } from "./CartContext";
import Provider from "./Provider";
import StripeProvider from "./StripeProvider";
import "./globals.css";


export const metadata = {
  title: "Jeux Olympiques France 2024",
  description: "Les Jeux Olympiques de Paris 2024",
  verification: {
    google: 'J8M4l48WlK_IMGyT3MGNRB6mLEeH0SNI4q8MIAJ4J3M',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" >
      <Provider >
        <CartProvider>
          <StripeProvider>
            <body className="font-play">{children}</body>
          </StripeProvider>
        </CartProvider>
      </Provider>
    </html>
  );
}
