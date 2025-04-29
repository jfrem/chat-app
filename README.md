# Sistema de Chat en Tiempo Real

Este proyecto implementa una aplicación de chat en tiempo real utilizando Laravel en el backend y Next.js en el frontend, con WebSockets para la comunicación instantánea.

## Características

- **Mensajería en tiempo real**: Comunicación instantánea entre usuarios
- **Chats individuales y grupales**: Soporte para conversaciones 1:1 y grupales
- **Indicadores de estado**: Estados de mensaje (enviado, entregado, leído)
- **Indicadores de escritura**: Notificación cuando un usuario está escribiendo
- **Gestión robusta de conexiones**: Manejo de desconexiones con sincronización bidireccional
- **Diseño responsive**: Experiencia optimizada para dispositivos móviles y escritorio
- **Previsualización de enlaces**: Vista previa para links compartidos
- **Notificaciones**: Alertas para nuevos mensajes

## Tecnologías

### Backend
- Laravel 10+
- PHP 8.2+
- Laravel Echo Server
- Laravel Sanctum
- Laravel Horizon
- Redis
- MySQL 8.0+

### Frontend
- Next.js 13+
- React 18
- TypeScript
- Tailwind CSS
- Socket.io-client
- SWR

### Infraestructura
- Docker & Docker Compose
- Nginx
- Redis
- GitHub Actions (CI/CD)

## Requisitos

- Docker y Docker Compose
- Git
- Node.js 18+ (solo para desarrollo local)
- PHP 8.2+ (solo para desarrollo local)
- Composer (solo para desarrollo local)

## Configuración del entorno de desarrollo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/chat-app.git
   cd chat-app
   ```

2. Copiar los archivos de entorno:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

3. Levantar los contenedores Docker:
   ```bash
   docker-compose up -d
   ```

4. Instalar dependencias y ejecutar migraciones:
   ```bash
   # Instalar dependencias del backend
   docker-compose exec php composer install
   
   # Ejecutar migraciones
   docker-compose exec php php artisan migrate
   
   # Generar clave de aplicación
   docker-compose exec php php artisan key:generate
   
   # Crear enlace simbólico para storage
   docker-compose exec php php artisan storage:link
   ```

5. Acceder a la aplicación:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - WebSockets: ws://localhost:6001

## Estructura del proyecto

```
chat-app/
├── backend/                          # Aplicación Laravel
├── frontend/                         # Aplicación Next.js
├── docker/                           # Configuraciones de Docker
│   ├── nginx/                        # Configuración de Nginx
│   ├── php/                          # Configuración de PHP
│   ├── mysql/                        # Configuración de MySQL
│   ├── redis/                        # Configuración de Redis
│   └── websockets/                   # Configuración de WebSockets
├── docs/                             # Documentación
└── .github/                          # Flujos de trabajo de GitHub Actions
```

## Despliegue en producción

1. Configurar las variables de entorno para producción:
   ```bash
   cp .env.example .env.production
   # Editar .env.production con valores adecuados para producción
   ```

2. Construir y levantar los contenedores para producción:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. Ejecutar comandos de optimización:
   ```bash
   docker-compose -f docker-compose.prod.yml exec php php artisan config:cache
   docker-compose -f docker-compose.prod.yml exec php php artisan route:cache
   docker-compose -f docker-compose.prod.yml exec php php artisan view:cache
   ```

## Contribución

1. Crear una rama para la nueva funcionalidad:
   ```bash
   git checkout -b feature/nombre-funcionalidad
   ```

2. Realizar cambios siguiendo las convenciones de código

3. Ejecutar pruebas:
   ```bash
   # Backend
   docker-compose exec php php artisan test
   
   # Frontend
   docker-compose exec frontend npm test
   ```
4. Corrige los permisos
   ```bash
   docker-compose exec php chown -R www-data:www-data /var/www/html/storage
   docker-compose exec php chown -R www-data:www-data /var/www/html/bootstrap/cache
   docker-compose exec php chmod -R 775 /var/www/html/storage
   docker-compose exec php chmod -R 775 /var/www/html/bootstrap/cache

   sudo chown -R $USER:$USER /home/$USER

   docker-compose logs -f
   docker-compose down && docker image prune -a
   docker-compose up -d
   
   ```

4. Crear un pull request a la rama principal

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.