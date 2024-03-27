import Homepage from "./components/home/homepage";
import PresentationJO from "./components/home/presentationJO";
import Epreuves from "./components/home/epreuves";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="h-fit w-full">
      <Homepage />
      <PresentationJO />
      <Epreuves />
      <Footer />
    </div>
  );
}
