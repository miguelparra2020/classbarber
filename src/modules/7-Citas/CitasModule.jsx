import { useState } from 'react';

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
        <h1 className="text-3xl md:text-3xl font-bold leading-tighter tracking-tighter mb-3 font-heading dark:text-gray-200">
          <div className="mt-5">
            <span>Agendar cita</span>
          </div>
        </h1>
        </div>
            {/* Tabs para simular los pasos */}
            <div className="w-full flex flex-col items-center content-center ">
                <div className="lg:w-3/4 sm:w-full sm:h-40 lg:h-auto flex flex-row items-center content-center ">
                    <div className='w-1/3 sm:h-40 lg:h-auto text-center bg-gray-500 text-white p-4'>
                    
                    <button onClick={() => setCurrentStep(1)} className={currentStep === 1 ? "active" : ""}>
                   {currentStep === 1 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>}  Paso 1: Selecciona el Barbero</button></div>
                    <div className='w-1/3 sm:h-40 lg:h-auto text-center bg-gray-200 text-customColor2  p-4'>
                    <button onClick={() => setCurrentStep(2)} className={currentStep === 2 ? "active" : ""}>
                    {currentStep === 2 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>}Paso 2: Selecciona los Servicios</button></div>
                    <div className='w-1/3 sm:h-40 lg:h-auto text-center bg-gray-500 text-white p-4'>
                    <button onClick={() => setCurrentStep(3)} className={currentStep === 3 ? "active" : ""}>
                    {currentStep === 3 && <><span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>}Paso 3: Selecciona Fecha </button></div>
                </div>
            </div>
           

            {/* Renderizado condicional de los pasos */}
            {currentStep === 1 && (
                <div>
                    <h2>Selecciona el Barbero</h2>
                    <select value={selectedBarbero} onChange={(e) => setSelectedBarbero(e.target.value)}>
                        <option value="">Selecciona un barbero</option>
                        <option value="barbero1">Barbero 1</option>
                        <option value="barbero2">Barbero 2</option>
                        <option value="barbero3">Barbero 3</option>
                    </select>
                    <button onClick={goToNextStep}>Siguiente</button>
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    <h2>Selecciona los Servicios</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="corte"
                                checked={selectedServicios.includes("corte")}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedServicios([...selectedServicios, e.target.value]);
                                    } else {
                                        setSelectedServicios(selectedServicios.filter(servicio => servicio !== e.target.value));
                                    }
                                }}
                            />
                            Corte de cabello
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="barba"
                                checked={selectedServicios.includes("barba")}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedServicios([...selectedServicios, e.target.value]);
                                    } else {
                                        setSelectedServicios(selectedServicios.filter(servicio => servicio !== e.target.value));
                                    }
                                }}
                            />
                            Arreglo de barba
                        </label>
                    </div>
                    <button onClick={goToPreviousStep}>Anterior</button>
                    <button onClick={goToNextStep}>Siguiente</button>
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
                    <button onClick={goToPreviousStep}>Anterior</button>
                    <button onClick={() => alert("Cita Agendada")}>Confirmar Cita</button>
                </div>
            )}
        </div>
    );
};

export default CitasModule;
