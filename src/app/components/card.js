import React from "react";

export default function Card({ title, description, image, textColor, inverse = false }) {
    const containerClasses = `w-full h-fit flex items-center  ${inverse ? "flex-col 2xl:flex-row-reverse" : "flex-col 2xl:flex-row"}`;

  return (
    <div className={containerClasses}>
      <div className="w-full flex justify-center 2xl:justify-start px-3 2xl:px-0">
      <img src={image} alt={title} className="w-fit rounded-[30px] sm:rounded-[50px] 2xl:rounded-none" loading="lazy" />
      </div>
      <div className="px-5 sm:px-10 w-full flex flex-col justify-center gap-3 sm:gap-5 text-center 2xl:text-left mt-3 sm:mt-5 2xl:mt-0">
      <h2 className="text-2xl sm:text-4xl font-bold text-sky-600" style={textColor}>{title}</h2>
      <p className="text-black text-base sm:text-2xl">{description}</p>
      </div>
    </div>
  );
}