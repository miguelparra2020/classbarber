import { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstallable, setIsPWAInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Detiene el comportamiento automático
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWAInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Muestra el cuadro de instalación
    deferredPrompt.prompt();

    // Espera la elección del usuario
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`El usuario eligió: ${outcome}`);

    // Resetea el prompt
    setDeferredPrompt(null);
    setIsPWAInstallable(false);
  };

  if (!isPWAInstallable) {
    return null; // Si no es instalable, no mostrar el botón
  }

  return (
    <button onClick={handleInstallClick} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
      Instalar App
    </button>
  );
};

export default InstallButton;
