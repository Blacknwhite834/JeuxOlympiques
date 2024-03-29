import { CartProvider } from "./CartContext";
import Provider from "./Provider";
import StripeProvider from "./StripeProvider";
import "./globals.css";


export const metadata = {
  title: "Jeux Olympiques France 2024",
  description: "Les Jeux Olympiques de Paris 2024",
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
