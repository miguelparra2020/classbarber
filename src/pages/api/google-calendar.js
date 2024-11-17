export const POST = async ({ request }) => {
  try {
    // Asegúrate de que el cuerpo de la solicitud esté en formato JSON y contenga las claves necesarias
    const { date, calendarId } = await request.json();

    console.log(`Recibido: ${date}, ${calendarId}`);

    // Simulamos la verificación de disponibilidad (reemplaza con tu lógica real)
    const isAvailable = true;

    if (isAvailable) {
      return new Response(
        JSON.stringify({
          success: true,
          message: `La fecha ${date} está disponible para el calendario con ID: ${calendarId}.`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: `La fecha ${date} no está disponible para el calendario con ID: ${calendarId}.`,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Hubo un error al procesar la solicitud.',
        details: error?.message || 'Detalles del error no disponibles.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
