
import IconGeneral from "../icons/IconGeneral.jsx"
import { useState, useEffect } from "react";

const MenuMovil = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    // Detectar el tamaño de la vista
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        
        // Agregar el evento para cambiar el estado si el tamaño de la pantalla cambia
        window.addEventListener("resize", handleResize);

        // Eliminar el evento al desmontar el componente
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile) return null;

    const currentPath = window.location.pathname;
    return (
        <div class="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2">
             <div class="w-full">
                <div class="grid max-w-xs grid-cols-4	 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg " role="group">
                    <a href="/1-Inicio" type="button" class={`flex flex-row items-center content-center 
                        text-center px-3 py-1.5 text-xs font-medium
                         ${currentPath === "/1-Inicio" ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"}
                        rounded-lg`}>
                        <IconGeneral
                        params={{ 
                            color: "currentColor", 
                            size: "16", 
                            className: "bi bi-house-door-fill", 
                            viewBox: "0 0 16 16", 
                            path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" 
                        }} 
                        /> &nbsp;Inicio
                    </a>
                    <a href="/7-Citas" type="button" class={`flex flex-row items-center content-center text-center px-3 py-1.5 text-xs 
                    font-medium  ${currentPath === "/7-Citas" ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} rounded-lg`}>
                        <IconGeneral 
                        params={{ 
                            color: "currentColor", 
                            size: "16", 
                            className: "bi bi-calendar-week-fill", 
                            viewBox: "0 0 16 16", 
                            path: "M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" 
                        }} 
                        /> &nbsp;Citas
                    </a>
                    <a href="/3-Media" type="button" class={`flex flex-row items-center content-center text-center px-1 py-1.5 
                    text-xs font-medium ${currentPath === "/3-Media" ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        <IconGeneral 
                        params={{ 
                            color: "currentColor", 
                            size: "16", 
                            className: "bi bi-image-fill", 
                            viewBox: "0 0 16 16", 
                            path: "M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" 
                        }} 
                        /> &nbsp; Fotos
                    </a>
                    <a href="/8-Ubicacion" type="button" class={`flex flex-row items-center content-center 
                    text-center px-1 py-1.5 text-xs font-medium
                     ${currentPath === "/8-Ubicacion" ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} rounded-lg`}>
                    <IconGeneral 
                        params={{ 
                            color: "currentColor", 
                            size: "16", 
                            className: "bi bi-geo-alt-fill", 
                            viewBox: "0 0 16 16", 
                            path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" 
                        }} 
                        /> &nbsp; Sitio
                    </a>
                </div>
            </div>
        </div>
)
}

export default MenuMovil
