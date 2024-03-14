"use client";
import { useState } from "react";

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (isOpen) {
            document.getElementById("menu").classList.add("hidden");
            document.getElementById("menu").classList.remove("flex");
            setIsOpen(false);
        } else {
            document.getElementById("menu").classList.add("flex");
            document.getElementById("menu").classList.remove("hidden");
            setIsOpen(true);
        }
    };
  return (
    <div>

    <div className={`border rounded-full p-4 border-white ${isOpen ? "border border-black z-50": ""}`} onClick={handleClick}>
    <div className="w-5 h-5 flex flex-col justify-between items-center cursor-pointer " >
      <div className={`w-7 h-0.5 bg-white ${isOpen ? "transform rotate-45 translate-y-2 z-50 bg-black" : ""}`}></div>
      <div className={`w-6 h-0.5 bg-white ${isOpen ? "hidden" : ""}`}></div>
      <div className={`w-7 h-0.5 bg-white ${isOpen ? "transform -rotate-45 -translate-y-2 z-50 bg-black" : ""}`}></div>
    </div>
    </div>

        <div className="absolute w-full h-screen bg-white z-40 top-0 left-0 hidden" id="menu">
            <div className="flex flex-col justify-center items-center w-full h-full gap-3">
                <img src="/logo.png" alt="Paris 2024" className="w-[100px] h-[100px]" />
                <a href="/" className="text-black text-4xl border-t-2 border-black pt-2">Accueil</a>
                <a href="/" className="text-black text-4xl">Billetterie</a>
                <a href="/" className="text-black text-4xl">Contact</a>
            </div>
        </div>


    </div>
  );
}