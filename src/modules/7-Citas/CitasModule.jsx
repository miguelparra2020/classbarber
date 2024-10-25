import { useState } from 'react';

const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState("");
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [selectedFecha, setSelectedFecha] = useState("");
    const [selectedHorario, setSelectedHorario] = useState("");

    // Funciones para cambiar de paso
    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            {/* Tabs para simular los pasos */}
            <div className="tabs">
                <button onClick={() => setCurrentStep(1)} className={currentStep === 1 ? "active" : ""}>Paso 1: Selecciona el Barbero</button>
                <button onClick={() => setCurrentStep(2)} className={currentStep === 2 ? "active" : ""}>Paso 2: Selecciona los Servicios</button>
                <button onClick={() => setCurrentStep(3)} className={currentStep === 3 ? "active" : ""}>Paso 3: Selecciona Fecha y Hora</button>
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
