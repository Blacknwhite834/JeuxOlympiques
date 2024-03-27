"use client"
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

// Assurez-vous d'avoir le fichier qr-scanner-worker.min.js dans votre dossier public
QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

export default function Scanner() {
    const { data: session, status } = useSession();
    
    
    const [qrResult, setQrResult] = useState('');
    const [scanError, setScanError] = useState('');
    const [offre, setOffre] = useState(null);
    const [venteDate, setVenteDate] = useState(null);
    const [user, setUser] = useState(null);
    const [scanning, setScanning] = useState(false);
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);



    
    useEffect(() => {
        
        qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => handleScan(result),
            (error) => setScanError(`QR error: ${error}`)
            );
            
            return () => qrScannerRef.current?.stop();
        }, []);
        
        const startScan = () => {
            setScanning(true);
            qrScannerRef.current.start();
        };
        
        const handleScan = (qrCodeData) => {
            fetch('/api/decryptQR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrData: qrCodeData }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setScanError(data.error);
                } else {
                    setQrResult(JSON.stringify(data));
                    setOffre(data.offre);
                    setUser(data.user);
                    setVenteDate(data.venteDate);
                    setScanning(false);
                    qrScannerRef.current.stop(); // Arrête la caméra après la détection du QR Code
                }
            })
            .catch((error) => {
                setScanError(`Erreur lors de la détection du QR Code: ${error}`);
            });
        };
        
        const handleFileChange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                QrScanner.scanImage(file)
                .then(handleScan)
                .catch((error) => setScanError(`Erreur lors du scan du fichier: ${error}`));
            }
        };


        
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-5">
        <div className="flex justify-center items-center flex-col bg-zinc-100 p-5 rounded-lg shadow-lg gap-5">
            <Link href="/">
    <img src="/logo.png" alt="Paris 2024" className="w-[100px] md:w-[140px] lg:w-[160px] h-[100px] md:h-[140px] lg:h-[160px]" />
    </Link>
            {!qrResult ? (
                <>
                <h1 className="text-2xl font-bold">Scannez le QR Code</h1>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <p>ou</p>
                <button onClick={startScan} className='bg-blue-500 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded transition duration-300'>Démarrer le scan avec la caméra</button>
                {/* <button onClick={() => setScanning(false)}>Arrêter le scan</button> */}
                </>
            ) : (
                <button onClick={() => setQrResult('')} className='bg-blue-500 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded transition duration-300'>Nouveau scan</button>
            )
        }

            <div className={!scanning ? 'hidden' : 'flex flex-col gap-5'}>
            <video ref={videoRef} ></video>
            </div>
            {/* Résultats et erreurs */}

      <div className="scan-result flex justify-center items-center flex-col gap-5">
        
        {offre && qrResult && (
          <div className='flex justify-center items-center flex-col gap-3'>
            <h1 className='text-2xl font-bold'>Résultat du scan:</h1>
            <p>Offre: <span className='font-bold'>{offre.title}</span></p>
            <p>Prix: <span className='font-bold'>{offre.prix} €</span></p>
            <p>Nombre de billets: <span className='font-bold'>{offre.nombre}</span></p>
          </div>
        )}
        {venteDate && qrResult && (
            <div className='flex justify-center items-center flex-col gap-3'>
                <h2 className='text-2xl font-bold'>Date de la vente:</h2>
                <p>{new Date(venteDate).toLocaleString()}</p>
            </div>
        )}
        {user && qrResult && (
          <div className='flex justify-center items-center flex-col gap-3'>
            <h2 className='text-2xl font-bold'>Informations personnelles:</h2>
            <p>Email: <span className='font-bold'>{user.email}</span></p>
            <p>Nom: <span className='font-bold'>{user.name}</span></p>
          </div>
        )}
        
        {/* {scanError && <p className="error">{scanError}</p>} */}
      </div>
      </div>
    </div>
  );
}
