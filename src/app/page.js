import Image from "next/image";
import Homepage from "./components/home/homepage";
import Header from "./components/header";
import PresentationJO from "./components/home/presentationJO";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <Homepage />
      <PresentationJO />
    </main>
  );
}
