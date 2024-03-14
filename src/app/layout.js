import "./globals.css";


export const metadata = {
  title: "Jeux Olympiques France 2024",
  description: "Les Jeux Olympiques de Paris 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-play">{children}</body>
    </html>
  );
}
