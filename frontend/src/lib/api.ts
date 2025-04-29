import axios from 'axios';
import { getToken } from './auth';
import { toast } from 'react-toastify';

// Configuración del cliente axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar el token a todas las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de conexión
    if (!error.response) {
      toast.error('Error de conexión. Por favor, verifica tu conexión a internet.');
      return Promise.reject(error);
    }

    // Manejar errores según el código de estado
    switch (error.response.status) {
      case 401:
        // No mostrar toast para errores de autenticación, se manejan en los hooks de autenticación
        break;
      case 403:
        toast.error('No tienes permiso para realizar esta acción.');
        break;
      case 404:
        toast.error('El recurso solicitado no se encuentra disponible.');
        break;
      case 422:
        // Validación fallida, manejar en el componente
        break;
      case 429:
        toast.error('Has realizado demasiadas solicitudes. Por favor, espera un momento.');
        break;
      case 500:
        toast.error('Error en el servidor. Por favor, intenta más tarde.');
        break;
      default:
        toast.error('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    }

    return Promise.reject(error);
  }
);

// Tipos para API
export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

// Tipos para mensajes
export interface Message {
  id: number;
  sender_id: number;
  conversation_id: number;
  content: string;
  type: 'text' | 'system';
  status: 'sent' | 'delivered' | 'read';
  delivered_at: string | null;
  read_at: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sender?: User;
}

// Tipos para conversaciones
export interface Conversation {
  id: number;
  type: 'individual' | 'group';
  name: string | null;
  created_by: number;
  avatar: string | null;
  settings: Record<string, any> | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  participants?: ConversationParticipant[];
  last_message?: Message;
  unread_count?: number;
}

export interface ConversationParticipant {
  id: number;
  conversation_id: number;
  user_id: number;
  role: 'normal' | 'admin';
  status: 'active' | 'left' | 'removed';
  last_read_at: string | null;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Importar User desde auth
import { User } from './auth';

// Funciones API para conversaciones
export const getConversations = async (): Promise<Conversation[]> => {
  const response = await apiClient.get<{ data: Conversation[] }>('/conversations');
  return response.data.data;
};

export const getConversation = async (id: number): Promise<Conversation> => {
  const response = await apiClient.get<{ data: Conversation }>(`/conversations/${id}`);
  return response.data.data;
};

export const createConversation = async (
  users: number[],
  name?: string,
  type: 'individual' | 'group' = 'individual'
): Promise<Conversation> => {
  const response = await apiClient.post<{ data: Conversation }>('/conversations', {
    users,
    name,
    type,
  });
  return response.data.data;
};

// Funciones API para mensajes
export const getMessages = async (
  conversationId: number,
  page: number = 1
): Promise<PaginatedResponse<Message>> => {
  const response = await apiClient.get<PaginatedResponse<Message>>(
    `/conversations/${conversationId}/messages?page=${page}`
  );
  return response.data;
};

export const sendMessage = async (
  conversationId: number,
  content: string,
  metadata?: Record<string, any>
): Promise<Message> => {
  const response = await apiClient.post<{ data: Message }>(
    `/conversations/${conversationId}/messages`,
    {
      content,
      metadata,
    }
  );
  return response.data.data;
};

export const markAsRead = async (conversationId: number): Promise<void> => {
  await apiClient.post(`/conversations/${conversationId}/read`);
};

export const deleteMessage = async (messageId: number, forEveryone: boolean = false): Promise<void> => {
  await apiClient.delete(`/messages/${messageId}?for_everyone=${forEveryone ? 1 : 0}`);
};

// Funciones API para usuarios
export const getUsers = async (search?: string): Promise<User[]> => {
  const params = search ? { search } : {};
  const response = await apiClient.get<{ data: User[] }>('/users', { params });
  return response.data.data;
};

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.put<{ data: User }>('/user', data);
  return response.data.data;
};

export const updateStatus = async (status: 'online' | 'offline' | 'away'): Promise<void> => {
  await apiClient.post('/user/status', { status });
};

// Funciones API para grupos
export const addToGroup = async (conversationId: number, users: number[]): Promise<void> => {
  await apiClient.post(`/conversations/${conversationId}/participants`, { users });
};

export const removeFromGroup = async (conversationId: number, userId: number): Promise<void> => {
  await apiClient.delete(`/conversations/${conversationId}/participants/${userId}`);
};

export const leaveGroup = async (conversationId: number): Promise<void> => {
  await apiClient.post(`/conversations/${conversationId}/leave`);
};

export const updateGroupRole = async (
  conversationId: number,
  userId: number,
  role: 'normal' | 'admin'
): Promise<void> => {
  await apiClient.put(`/conversations/${conversationId}/participants/${userId}`, { role });
};

// Exportar cliente para uso en componentes
export default apiClient;