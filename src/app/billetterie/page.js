import Footer from "../components/footer";
import Header from "../components/header";

export default function Billetterie() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>
            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Découvrez nos offres</h1>
            <main className="flex-grow w-full flex justify-center items-center">
            <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-5 sm:gap-16 mt-5 sm:mt-16 px-10 h-full">

                <div className="flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 border-sky-600 py-5 sm:py-10 px-5 shadow-xl">
                    <h1 className="text-2xl sm:text-4xl text-black font-bold text-center">Solo</h1>
                    <p className="text-black text-center text-base sm:text-2xl ">Idéal pour les fans inconditionnels, le forfait Solo vous offre un accès exclusif pour vivre les Jeux Olympiques de manière intime. Plongez au cœur de l'action et soutenez vos athlètes préférés.</p>
                    <button className="text-white rounded-full bg-sky-600 px-5 py-3 text-base sm:text-xl font-bold"><span className="font-normal">Prix pour 1 billet:</span> 50€</button>
                </div>

                <div className="flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 border-rose-600 py-5 sm:py-10 px-5 shadow-xl">
                    <h1 className="text-2xl sm:text-4xl text-black font-bold text-center">Duo</h1>
                    <p className="text-black text-center text-base sm:text-2xl">Doublez le plaisir avec notre forfait Duo. Profitez des moments inoubliables des Jeux Olympiques avec un ami ou un être cher. Parfait pour vivre ensemble l'intensité et l'émotion des compétitions.</p>
                    <button className="text-white rounded-full bg-rose-600 px-5 py-3 text-base sm:text-xl font-bold"><span className="font-normal">Prix pour 2 billets:</span> 100€</button>
                </div>

                <div className="flex flex-col justify-between items-center gap-5 sm:gap-10 xl:gap-16 rounded-[30px] sm:rounded-[50px] border-8 border-amber-400 py-5 sm:py-10 px-5 shadow-xl">
                    <h1 className="text-2xl sm:text-4xl text-black font-bold text-center">Familiale</h1>
                    <p className="text-black text-center text-base sm:text-2xl">Embarquez pour une aventure familiale inoubliable avec notre forfait Familial. Avec 4 billets inclus, c'est l'occasion parfaite de faire découvrir à toute la famille l'esprit et les valeurs olympiques.</p>
                    <button className="text-white rounded-full bg-amber-400 px-5 py-3 text-base sm:text-xl font-bold"><span className="font-normal">Prix pour 4 billets:</span> 200€</button>
                </div>

            </div>
            </main>

            <Footer />
        </div>
    )
}