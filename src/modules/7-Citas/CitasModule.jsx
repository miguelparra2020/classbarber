import { useState } from 'react';
import IconGeneral from "../../components/icons/IconGeneral.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState();
    const [selectedServicio, setSelectedServicio] = useState();
    const [selectedFecha, setSelectedFecha] = useState();
    const [selectDay, setSelectDay] = useState();
    const [selectedHorario, setSelectedHorario] = useState();
    const [disabledServices, setDisabledServices] = useState(false);
    const [disabledBarbero, setDisabledBarbero] = useState(false);
    const [citaProgramming] = useState({
      servicio: selectedServicio,
      barbero: selectedBarbero,
      fecha: selectedFecha,
      horario: selectedHorario 
    });

      const arrayServicios = [    
          { nombre: "Corte de cabello", minutos: 30, id: 1 },
          { nombre: "Arreglo de barba ", minutos: 15, id: 2 },
          { nombre: "Cejas con navaja", minutos: 15, id: 3 },
          { nombre: "Corte + Barba", minutos: 45, id: 4 },
          { nombre: "Corte + Cejas", minutos: 45, id: 5 },
          { nombre: "Corte + Barba + Cejas", minutos: 60, id: 6 },
          { nombre: "Colorimetria", minutos: 90, id: 7 },
          { nombre: "Delineado", minutos: 15, id: 8 },
      ]

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
    
    const opcionesHorarias = ["10:00","10:30","11:00","11:30","12:00"]
    
    // Funciones para cambiar de paso
    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const notifyServiceSelected = (serviceId, serviceName) => {
      if (selectedServicio != serviceId) {
        setDisabledServices(true)
        toast.success("Ha seleccionado el servicio: " + serviceName)
        setTimeout(() => {
          goToNextStep()
          setDisabledServices(false)
        }, 3000)

      }
      
    }

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

    const [dates, setDates] = useState(generateDates());

    // Función para generar los próximos días a partir de hoy
    function generateDates(days = 90) {
      const today = new Date();
      const result = [];

      for (let i = 0; i < days; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        result.push({
          month: format(currentDate, 'MMM', { locale: es }).toUpperCase(),
          day: format(currentDate, 'dd'),
          weekday: format(currentDate, 'EEE', { locale: es }).toUpperCase()
        });
      }
      return result;
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
                <div className="grid max-w-xs grid-cols-3	 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg " role="group">
                    <button onClick={() => setCurrentStep(1)}  type="button" className={`flex flex-row items-center content-center 
                        text-center px-1 py-1.5 text-xs font-medium
                         ${currentStep === 1 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"}
                        rounded-lg`}>
                            {currentStep === 1 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp;
                            Seleccionar Servicio
                        
                    </button>
                    <button onClick={() => setCurrentStep(2)} disabled={!selectedServicio} type="button" className={`flex flex-row items-center content-center text-center px-1 py-1.5 text-xs 
                    font-medium  ${currentStep === 2 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 2 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Seleccionar Barbero
                    </button>
                    <button onClick={() => setCurrentStep(3)}  disabled={!selectedServicio || !selectedBarbero} type="button" className={`flex flex-row items-center content-center text-center px-1 py-1.5 
                    text-xs font-medium ${currentStep === 3 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 3 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Seleccionar fecha
                    </button>
                </div>
            </div>

            {/* Renderizado condicional de los pasos */}
            {currentStep === 1 && (
              <div className="w-full flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                      <div className="flex items-center justify-between mb-1">
                          <h5 className="text-xl font-bold leading-none text-gray-900 ">Servicios</h5>
                          <span className="text-sm font-medium text-gray-600 hover:underline ">
                              Seleccionar servicio
                          </span>
                      </div>
                      <div className="flow-root">
                      <ul role="list" className="divide-y divide-gray-200 ">
            {arrayServicios.map((servicio, index) => (
              <li key={index} className="py-3 sm:py-4">
                <label htmlFor={servicio.id || selectedServicio} onClick={() => {if(!disabledServices){
                  setSelectedServicio(servicio.id)
                  notifyServiceSelected(servicio.id, servicio.nombre)
                }        
                }} className="flex items-center cursor-pointer">
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
                    <p className="text-sm font-medium text-gray-900 truncate ">
                      {servicio.nombre}
                    </p>
                    <p className="text-sm text-gray-500 truncate flex flex-row">
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
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  <input
                      id={servicio.id}
                      type="radio"
                      name="servicio"
                      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 "
                      checked={selectedServicio === servicio.id} // Esto mantiene el input marcado si coincide con el servicio seleccionado
                      onChange={() => setSelectedServicio(servicio.id)}
                      disabled={disabledServices}
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
                                  <button onClick={goToNextStep} disabled={!selectedServicio}  className="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
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
                                <button onClick={goToNextStep} disabled={!selectedServicio || !selectedBarbero} className="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Siguiente</button>
                            </div>
        
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
            </div>
            )}            

            {currentStep === 3 && (
                <div>


                </div>
            )}
            
            <ToastContainer autoClose={1000} style={{marginTop: "12vh"}}/>
        </div>
    );
};

export default CitasModule;
