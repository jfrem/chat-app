import Echo from 'laravel-echo';
import { getToken } from './auth';

// Crear y exportar la instancia de Echo
let echoInstance: Echo | null = null;

export const initEcho = (token: string): Echo => {
  if (!echoInstance) {
    echoInstance = new Echo({
      broadcaster: 'reverb',
      key: process.env.NEXT_PUBLIC_WEBSOCKET_KEY,
      host: `${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}:${process.env.NEXT_PUBLIC_WEBSOCKET_PORT}`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      encrypted: process.env.NODE_ENV === 'production',
      forceTLS: process.env.NODE_ENV === 'production',
      authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
      disableStats: true,
      enabledTransports: ['ws', 'wss'], // Websockets only
    });

    // Monitorear estado de conexión
    echoInstance.connector.socket.on('open', () => {
      console.log('WebSocket conectado');
    });

    echoInstance.connector.socket.on('close', () => {
      console.log('WebSocket desconectado');
    });

    echoInstance.connector.socket.on('error', (error: any) => {
      console.error('Error de WebSocket:', error);
    });
  }

  return echoInstance;
};

export const disconnectEcho = (): void => {
  if (echoInstance && echoInstance.connector && echoInstance.connector.socket) {
    echoInstance.connector.socket.close();
    echoInstance = null;
  }
};

export const getEcho = (): Echo | null => {
  // Si no existe la instancia, intentar inicializarla con el token actual
  if (!echoInstance) {
    const token = getToken();
    if (token) {
      return initEcho(token);
    }
    return null;
  }
  return echoInstance;
};

// Tipo necesario para TypeScript con Laravel Echo
declare global {
  interface Window {
    Echo: Echo;
  }
}