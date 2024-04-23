"use client"
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import gsap from "gsap";

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

    useEffect(() => {
        gsap.to(".gsap", {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            stagger: 0.2
        })
    })

    if (isLoading) return (
        <div className="flex flex-col min-h-screen justify-center items-center">
        <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
    )

    if (error) return <p>Error</p>;


    return (
        <div className="flex flex-col min-h-screen">
            <Header bgColor="bg-black" color={{ color: "black" }} borderColor="border-black"/>

            <h1 className="text-4xl sm:text-6xl xl:text-8xl text-black font-bold text-center px-5 gsap opacity-0">Merci !</h1>
            <main className="flex-grow w-full flex justify-center items-center flex-col xl:flex-row">
                <div className="flex flex-col justify-center items-center gap-5 sm:gap-10 mt-5 sm:mt-16 px-10 h-full">
                    <div className="bg-zinc-100 rounded-[30px] p-10 shadow-md gsap opacity-0">
                    <QRCodeCanvas value={qrData} level={"H"} canvasprops={{ qrRef }} alt="QR Code"  />
                    </div>
                <p className="text-center gsap opacity-0">Voici votre billet électronique. <br/>Présentez ce code QR à l'entrée de l'événement.</p>
                {/* <button className="bg-black text-white px-5 py-3 rounded-full hover:bg-opacity-70 transition duration-300" onClick={downloadQR}>Télécharger le code QR</button> */}
                </div>

        
            <div className="bg-zinc-100 rounded-lg p-5 sm:p-10 flex flex-col gap-3 w-fit mt-5 gsap opacity-0 -translate-x-5">
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

            <Footer />
        </div>
    );
}