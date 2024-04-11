"use client"
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import Header from "@/app/components/header";

export default function SuccessPage() {
    const router = useRouter();
    const { venteId } = useParams();

    const [qrData, setQrData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [offre, setOffre] = useState({});
    const [error, setError] = useState('');
    const qrRef = useRef(null);

    useEffect(() => {
        const fetchKeys = async () => {
            if (venteId) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/retrieveKeys/${venteId}`);
                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setQrData(data.qrData);
                    setOffre(data.offre);
                    // console.log(data.qrData);
                    // console.log(data.offre);
                } catch (err) {
                    setError(err.message || 'An error occurred');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchKeys();
    }, [venteId]);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;


    return (
        <div className="flex flex-col items-center justify-center">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>

            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5">Merci !</h1>
            <main className="flex-grow w-full flex justify-center items-center flex-col xl:flex-row">
                <div className="flex flex-col justify-center items-center gap-5 sm:gap-10 mt-5 sm:mt-16 px-10 h-full">
                    <div className="bg-zinc-100 rounded-[30px] p-10 shadow-md">
                    <QRCodeCanvas value={qrData} level={"H"} canvasprops={{ qrRef }} alt="QR Code"  />
                    </div>
                <p className="text-center">Voici votre billet électronique. <br/>Présentez ce code QR à l'entrée de l'événement.</p>
                {/* <button className="bg-black text-white px-5 py-3 rounded-full hover:bg-opacity-70 transition duration-300" onClick={downloadQR}>Télécharger le code QR</button> */}
                </div>

        
            <div className="bg-zinc-100 rounded-lg p-5 sm:p-10 flex flex-col gap-3 w-fit mt-5">
            <h2 className="text-2xl font-bold">Votre commande</h2>
            
            <div className="h-0.5 bg-black my-2"></div>
            <div className="flex justify-between">
            <p>Offre: </p><span className="font-bold">{offre.title}</span>
            </div>
            <div className="h-0.5 bg-zinc-300"></div>
            <div className="flex justify-between">
            <p>Nombre de billet(s): </p><span className="font-bold">{offre.nombre}</span>
            </div>
            <div className="h-0.5 bg-zinc-300"></div>
            <div className="flex justify-between">
            <p>Prix: </p>
            <span className="font-bold">{offre.prix}€</span>
            </div>
            </div>
      
            </main>
        </div>
    );
}