import Image from "next/image";
import Homepage from "./components/home/homepage";
import Header from "./components/header";
import PresentationJO from "./components/home/presentationJO";
import Epreuves from "./components/home/epreuves";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <Homepage />
      <PresentationJO />
      <Epreuves />
    </main>
  );
}
