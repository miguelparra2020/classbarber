import React, { useState, useEffect  } from "react";
import IconGeneral from "../icons/IconGeneral.jsx"
import IconNext from "../icons/nextIcon.jsx"
import PrevNext from "../icons/prevIcon.jsx"


const Carrusel = ({ params: { 
  timeSlider = 5000, 
  visibleItemsDefault = 3,
  title = "Titulo del carrusel",
  colorTitle = "black",
  colorButtonPrevNext = "black",
  sizeButtosPrevNext = "40",
  backgroundColorCard = "bg-customColor6",
  borderRadiusCard = "rounded-lg",
  shadowCard = "shadow-lg",
  shadowCardHover = "hover:shadow-2xl",
  shadowCardColor = "shadow-customColor6",
  shadowCardColorHover = "hover:shadow-customColor5",
  colorTitleCard = "text-gray-800",
  sizeTitleCard = "text-2xl",
  colorDescriptionCard = "text-gray-600",
  sizeDescriptionCard = "text-sm",
  colorButtonCard= "bg-customColor8",
  colorButtonCardHover= "hover:bg-customColor5",
  colorButtonCardText= "text-white",
  colorButtonCardTextHover = "hover:text-gray-800",
  borderRadiusCardButton = "rounded",
  colorIcon = "black", 
  sizeIcon = "40", 
  classNameIcon = "bi bi-arrow-right-circle-fill", 
  viewBoxIcon ="0 0 16 16",  
  pathIcon = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z",
  itemsCardsProps = [
    {
      title: "Card 1",
      description: "Descripcion 1",
      image: "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
      href: "/1-Inicio",
      textButton: "Acción boton"
  },
  {
    title: "Card 2",
    description: "Descripcion 2",
    image: "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
    href: "/1-Inicio",
    textButton: "Acción boton"
},
{
  title: "Card 3",
  description: "Descripcion 3",
  image: "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
  href: "/1-Inicio",
  textButton: "Acción boton"
},
{
  title: "Card 4",
  description: "Descripcion 4",
  image: "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
  href: "/1-Inicio",
  textButton: "Acción boton"
},
  ]


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
      prevIndex + visibleItems >= itemsCardsProps.length ? 0 : prevIndex + visibleItems
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
      prevIndex - visibleItems < 0 ? itemsCardsProps.length - visibleItems : prevIndex - visibleItems
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
        <div className={` gap-4 flex-1 max-w-4xl flex flex-row items-center justify-center  `}>
          {itemsCardsProps.slice(startIndex, startIndex + visibleItems).map((item, index) => (
            <a
              href={item.href ? item.href : "1-Inicio"}
              className={`group max-w-xs 
                ${backgroundColorCard}  
                ${borderRadiusCard}  
                overflow-hidden 
                ${shadowCard}
                ${shadowCardHover}
                ${shadowCardColor}
                ${shadowCardColorHover} transition-shadow duration-300 translate-y-10 card`}
              style={{ animationDelay: `${index * 0.5}s` }}
              key={index}
            >
              <div className="relative aspect-[4/4]">
                <img
                  loading="eager"
                  width="700"
                  height="700"
                  src={item.image ? item.image : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png"}
                  alt="Imagen Card"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="py-4 px-5 border-t">
                <p className={`font-semibold text-foreground mb-2 
                ${sizeTitleCard} 
                ${colorTitleCard}                
               `}>{item.title ? item.title : "Titulo Card"}</p>
                <p className={`text-muted-foreground/85 mb-4
                ${sizeDescriptionCard}
                ${colorDescriptionCard}
                `}>{item.description ? item.description : "Descripción Card"}</p>
                <button className={`
                  ${colorButtonCard}
                  ${colorButtonCardHover}
                  ${colorButtonCardText}
                  ${colorButtonCardTextHover}
                  ${borderRadiusCardButton}
                   font-bold py-2 px-4 flex items-center flex-row content-center`}>
                  <span>{item.textButton ? item.textButton : "Botón Card" }</span> &nbsp;<IconGeneral
                    params={{ color: colorIcon, 
                      size: sizeIcon, 
                      className: classNameIcon, 
                      viewBox: viewBoxIcon,  
                      path: pathIcon }}/>
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