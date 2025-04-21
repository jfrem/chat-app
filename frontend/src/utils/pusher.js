import Pusher from 'pusher-js';

let pusher = null;

if (typeof window !== 'undefined') {
  pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
    wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
    forceTLS: process.env.NEXT_PUBLIC_PUSHER_TLS === 'true',
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  });
}

export default pusher;