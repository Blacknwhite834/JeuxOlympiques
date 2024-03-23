"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode.react";

export default function SuccessPage() {
    const router = useRouter();
    const { venteId } = useParams();

    const [qrData, setQrData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
        <div>
            <h1>Success Page</h1>
            <QRCode value={qrData} size={256} level={"H"} />
        </div>
    );
}