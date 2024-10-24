import { useEffect, useState } from 'react';

const DeviceDetector = ({ onResize }) => {
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;

      if (width <= 600) {
        setDevice('mobile'); // Para dispositivos móviles
        onResize(100); // Llamada para actualizar el tamaño
      } else if (width <= 1000) {
        setDevice('tablet'); // Para tablets
        onResize(300); // Llamada para actualizar el tamaño
      } else {
        setDevice('desktop'); // Para escritorio
        onResize(500); // Llamada para actualizar el tamaño
      }
    };

    detectDevice(); // Ejecutar la detección al cargar

    // Agregar un listener para el cambio de tamaño de la ventana
    window.addEventListener('resize', detectDevice);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, [onResize]);

  return null; // No necesitas renderizar nada aquí
};

export default DeviceDetector;
