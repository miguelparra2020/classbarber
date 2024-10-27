import { useState } from 'react';
import IconGeneral from "../../components/icons/IconGeneral.jsx";
const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState();
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [selectedFecha, setSelectedFecha] = useState();
    const [selectedHorario, setSelectedHorario] = useState();

    const arrayServicios = [
        { nombre: "Corte de cabello", minutos: 30, id: 1 },
        { nombre: "Arreglo de barba ", minutos: 20, id: 2 },
        { nombre: "Cejas con navaja", minutos: 5, id: 3 },
        { nombre: "Corte + Barba", minutos: 45, id: 4 },
        { nombre: "Corte + Cejas", minutos: 40, id: 5 },
        { nombre: "Corte + Barba + Cejas", minutos: 50, id: 6 },
        { nombre: "Colorimetria", minutos: 60, id: 7 },
      ]

    // Funciones para cambiar de paso
    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            <div className='flex flex-col items-center content-center'>
        <h1 className="text-3xl md:text-3xl font-bold leading-tighter tracking-tighter mb-1 font-heading">
          <div className="mt-1">
            <span>Agendar cita</span>
          </div>
        </h1>
        </div>
        <div class="w-full">
                <div class="grid max-w-xs grid-cols-3	 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg " role="group">
                    <button onClick={() => setCurrentStep(1)}  type="button" class={`flex flex-row items-center content-center 
                        text-center px-1 py-1.5 text-xs font-medium
                         ${currentStep === 1 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"}
                        rounded-lg`}>
                            {currentStep === 1 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp;
                            Seleccionar Servicios 
                        
                    </button>
                    <button onClick={() => setCurrentStep(2)}  type="button" class={`flex flex-row items-center content-center text-center px-1 py-1.5 text-xs 
                    font-medium  ${currentStep === 2 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 2 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Seleccionar Barbero
                    </button>
                    <button onClick={() => setCurrentStep(3)}  type="button" class={`flex flex-row items-center content-center text-center px-1 py-1.5 
                    text-xs font-medium ${currentStep === 3 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 3 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Seleccionar fecha
                    </button>
                </div>
            </div>
        
           

            {/* Renderizado condicional de los pasos */}
            {currentStep === 1 && (
    <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Servicios</h5>
                <span className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500">
                    Seleccionar servicio
                </span>
            </div>
            <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
  {arrayServicios.map((servicio, index) => (
    <li key={index} className="py-3 sm:py-4">
      <label htmlFor={servicio.id} className="flex items-center cursor-pointer">
        <div className="flex-shrink-0">
          <IconGeneral
            params={{
              color: "currentColor",
              size: "30",
              className: servicio.iconoClase,
              viewBox: "0 0 16 16",
              path: "M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
            }}
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {servicio.nombre}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
            <IconGeneral
              params={{
                color: "currentColor",
                size: "16",
                className: "bi bi-stopwatch-fill",
                viewBox: "0 0 16 16",
                path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0"
              }}
            /> &nbsp; {servicio.minutos} min
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <input
            id={servicio.id}
            type="radio"
            name="servicio" // Este atributo agrupa los radios, permitiendo solo una selección
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </label>
    </li>
  ))}
</ul>


            </div>
        </div>
        <br />
        <div class="w-screen gap-4 flex flex-row justify-center  items-center content-center">
                        <button onClick={goToNextStep} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
    </div>

)}


            {currentStep === 2 && (
                <div>
                    <h2>Selecciona el Barbero</h2>
                    <select value={selectedBarbero} onChange={(e) => setSelectedBarbero(e.target.value)}>
                        <option value="">Selecciona un barbero</option>
                        <option value="barbero1">Barbero 1</option>
                        <option value="barbero2">Barbero 2</option>
                        <option value="barbero3">Barbero 3</option>
                    </select>
                    <div class="w-screen gap-4 flex flex-row justify-center  items-center content-center">
                        <button onClick={goToPreviousStep} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Anterior</button>
                        <button onClick={goToNextStep} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
                    </div>
                </div>
            )}            

            {currentStep === 3 && (
                <div>
                    <h2>Selecciona Fecha y Hora</h2>
                    <input
                        type="date"
                        value={selectedFecha}
                        onChange={(e) => setSelectedFecha(e.target.value)}
                    />
                    <input
                        type="time"
                        value={selectedHorario}
                        onChange={(e) => setSelectedHorario(e.target.value)}
                    />
                    <div class="w-full gap-4 flex flex-row justify-center items-center content-center">
                        <button onClick={goToPreviousStep} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Anterior</button>
                        <button onClick={() => alert("Cita Agendada")} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Confirmar Cita</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CitasModule;
