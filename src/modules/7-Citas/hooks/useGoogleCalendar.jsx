import { useState, useEffect, useCallback } from 'react';
import { google } from 'googleapis';

// Importar JSON con ES Modules
import credentials from './credentials.json'; // Asegúrate de que Vite/Webpack permita importar JSON

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function useGoogleCalendar() {
  const [authClient, setAuthClient] = useState(null);
  const [freeBusyData, setFreeBusyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configurar cliente OAuth2
  const authorize = useCallback(() => {
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Verificar si hay un token guardado
    if (localStorage.getItem('google_token')) {
      const token = JSON.parse(localStorage.getItem('google_token'));
      oAuth2Client.setCredentials(token);
      setAuthClient(oAuth2Client);
    } else {
      getAccessToken(oAuth2Client);
    }
  }, []);

  const getAccessToken = (oAuth2Client) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    // Mostrar la URL al usuario para que autorice la app
    console.log('Authorize this app by visiting this URL:', authUrl);

    // Después de obtener el código de autorización, intercambiarlo por un token.
    // Necesitarás capturar el código desde la URL de redirección.
  };

  const checkFreeBusy = useCallback(async (timeMin="2024-11-14T08:00:00+01:00", timeMax="2024-11-14T21:00:00+01:00", 
    email="classbarbershopbarberoagenda1@gmail.com") => {
    if (!authClient) {
      console.error('Authentication client is not ready yet.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const calendar = google.calendar({ version: 'v3', auth: authClient });
      const res = await calendar.freebusy.query({
        requestBody: {
          timeMin,
          timeMax,
          timeZone: 'Europe/Madrid',
          items: [{ id: email }],
        },
      });
      setFreeBusyData(res.data);
    } catch (err) {
      console.error('Error fetching free/busy data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authClient]);

  useEffect(() => {
    authorize();
  }, [authorize]);

  return { checkFreeBusy, freeBusyData, loading, error };
}

export default useGoogleCalendar;
