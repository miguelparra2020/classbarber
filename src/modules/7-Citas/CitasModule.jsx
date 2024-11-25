import { useEffect, useState } from 'react';
import IconGeneral from "../../components/icons/IconGeneral.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';
import InstallButton from '../../components/interactivos/buttonInstall.jsx';

const CitasModule = () => {
    // Estados para controlar el paso actual y los datos seleccionados
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBarbero, setSelectedBarbero] = useState();
    const [selectedServicio, setSelectedServicio] = useState();
    const [selectedFecha, setSelectedFecha] = useState();
    const [disabledFecha, setDisabledFecha] = useState(false);
    const [selectDay, setSelectDay] = useState();
    const [disabledServices, setDisabledServices] = useState(false);
    const [disabledBarbero, setDisabledBarbero] = useState(false);
    const [loadingToken, setLoadingToken] = useState(false);
    const [tokenCalendar, setTokenCalendar] = useState("");
    const [responseToken, setResponseToken] = useState("");
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [selectHoraDisponible, setSelectHoraDisponible] = useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [nameCustomer, setNameCustomer] = useState('');
    const [emailCustomer, setEmailCustomer] = useState('');
    const [celCustomer, setCelCustomer] = useState('');
    const [celularPrefijo, setCelularPrefijo] = useState("");
    const [validateCustomer, setValidateCustomer] = useState(false);
    const toggleModal = () => {setModalOpen(!isModalOpen)};

    useEffect(() => {
      if(celCustomer.slice(0, 1) === "3"){
        setCelularPrefijo("+57"+celCustomer);
      }
      if(celCustomer.slice(0, 1) === "6"){
        setCelularPrefijo("+34"+celCustomer);
      }
    },[celCustomer])

    useEffect(() => {
      // Verificar si el código está corriendo en el navegador
      if (typeof window !== 'undefined') {
        // Solo accedes a localStorage en el navegador
        const miNombre = localStorage.getItem('mi_nombre');
        const miCorreo = localStorage.getItem('mi_correo');
        const miCelular = localStorage.getItem('mi_celular');
  
        setNameCustomer(miNombre ? miNombre : "");
        setEmailCustomer(miCorreo ? miCorreo : "");
        setCelCustomer(miCelular ? miCelular : "");
      }
    }, [selectedFecha, selectedBarbero, selectedServicio, isModalOpen]);
    const sumarMinutos = (hora, minutosASumar) => {
      // Convertir la hora en un objeto Date
      const [horaStr] = hora.split(" "); // Se elimina AM/PM, si existe
      let [horas, minutos] = horaStr.split(":").map(Number); // Dividir horas y minutos
      const horaDelDia = hora.slice(-2); // Extraer la hora del dia
      // Ajustar las horas si es PM
        if (horaDelDia === "PM" && horas !== 12) {
          horas += 12; // Sumar 12 horas si es PM (excepto las 12 PM)
        }
        if (horaDelDia === "AM" && horas === 12) {
          horas = 0; // Ajustar a medianoche (12 AM es 00:00 en formato 24 horas)
        }
      const fecha = new Date();
      fecha.setHours(horas, minutos); // Establecer la hora en el objeto Date
    
      // Sumar los minutos
      fecha.setMinutes(fecha.getMinutes() + minutosASumar);
    
      // Obtener la hora y los minutos resultantes
      const horasResult = fecha.getHours();
      const minutosResult = fecha.getMinutes();
    
      // Formatear las horas y minutos en formato "HH:mm"
      const horasFormateadas = horasResult.toString().padStart(2, "0"); // Para asegurar que siempre tenga dos dígitos
      const minutosFormateados = minutosResult.toString().padStart(2, "0");
    
      return `${horasFormateadas}:${minutosFormateados}`;
    }
    

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
        { img : "./imgs/BarberoOscar.jpg",
          nombre: "Oscar Rodríguez", 
          id: 1, 
          diaNoDisponible: "DOM",
          agendaId:"3ef6bc19c90d18bb47063b03fa299dc1c9bb1f1238672084905fcaf8808bb611@group.calendar.google.com"
        },
        { img: "./imgs/BarberoDaniel.jpg",
          nombre: "Daniel S. Cano", 
          id: 2, 
          diaNoDisponible: "MAR",
          agendaId:"5a5f753eb96bac8155a607114939f484f29f14c98a4e658e782ac5096429e802@group.calendar.google.com"
        },
    ]

    const calcularHorariosDisponibles = (horariosOcupados, duracionFranja = 30) => {
      const inicioDia = new Date(`${selectedFecha.year}-${selectedFecha.monthNumber}-${selectedFecha.day}T08:00:00+01:00`);
      const finDia = new Date(`${selectedFecha.year}-${selectedFecha.monthNumber}-${selectedFecha.day}T21:00:00+01:00`);

      // Convertimos la duración de la franja a milisegundos
      const duracionFranjaMs = duracionFranja * 60 * 1000;

      // Generar todas las franjas horarias posibles
      const franjas = [];
      for (let tiempo = inicioDia.getTime(); tiempo < finDia.getTime(); tiempo += duracionFranjaMs) {
        const start = new Date(tiempo);
        const end = new Date(tiempo + duracionFranjaMs);
        franjas.push({ start, end });
      }

      // Convertir horarios ocupados a objetos Date
      const ocupados = horariosOcupados.map(h => ({
        start: new Date(h.start),
        end: new Date(h.end),
      }));

      // Filtrar las franjas que no se solapen con los horarios ocupados
      const disponibles = franjas.filter(franja => {
        return !ocupados.some(ocupado =>
          // Comprobamos si la franja está completamente dentro del ocupado
          (franja.start >= ocupado.start && franja.start < ocupado.end) ||
          (franja.end > ocupado.start && franja.end <= ocupado.end) ||
          (franja.start <= ocupado.start && franja.end >= ocupado.end)
        );
      });

      // Devolver los horarios disponibles en formato legible
      return disponibles.map(franja => ({
        start: franja.start.toISOString(),
        end: franja.end.toISOString(),
      }));
    };

    const checkAvailability = async () => {
      if (!selectedBarbero || !selectedFecha) {
        toast.warn('Selecciona un barbero y una fecha antes de verificar la disponibilidad.');
        return;
      }

      try {
        const barbero = arrayBarberos[selectedBarbero - 1];
        const diaDisponible = barbero.diaNoDisponible !== selectedFecha.weekday.toUpperCase();

        if (!diaDisponible) {
          toast.warn(`El barbero no trabaja el día ${selectedFecha.weekday}.`);
          return;
        }

        setLoadingToken(true);
        setResponseToken("Consultando disponibilidad...");
        setDisabledFecha(true);

        const responseToken = await axios.get("https://classbarber.pythonanywhere.com/api/google-token/");
        if (responseToken.status === 200) {
          const token = responseToken.data.access_token;
          setTokenCalendar(token);
          const body = {
            timeMin: `${selectedFecha.year}-${selectedFecha.monthNumber}-${selectedFecha.day}T08:00:00+01:00`,
            timeMax: `${selectedFecha.year}-${selectedFecha.monthNumber}-${selectedFecha.day}T21:00:00+01:00`,
            timeZone: "Europe/Madrid",
            items: [{ id: barbero.agendaId }],
          };

          const responseCalendar = await axios.post('https://www.googleapis.com/calendar/v3/freeBusy', body, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (responseCalendar.status === 200) {
            const busyTimes = responseCalendar.data.calendars[barbero.agendaId].busy;
            const convertToUTC = (time) => new Date(time).toISOString();
            const horariosOcupadosUTC = busyTimes.map(({ start, end }) => ({
              start: convertToUTC(start),
              end: convertToUTC(end)
            }));
            const resultDisponibles = calcularHorariosDisponibles(busyTimes, arrayServicios[selectedServicio - 1].minutos);
            
            // Filtrar horarios disponibles
            const horariosFiltrados = resultDisponibles.filter(({ start, end }) => {
              return !horariosOcupadosUTC.some(
                  (ocupado) =>
                      (start >= ocupado.start && start < ocupado.end) ||
                      (end > ocupado.start && end <= ocupado.end)
              );
            });

          const formatToMadridTimeWithAmPm = (time) => {
            const date = new Date(time);
            return new Intl.DateTimeFormat("en-US", {
                timeZone: "Europe/Madrid", // Zona horaria de Madrid
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }).format(date);
        };
        
        // Convertir horarios filtrados al formato deseado con horas en am/pm
        const horariosFiltradosConAmPm = horariosFiltrados.map(({ start }) => ({
            start: formatToMadridTimeWithAmPm(start)
        }));
        setHorasDisponibles(horariosFiltradosConAmPm);
        if(horariosFiltradosConAmPm){
          setResponseToken("")
        }
          
            if (busyTimes.length === 0) {
              toast.success('El barbero está disponible todo el día.');
            } else {
              toast.info('El barbero tiene horarios ocupados. Consulta los horarios disponibles.');
            }
          } else {
            toast.error('Error al consultar la disponibilidad en el calendario.');
            setHorasDisponibles([]);
          }
        } else {
          toast.error('Error al obtener el token de acceso.');
          setHorasDisponibles([]);
        }
      } catch (error) {
        console.error('Error al comprobar disponibilidad:', error);
        toast.error('Ocurrió un error al verificar la disponibilidad.');
        setHorasDisponibles([]);
      } finally {
        setLoadingToken(false);
        setDisabledFecha(false);
      }
    };

    // useEffect para verificar disponibilidad cuando cambia la fecha
    useEffect(() => {
      if (selectedFecha && selectedBarbero && selectedServicio) {
        checkAvailability()
      }
    }, [selectedFecha]);

    // Funciones para cambiar de paso
    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const notifyServiceSelected = (serviceId, serviceName) => {
      if (selectedServicio !== serviceId) {
        setDisabledServices(true);
        if (serviceId) {
          toast.success(`Ha seleccionado el servicio: ${serviceName}`);
          setSelectedFecha(null);
          setHorasDisponibles([]);
        }
        setTimeout(() => {
          goToNextStep();
          setDisabledServices(false);
        }, 1000);
      }
      
    }

    const notifyBarberoSelected = (barberoId, barberoName) => {
      if (selectedBarbero != barberoId) {
        setDisabledBarbero(true)
        if(barberoId != 0){
          toast.success("Ha seleccionado el barbero: " + barberoName)
          setSelectedFecha(null)
          setHorasDisponibles([])
        } 
        setTimeout(() => {
          goToNextStep()
          setDisabledBarbero(false)
        }, 1000)

      }      
    }

    const notifyDaySelected = (date) => {
      if (selectedFecha != date) {
        toast.success("Ha seleccionado el día: " + date.day + " de " + date.month)
      }
      
    }


    const [dates] = useState(generateDates());

    // Función para generar los próximos días a partir de hoy
    function generateDates(days = 90) {
      const today = new Date();
      const result = [];

      for (let i = 0; i < days; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        result.push({
          year:format(currentDate, 'yyyy', { locale: es }).toUpperCase(),
          month: format(currentDate, 'MMM', { locale: es }).toUpperCase(),
          monthNumber: format(currentDate, 'MM'),
          day: format(currentDate, 'dd'),
          weekday: format(currentDate, 'EEE', { locale: es }).toUpperCase()
        });
      }
      return result;
    }
   
    // Creación de cita:
    const bodyToCreateCita = {
      "summary": `${nameCustomer} - ${ arrayServicios[selectedServicio - 1]?.nombre} - ${ arrayServicios[selectedServicio - 1]?.minutos} minutos`,  
      "location": "Class Barber, Ibiza españa",
      "description": `El cliente: ${nameCustomer},
      solicitó el servicio: ${arrayServicios[selectedServicio - 1]?.nombre}, 
      con duración de: ${arrayServicios[selectedServicio - 1]?.minutos} minutos,
      con el barbero: ${arrayBarberos[selectedBarbero - 1]?.nombre}, 
      para el día: ${selectedFecha?.day} de ${selectedFecha?.month},
      a las: ${selectHoraDisponible?.start}, 
      datos adicionales del cliente, 
      correo: ${emailCustomer} y celular: ${celCustomer}
      `,
      "start": {
        "dateTime": `${selectedFecha?.year}-${selectedFecha?.monthNumber}-${selectedFecha?.day}T${sumarMinutos(`${selectHoraDisponible?.start}`, 0).slice(0, 5)}:00+01:00`,
        "timeZone": "Europe/Madrid"
      },
      "end": {  
        "dateTime": `${selectedFecha?.year}-${selectedFecha?.monthNumber}-${selectedFecha?.day}T${sumarMinutos(`${selectHoraDisponible?.start}`, arrayServicios[selectedServicio - 1]?.minutos).slice(0, 5)}:00+01:00`,
        "timeZone": "Europe/Madrid"
      },
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      return emailRegex.test(email);
    };
    const hadleCreateCita = async () => {
  setValidateCustomer(true);

  // Validación de campos obligatorios
  if (validateCustomer && (!nameCustomer || !emailCustomer || !celCustomer)) {
    toast.error("Todos los campos son obligatorios");
    setValidateCustomer(false);
    return;
  }

  // Validación del correo electrónico
  if (emailCustomer !== '' && !validateEmail(emailCustomer)) {
    toast.error("El correo no es válido");
    setValidateCustomer(false);
    return;
  }

  // Validación del número de teléfono
  if (celCustomer.length < 9 || celCustomer.length > 10) {
    toast.error("El número de celular debe tener entre 9 y 10 dígitos");
    
    setValidateCustomer(false);
    return;
  }
  if (celCustomer.slice(0, 1) !== "3" && celCustomer.slice(0, 1) !== "6" && celCustomer.slice(0, 1) !== "7") {
    toast.error("El número de celular debe ser correcto");
    setValidateCustomer(false);
    return;
  }

  if (tokenCalendar !== '') {
    // Mostrar el toast de "loading" y asignar un ID único
    const toastId = toast.loading("Cargando cita...", { toastId: "loadingToast" });

    

    try {
      const response = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${arrayBarberos[selectedBarbero - 1].agendaId}/events`, bodyToCreateCita, {
        headers: {
          Authorization: `Bearer ${tokenCalendar}`
        }
      });

      if (response.status === 200){ 
        if (typeof window !== 'undefined') {
          localStorage.setItem('mi_nombre', nameCustomer);
          localStorage.setItem('mi_correo', emailCustomer);
          localStorage.setItem('mi_celular', celCustomer);
        }       
        setSelectedFecha(null)
        toggleModal()


        setTimeout(() => {
          
          toast.update(toastId, {
            render: "Cita creada con éxito",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          
        }, 1000);
        try {
          const bodyNotification = {
            "message_to_send": `\"Hola ${nameCustomer}, Class Barber ha agendado su cita para el ${selectedFecha?.day} 
            de ${selectedFecha?.month} a las ${selectHoraDisponible?.start}, Muchas gracias por preferirnos"`,
            "number_to_send": `whatsapp:${celularPrefijo}`
          }
          const response = await axios.post(`https://classbarber.pythonanywhere.com/api/send-whatsapp/`, bodyNotification);
          if (response.status === 200){ 
            setTimeout(() => {
            toast.success("Notificación en su what's app...");
            }, 2000);
          }
        } catch (error) {
          toast.warning("No se pudo enviar la notificación en what's app");
        }
        
      }
      
    } catch (error) {
      // Si ocurre un error, mostrar un error
      toast.update(toastId, {
        render: "No se pudo crear la cita",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  } else {
    toast.error("No se pudo crear la cita");
  }
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
                  notifyServiceSelected(0, servicio.nombre)
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
                notifyBarberoSelected(0, barbero.nombre)
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
                    onChange={() => {
                      setSelectedBarbero(barbero.id)
                    }}
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
                  <div className='w-full text-center flex flex-col justify-center items-center mb-2'>
                    <div className='w-[96%] sm:max-w-lg  flex flex-row justify-center items-center bg-gray-200 p-4 rounded-lg border-2 border-customColor5'>
                     <span className='flex flex-row justify-center items-center'><IconGeneral
                          params={{
                            color: "currentColor",
                            size: "16",
                            className: "bi bi-scissors",
                            viewBox: "0 0 16 16",
                            path: "M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
                          }}
                      /> &nbsp; Servicio seleccionado: &nbsp; <strong>{arrayServicios[selectedServicio-1].nombre} - {arrayServicios[selectedServicio-1].minutos} min</strong></span>
                    </div>
                  </div>
                  <div className='w-full text-center flex flex-col justify-center items-center mb-2'>
                    <div className='w-[96%] sm:max-w-lg  flex flex-row justify-center items-center bg-gray-200 p-4 rounded-lg border-2 border-customColor5'>
                     <span className='flex flex-row justify-center items-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg> &nbsp; Barbero seleccionado: &nbsp; <img src={arrayBarberos[selectedBarbero-1].img} alt="fotografía del barbero" 
                  className="w-10 h-10 rounded-full"
                  /> &nbsp; <strong>{arrayBarberos[selectedBarbero-1].nombre}</strong></span>
                    </div>
                  </div>
                  <div className='w-full text-center flex flex-col justify-center items-center'>
                    <div className='w-[96%] sm:max-w-lg  flex flex-col justify-center items-center bg-gray-50 p-4 rounded-lg border-2 border-customColor5'>
                     <div>
                     <span className='flex flex-row justify-center items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                      </svg>&nbsp; 
                      Agenda disponible de : &nbsp; <strong>{arrayBarberos[selectedBarbero-1].nombre}</strong></span>
                     </div>
                     <br />
                    <div className='w-[94%] flex flex-col justify-start items-start'>
                      <div>Fechas disponibles:</div>
                      <div className='w-full flex flex-row justify-start items-center gap-2 overflow-x-auto'>
                        {dates.map((date, index) => (
                          <button
                            key={index}
                            className={`p-2 rounded-md min-w-[80px] flex flex-col justify-center items-center ${
                              selectedFecha === date
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-white'
                            }`}
                            disabled={disabledFecha}
                            onClick={() => {
                              setSelectedFecha(date)
                              notifyDaySelected(date)
                              setSelectDay(date.weekday)
                              
                            }}
                          >
                            <div>
                              <strong>{date.month}</strong>
                            </div>
                            <div>
                              <strong>{date.day}</strong>
                            </div>
                            <div>
                              <strong>{date.weekday}</strong>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <br />
                    {selectedFecha  && <>
                      <div>
                      Horarios disponibles del <strong>{selectedFecha.day}</strong>  de <strong>{selectedFecha.month}</strong>:
                    </div>
                    <br />
                    <div>
                      {
                        selectDay === arrayBarberos[selectedBarbero-1].diaNoDisponible ? <>
                         <strong>Día no disponible, barbero se encuentra en día de descanso.</strong> 
                        </> : 
                        <>
                          {loadingToken &&
                              <div className='flex flex-row justify-center items-center'>Cargando horarios...
                              <div role="status">
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                              </div>
                              </div>
                          }
                          {responseToken && <>
                            {
                            responseToken
                            }
                            </>
                          }
                          <div className='flex flex-row justify-center items-center flex-wrap gap-2 '>
                          {horasDisponibles.map((horario, index) => (
                              <button
                              onClick={() => {
                                toggleModal()
                                setSelectHoraDisponible(horario)}}
                              className="bg-customColor5 hover:bg-customColor8 text-gray-800 hover:text-white rounded font-bold py-2 px-4"
                              key={index}
                              >
                                  {horario.start}
                              </button>
                          ))}
                            </div>
                        </>
                    }
                    
                    </div>
                    </>}
                    </div>
                  </div>
                  <br />
                  <div className="w-full gap-4 flex flex-row justify-center items-center content-center">
                      <button onClick={goToPreviousStep} className="bg-customColor8 hover:bg-customColor5 text-white hover:text-gray-800 rounded font-bold py-2 px-4 flex items-center">Anterior</button>    
                  </div>
                </div>
            )}
            {isModalOpen && (
              <div  id="timeline-modal"
                className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 mt-4"
              >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Agendamiento de cita  
                            </h3>
                            <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="timeline-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <ol className="relative border-s border-gray-200  ms-3.5 mb-4 md:mb-5">                  
                                
                                <li className="mb-2 ms-8">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                        <svg className="w-2.5 h-2.5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/></svg>
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900 ">
                                      Cita para el: {selectedFecha.day} de {selectedFecha.month} de {selectedFecha.year} a las {selectHoraDisponible.start}</h3>
                                    <time className="block mb-3 text-sm font-normal leading-none text-gray-500 ">Duración del servicio: {arrayServicios[selectedServicio-1].minutos} minutos</time>
                                    <div className='flex flex-row justify-start items-center gap-2  '>
                                      <span className="mb-1 text-sm text-gray-500 ">
                                        Barbero: </span> 
                                      <img src={arrayBarberos[selectedBarbero-1].img} alt="Foto del Barbero" className='w-5 h-5 rounded-full'/>
                                      <span className="mb-1 text-lg  text-gray-500 ">
                                      {arrayBarberos[selectedBarbero-1].nombre} </span>  
                                    </div>
                                    </li>
                                <li className="ms-8">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white ">
                                        <svg className="w-2.5 h-2.5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/></svg>
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900 ">
                                      Datos para agendar la cita:</h3>
                                      <div>
                                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
                                            Nombre contacto:</label>
                                          <input type="text" value={nameCustomer} name="name" id="name" onChange={(e) => setNameCustomer(e.target.value)}
                                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 " placeholder="Nombre usuario" required />
                                            </div>
                                      <div>
                                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
                                            Correo electrónico:</label>
                                          <input type="email" value={emailCustomer} name="email" id="email" onChange={(e) => setEmailCustomer(e.target.value)}
                                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 " placeholder="name@gmail.com" required />
                                        </div>
                                      <div>
                                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
                                            Celular contacto:</label>
                                          <input type="number" value={celCustomer} name="number" id="number" onChange={(e) => setCelCustomer(e.target.value)}
                                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 " placeholder="613670695" required />
                                    </div>
                                      
                                </li>
                            </ol>
                            <div className='flex flexrow gap-2'>
                                <button onClick={hadleCreateCita} className="text-white inline-flex w-[75%] justify-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Confirmar cita
                                </button>
                                <button onClick={toggleModal} className="text-white inline-flex w-[20%] justify-center bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Cerrar
                                </button>
                            </div>
                            
                        </div>
                    </div>
            </div>
            </div> )}
            <ToastContainer autoClose={1000} style={{marginTop: "20vh"}}/>
            <InstallButton/>
        </div>
    );
};

export default CitasModule;
