"use client";

import React, { useEffect } from "react";
import Homepage from "./components/home/homepage";
import PresentationJO from "./components/home/presentationJO";
import Epreuves from "./components/home/epreuves";
import Footer from "./components/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    gsap.utils.toArray('.text-gsap').forEach(element => {
      gsap.to(element, {
        y: 0,
        opacity: 1,
        stagger: 0.2, 
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        }
      });
    });

  }, []);

  return (
    <div className="h-fit w-full">
      <Homepage />
      <PresentationJO />
      <Epreuves />
      <Footer />
    </div>
  );
}
