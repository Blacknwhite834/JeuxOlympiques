import gsap from "gsap";
import React, { useEffect } from "react";

export default function Card({ title, description, image, textColor, inverse = false }) {

  useEffect(() => {
    gsap.utils.toArray('.image-left').forEach(element => {
      gsap.fromTo(element, 
        { x: '-5%' }, 
        {
          x: 0, 
          opacity: 1,
          duration: 1, 
          stagger: 0.3,
          scrollTrigger: {
            trigger: element,
            start: 'top 75%',
            end: 'bottom top',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    gsap.utils.toArray('.image-right').forEach(element => {
      gsap.fromTo(element, 
        { x: '5%' }, 
        {
          x: 0, 
          opacity: 1,
          duration: 1, 
          stagger: 0.3,
          scrollTrigger: {
            trigger: element,
            start: 'top 75%',
            end: 'bottom top',
            toggleActions: 'play none none none',
          }
        }
      );
    });

  }, []);
    
  const containerClasses = `w-full h-fit flex items-center  ${inverse ? "flex-col 2xl:flex-row-reverse image-right opacity-0" : "flex-col 2xl:flex-row image-left opacity-0"}`;

  return (
    <div className={containerClasses}>
      <div className={`"w-full flex  px-3 2xl:px-0 " ${inverse ? "justify-center 2xl:justify-end" : "justify-center 2xl:justify-start"}`}>
      <img src={image} alt={title} className="w-fit rounded-[10px] sm:rounded-[50px] 2xl:rounded-none" loading="lazy" />
      </div>
      <div className="px-5 sm:px-10 w-full flex flex-col justify-center gap-3 sm:gap-5 text-center 2xl:text-left mt-3 sm:mt-5 2xl:mt-0">
      <h2 className="text-2xl sm:text-4xl font-bold text-sky-600 text-gsap" style={textColor}>{title}</h2>
      <p className="text-black text-base sm:text-2xl text-gsap">{description}</p>
      </div>
    </div>
  );
}