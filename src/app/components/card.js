export default function Card({ title, description, image, textColor, inverse = false }) {
    const containerClasses = `w-full h-fit flex ${inverse ? "flex-row-reverse" : "flex-row"}`;

  return (
    <div className={containerClasses}>

      <img src={image} alt={title} className="w-fit" />

      <div className="px-10 w-full flex flex-col justify-center gap-5">
      <h2 className="text-4xl font-bold text-sky-600" style={textColor}>{title}</h2>
      <p className="text-black text-2xl">{description}</p>
      </div>
    </div>
  );
}