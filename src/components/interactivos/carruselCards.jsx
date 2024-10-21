import React, { useState, useEffect  } from "react";
import IconTijeras from "../icons/tijerasIcon.jsx"
import IconNext from "../icons/nextIcon.jsx"
import PrevNext from "../icons/prevIcon.jsx"
const items = [
  {
    title: "Corte 1",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/05/19/16529550110272.jpg",
    href: "/7-Citas"
},
{
    title: "Corte 2",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947631837896.jpg",
    href: "/7-Citas"
},
{
    title: "Corte 3",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947632993565.jpg",
    href: "/7-Citas"
},
{
    title: "Cortes con grecas o líneas",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947631376861.jpg",
    href: "/7-Citas"
},
{
    title: "Corte Samurai Bun",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947631837896.jpg",
    href: "/7-Citas"
},
{
    title: "Corte Crop con flequillo",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947632993565.jpg",
    href: "/7-Citas"
},
{
    title: "Cortes con grecas o líneas",
    description: "Tiene un desvanecido en los laterales y con pelo pronunciado",
    image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/09/15/16947631376861.jpg",
    href: "/7-Citas"
}
];

const Carrusel = ({ params: { 
  timeSlider = 5000, 
  visibleItemsDefault = 3,
  title = "Titulo del carrusel",
  colorTitle = "black",
  colorButtonPrevNext = "black",
  sizeButtosPrevNext = "40",


} }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(visibleItemsDefault); 
  const [changeWithTime, setChangeWithTime] = useState(false);

  // Ajustar la cantidad de items visibles dependiendo del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Pantallas pequeñas (móviles), mostramos solo 1
        setVisibleItems(1);
      } else {
        // Pantallas más grandes, mostramos el número predeterminado o el que se pase como prop
        setVisibleItems(visibleItemsDefault);
      }
    };

    // Ejecutar la función de redimensionamiento al cargar la página
    handleResize();

    // Agregar un listener para detectar cambios en el tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleItemsDefault]);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleItems >= items.length ? 0 : prevIndex + visibleItems
    );
  };

  // Cambiar automáticamente con el tiempo usando el parámetro `timeSlider`
  useEffect(() => {
    const interval = setTimeout(() => {
      handleNext();
      setChangeWithTime(!changeWithTime);
    }, timeSlider);

    // Limpiar el timeout al desmontar
    return () => clearTimeout(interval);
  }, [changeWithTime, timeSlider]);

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleItems < 0 ? items.length - visibleItems : prevIndex - visibleItems
    );
  };

  return (
    <div className="py-8">
      <h3 className={`text-2xl ${colorTitle} font-bold text-center mb-2`}>
        {title}
      </h3>

      {/* Contenedor del carrusel */}
      <div className="flex items-center justify-center mb-8">
        {/* Botón Prev */}
        <button onClick={handlePrev} className="mx-2">
          <PrevNext   params={{ color: colorButtonPrevNext, size: sizeButtosPrevNext}}/>
        </button>

        {/* Carrusel de items */}
        <div className={` gap-4 flex-1 max-w-4xl flex flex-row`}>
          {items.slice(startIndex, startIndex + visibleItems).map((item, index) => (
            <a
              href={item.href}
              className="group max-w-xs bg-customColor6  rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-customColor4 transition-shadow duration-300 translate-y-10 card"
              style={{ animationDelay: `${index * 0.5}s` }}
              key={index}
            >
              <div className="relative aspect-[4/4]">
                <img
                  loading="eager"
                  width="700"
                  height="700"
                  src={item.image}
                  alt="placeholder"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="py-4 px-5 border-t">
                <p className="font-semibold text-lg text-foreground mb-2">{item.title}</p>
                <p className="text-sm text-muted-foreground/85 mb-4">{item.description}</p>
                <button className="bg-customColor8 hover:bg-customColor5 hover:text-black text-white font-bold py-2 px-4 rounded flex items-center flex-row content-center">
                  <span>Solicitar cita</span> &nbsp;<IconTijeras />
                </button>
              </div>
            </a>
          ))}
        </div>

        {/* Botón Next */}
        <button onClick={handleNext} className="mx-2">
          <IconNext  params={{ color: colorButtonPrevNext, size: sizeButtosPrevNext}}/>
        </button>
      </div>
    </div>
  );
};

export default Carrusel;