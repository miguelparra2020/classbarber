import { useState } from 'react';
import IconGeneral from "../../components/icons/IconGeneral.jsx";
const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState();
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [selectedFecha, setSelectedFecha] = useState();
    const [selectedHorario, setSelectedHorario] = useState();

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
        <h1 className="text-3xl md:text-3xl font-bold leading-tighter tracking-tighter mb-3 font-heading">
          <div className="mt-5">
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
                <div>


<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Servicios</h5>
        <span  class="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500">
            Seleccionar
        </span>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Corte de cabello
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
                        <IconGeneral 
                        params={{ 
                        color: "currentColor", 
                        size: "16", 
                        className: "bi bi-stopwatch-fill", 
                        viewBox: "0 0 16 16", 
                        path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" 
                        }} 
                    /> &nbsp;  30 min
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Corte de cabello y barba
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
                            <IconGeneral 
                                params={{ 
                                color: "currentColor", 
                                size: "16", 
                                className: "bi bi-stopwatch-fill", 
                                viewBox: "0 0 16 16", 
                                path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" 
                                }} 
                            /> &nbsp;  45 min
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Arreglo de barba
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
                            <IconGeneral 
                                params={{ 
                                color: "currentColor", 
                                size: "16", 
                                className: "bi bi-stopwatch-fill", 
                                viewBox: "0 0 16 16", 
                                path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" 
                                }} 
                            /> &nbsp;  25 min
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Lana image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Cejas con navaja
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
                            <IconGeneral 
                                params={{ 
                                color: "currentColor", 
                                size: "16", 
                                className: "bi bi-stopwatch-fill", 
                                viewBox: "0 0 16 16", 
                                path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" 
                                }} 
                            /> &nbsp;  5 min
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </li>
            <li class="pt-3 pb-0 sm:pt-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Colorimetria
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 flex flex-row">
                            <IconGeneral 
                                params={{ 
                                color: "currentColor", 
                                size: "16", 
                                className: "bi bi-stopwatch-fill", 
                                viewBox: "0 0 16 16", 
                                path: "M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" 
                                }} 
                            /> &nbsp;  60 min
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>

                    <br />
                    <div class="w-full gap-4 flex flex-row justify-center items-center content-center">
                        <button onClick={goToNextStep} class="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
                    </div>
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
