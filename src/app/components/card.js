export default function Card({ title, description, image, textColor, inverse = false }) {
    const containerClasses = `w-full h-fit flex items-center 2xl:items-start ${inverse ? "flex-col 2xl:flex-row-reverse" : "flex-col 2xl:flex-row"}`;

  return (
    <div className={containerClasses}>

      <img src={image} alt={title} className="w-fit rounded-[50px] 2xl:rounded-none px-3" />

      <div className="px-10 w-full flex flex-col justify-center gap-5 text-center 2xl:text-left mt-5 2xl:mt-0">
      <h2 className="text-2xl sm:text-4xl font-bold text-sky-600" style={textColor}>{title}</h2>
      <p className="text-black text-base sm:text-2xl">{description}</p>
      </div>
    </div>
  );
}