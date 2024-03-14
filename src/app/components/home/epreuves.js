import Image from "next/image";
import Card from "../card";

export default function Epreuves() {
    return (
        <div className="h-[calc(100dvh)] w-full">
            <h1 className="text-center text-black text-4xl sm:text-6xl xl:text-8xl font-bold">Les épreuves</h1>

            <div className="mt-5 sm:mt-24 flex flex-col gap-16">
            <Card title="100 mètres masculin" description="Le 100 mètres est l'épreuve reine de l'athlétisme, symbolisant la quête de l'homme le plus rapide du monde. Dans une explosion de puissance et de vitesse, les athlètes s'affrontent sur la distance la plus courte et la plus électrisante des Jeux, captivant le public mondial par leur performance fulgurante." image="/image1.jpg" textColor={{ color: "sky" }} />
            <Card inverse={true} title="Saut en hauteur féminin" description="Le saut en hauteur est une épreuve d'athlétisme qui consiste à franchir une barre transversale placée à une hauteur maximale sans l'aide d'aucun appareil. Les athlètes doivent sauter par-dessus la barre en prenant leur impulsion à partir d'une course d'élan." image="/image2.jpg" textColor={{ color: "#FCAB21" }} />
            <Card title="Natation - 200 mètres nage libre hommes" description="Le 200 mètres nage libre est une épreuve phare de la natation qui met à l'épreuve la vitesse et l'endurance des nageurs. Dans cette course palpitante, les athlètes doivent parfaitement doser leur effort sur quatre longueurs de bassin, faisant de cette compétition un spectacle fascinant de tactique et de puissance." image="/image3.jpg" textColor={{ color: "#EC213E" }} />
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-5 px-5 mt-16">
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center">Et bien plus encore !</h1>
            <Image src="/logoOlympique.png" alt="Paris 2024" width={100} height={100} />
            </div>
        </div>
    );
}