import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState();
    const [disabledBarbero, setDisabledBarbero] = useState(false);

      const arrayBarberos = [
          { img : "https://www.carloscondepeluqueros.com/wp-content/uploads/2019/01/cabecera-barbero-profesional.jpg",
            nombre: "Carlos Garcia", 
            id: 1, 
            diaNoDisponible: "DOM", 
            Horario1: "10:00",  
            Horario2: "14:00",
            Horario3: "16:00",
            Horario4: "21:00"
          },
          { img: "https://www.carloscondepeluqueros.com/wp-content/uploads/2019/01/cabecera-barbero-profesional.jpg",
            nombre: "Juan Gomez", 
            id: 2, 
            diaNoDisponible: "MAR",
            Horario1: "10:00",  
            Horario2: "14:00",
            Horario3: "16:00",
            Horario4: "21:00"
          },
      ]
    
    // Funciones para cambiar de paso
    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const notifyBarberoSelected = (barberoId, barberoName) => {
      if (selectedBarbero != barberoId) {
        setDisabledBarbero(true)
        toast.success("Ha seleccionado el barbero: " + barberoName)
        setTimeout(() => {
          goToNextStep()
          setDisabledBarbero(false)
        }, 3000)

      }
      
    }

    return (
        <div>         
            <div className='flex flex-col items-center content-center'>
              <h1 className="text-3xl md:text-3xl font-bold leading-tighter tracking-tighter mb-1 font-heading">
                <div className="mt-1">
                  <span>Agendar cita</span>
                </div>
              </h1>
            </div>
            <div className="w-full">
                <div className="grid max-w-xs grid-cols-2	 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg " role="group">
                    <button onClick={() => setCurrentStep(1)}  type="button" className={`flex flex-row items-center content-center 
                        text-center px-1 py-1.5 text-xs font-medium
                         ${currentStep === 1 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"}
                        rounded-lg`}>
                            {currentStep === 1 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp;
                            Seleccionar Barbero
                        
                    </button>
                    <button onClick={() => setCurrentStep(2)} type="button" className={`flex flex-row items-center content-center text-center px-1 py-1.5 text-xs 
                    font-medium  ${currentStep === 2 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 2 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Seleccionar Fecha y Hora
                    </button>
                    
                </div>
            </div>

            {/* Renderizado condicional de los pasos */}
            {currentStep === 1 && (
              <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                  <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xl font-bold leading-none text-gray-900 ">Barberos  </h5>
                      <span className="text-sm font-medium text-gray-600 hover:underline ">
                          Seleccionar barbero
                      </span>
                  </div>
                  <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 ">
        {arrayBarberos.map((barbero, index) => (
          <li key={index} className="py-3 sm:py-4">
            <label htmlFor={barbero.id || selectedBarbero} onClick={() => {if(!disabledBarbero){
              setSelectedBarbero(barbero.id)
              notifyBarberoSelected(barbero.id, barbero.nombre)
            }        
            }} className="flex items-center cursor-pointer">
              <div className="flex-shrink-0">
                <img src={barbero.img} alt="fotografía del barbero" 
                className="w-20 h-20 rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate flex flex-row">
                  {barbero.nombre} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
<path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
              <input
                  id={barbero.id}
                  type="radio"
                  name="barbero"
                  className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 "
                  checked={selectedBarbero === barbero.id} // Esto mantiene el input marcado si coincide con el servicio seleccionado
                  onChange={() => setSelectedBarbero(barbero.id)}
                  disabled={disabledBarbero}
                />
              </div>
            </label>
          </li>
        ))}
      </ul>
      
      
                  </div>
              </div>
              <br />
              <div className="w-screen gap-4 flex flex-row justify-center  items-center content-center">
                              <button onClick={goToNextStep} disabled={ !selectedBarbero} className="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
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
                <>
                <br />
                <div className='text-center'><strong>Agenda del barbero: {arrayBarberos.find(barbero => barbero.id === selectedBarbero).nombre}</strong></div>
                <br />
                {selectedBarbero === 1 && <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JQuGcxtBRd6KlgDsjCLAeyBLN-BRH4we7Wf0JbRFyF3bdyqPmIU1FTV8Tl1KteFPqcKvK9G0i?gv=true" style={{"border": "0"}} width="100%" height="2000" frameborder="0"></iframe>}
                
                <br />
                          <div className="w-screen gap-4 flex flex-row justify-center  items-center content-center">
                              <button onClick={goToPreviousStep} disabled={ !selectedBarbero} className="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Atrás</button>
                          </div>
      
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                </>
            )}     
            
            <ToastContainer autoClose={1000} style={{marginTop: "12vh"}}/>
        </div>
    );
};

export default CitasModule;
