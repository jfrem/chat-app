# Documento de Requisitos de Negocio (BRD)

# Sistema de Chat en Tiempo Real con Laravel

## Resumen Ejecutivo

Este documento detalla los requisitos de negocio para el desarrollo de una aplicación de chat en tiempo real basada en Laravel. El sistema permitirá comunicación instantánea entre usuarios, con enfoque principal en mensajes individuales (1:1) y soporte para chats grupales. La solución está diseñada para ser escalable, eficiente y mantener la integridad de los mensajes incluso bajo condiciones de conexión inestables.

La implementación se realizará a través de una arquitectura moderna que combine Laravel en el backend y Next.js en el frontend, utilizando WebSockets para la comunicación en tiempo real.

## 1. Definición del Problema

### 1.1 Contexto del Problema

Las comunicaciones digitales requieren soluciones de chat en tiempo real que sean confiables y efectivas, incluso en situaciones de conectividad variable. Las soluciones actuales a menudo presentan problemas de latencia, pérdida de datos durante desconexiones y experiencias de usuario inconsistentes entre dispositivos.

### 1.2 Descripción del Problema

Existe la necesidad de una plataforma de comunicación en tiempo real que permita a los usuarios interactuar de manera instantánea, tanto individualmente como en grupos, manteniendo la integridad de los datos incluso cuando hay problemas de conectividad.

### 1.3 Impacto del Problema

La falta de una solución robusta para comunicación instantánea puede resultar en:

- Retrasos en la transmisión de información crítica
- Pérdida de datos durante desconexiones
- Experiencia de usuario deficiente en diferentes dispositivos
- Limitaciones en la colaboración entre usuarios
- Ineficiencia operativa en entornos que dependen de comunicación rápida

## 2. Objetivos de Negocio

### 2.1 Objetivos Principales

- Desarrollar una plataforma de chat en tiempo real con alta disponibilidad (99.9%) y baja latencia (<500ms)
- Proporcionar una experiencia de usuario fluida en dispositivos móviles y de escritorio
- Garantizar la entrega confiable de mensajes incluso durante interrupciones de conectividad
- Soportar tanto comunicaciones individuales como grupales
- Implementar un sistema escalable que pueda crecer con el número de usuarios

### 2.2 Métricas de Éxito

- Latencia de entrega de mensajes inferior a 500ms en condiciones normales
- Capacidad para soportar al menos 1,000 conexiones simultáneas con posibilidad de escalar
- Recuperación exitosa después de desconexiones en más del 95% de los casos
- Tiempo medio de carga inicial de la aplicación menor a 3 segundos
- Uso optimizado de recursos del servidor para minimizar costos operativos
- Satisfacción de usuario medida a través de encuestas (objetivo: >85% satisfacción)

## 3. Alcance del Proyecto

### 3.1 Incluido en el Alcance

- Sistema de autenticación y gestión de usuarios
- Mensajería individual (1:1) con indicadores de estado en tiempo real
- Soporte para chats grupales con roles diferenciados (administrador/miembro)
- Manejo robusto de conexiones y reconexiones automáticas
- Interfaz de usuario responsive para dispositivos móviles y de escritorio
- Sistema de notificaciones para nuevos mensajes
- Historial de mensajes con carga paginada
- Indicadores de estado (enviado, entregado, leído)
- Indicadores de escritura ("usuario está escribiendo")
- Soporte para formatos básicos en mensajes (negrita, cursiva, emojis)
- Previsualización de enlaces compartidos

### 3.2 Fuera del Alcance

- Videollamadas o llamadas de voz
- Integración con plataformas externas de mensajería (WhatsApp, Telegram, etc.)
- Almacenamiento de mensajes cifrados de extremo a extremo
- Aplicaciones móviles nativas (se utilizará diseño web responsive)
- Sistema de archivos adjuntos de gran tamaño (>10MB)
- Traducción automática de mensajes
- Reconocimiento de voz o conversión de voz a texto

## 4. Requisitos Funcionales

### 4.1 Sistema de Autenticación

- RF1.1: Los usuarios deberán registrarse con nombre, email y contraseña
- RF1.2: Los usuarios podrán iniciar sesión con credenciales verificadas
- RF1.3: El sistema debe proporcionar tokens JWT para autenticación segura
- RF1.4: El sistema registrará el estado de conexión de los usuarios
- RF1.5: El sistema permitirá cerrar sesión en todos los dispositivos
- RF1.6: Implementación de recuperación de contraseña vía email

### 4.2 Mensajería Individual

- RF2.1: Los usuarios podrán iniciar conversaciones privadas con cualquier otro usuario
- RF2.2: El sistema deberá entregar mensajes en tiempo real (<500ms)
- RF2.3: Los mensajes mostrarán indicadores de estado (enviado, entregado, leído)
- RF2.4: El sistema deberá encolar mensajes durante desconexiones y entregarlos al reconectar
- RF2.5: Los usuarios podrán cargar el historial de mensajes mediante paginación
- RF2.6: El sistema mostrará indicadores de escritura en tiempo real
- RF2.7: Los usuarios podrán eliminar mensajes (con opción de eliminar para todos)
- RF2.8: El sistema enviará notificaciones push para mensajes nuevos

### 4.3 Mensajería Grupal

- RF3.1: Los usuarios podrán crear grupos de chat y asignarles nombres
- RF3.2: El creador del grupo será administrador por defecto
- RF3.3: Los administradores podrán añadir o eliminar miembros
- RF3.4: Los usuarios verán notificaciones de actividad grupal
- RF3.5: El sistema diferenciará roles (admin/normal) para gestión del grupo
- RF3.6: Los usuarios podrán abandonar grupos
- RF3.7: Los administradores podrán transferir privilegios de administración

### 4.4 Gestión de Conexiones

- RF4.1: El sistema detectará automáticamente pérdidas de conexión
- RF4.2: Los mensajes se encolarán localmente durante desconexiones
- RF4.3: Al restablecer conexión, se sincronizarán los mensajes pendientes
- RF4.4: El sistema mostrará el estado de conectividad en la interfaz
- RF4.5: El sistema tendrá un mecanismo de heartbeat para verificar conexiones activas
- RF4.6: Se implementará reconexión automática con backoff exponencial

### 4.5 Notificaciones

- RF5.1: Los usuarios recibirán notificaciones de nuevos mensajes
- RF5.2: Las notificaciones mostrarán información básica sin comprometer privacidad
- RF5.3: El sistema marcará conversaciones con mensajes no leídos
- RF5.4: Los usuarios podrán configurar preferencias de notificación
- RF5.5: Se implementará un sistema de notificaciones push para navegadores compatibles

## 5. Requisitos No Funcionales

### 5.1 Rendimiento

- RNF1.1: Latencia máxima de 500ms para entrega de mensajes en condiciones normales
- RNF1.2: Soporte para al menos 1,000 conexiones WebSocket simultáneas
- RNF1.3: Carga eficiente de historial (paginado) con máximo 1 segundo por petición
- RNF1.4: Tiempo de respuesta del servidor API menor a 200ms para el 95% de las solicitudes
- RNF1.5: Optimización para minimizar uso de ancho de banda móvil

### 5.2 Seguridad

- RNF2.1: Autenticación de WebSockets con tokens JWT
- RNF2.2: Validación de permisos para acceso a conversaciones
- RNF2.3: Protección contra inyección de código en mensajes
- RNF2.4: Sesiones protegidas con timeouts apropiados
- RNF2.5: Implementación de rate limiting para prevenir abuso
- RNF2.6: Validación de entrada para todos los campos de formulario
- RNF2.7: Protección contra ataques CSRF y XSS

### 5.3 Disponibilidad

- RNF3.1: Disponibilidad del sistema 99.9% del tiempo (downtime máximo ~9 horas/año)
- RNF3.2: Recuperación automática tras fallos del servidor
- RNF3.3: Reconexión automática del cliente tras pérdidas de conectividad
- RNF3.4: Tiempo máximo de recuperación tras fallos (RTO) de 15 minutos
- RNF3.5: Plan de respaldo y restauración automática de la base de datos

### 5.4 Escalabilidad

- RNF4.1: Diseño para soportar crecimiento horizontal mediante balanceo de carga
- RNF4.2: Almacenamiento en Redis para compartir estado entre múltiples instancias
- RNF4.3: Sistema de colas para gestionar picos de tráfico
- RNF4.4: Arquitectura que permita escalar a 10,000 usuarios simultáneos
- RNF4.5: Particionamiento de base de datos para gestionar crecimiento de datos

### 5.5 Usabilidad

- RNF5.1: Interfaz intuitiva adaptada a dispositivos móviles y escritorio
- RNF5.2: Indicadores visuales de estado de conexión y entrega de mensajes
- RNF5.3: Tiempo de carga inicial de la aplicación menor a 3 segundos
- RNF5.4: Soporte para accesibilidad según WCAG 2.1 nivel AA
- RNF5.5: Diseño que minimice clics para acciones frecuentes
- RNF5.6: Soporte para modo oscuro y preferencias de visualización

## 6. Arquitectura del Sistema

### 6.1 Visión General de la Arquitectura

La aplicación seguirá una arquitectura de microservicios con separación clara entre frontend y backend, utilizando comunicación en tiempo real a través de WebSockets y almacenamiento en caché para optimizar el rendimiento.

### 6.2 Componentes Principales

- **Frontend**: Next.js para interfaz reactiva
- **Backend**: Laravel (PHP) para lógica de negocio y API REST
- **WebSockets**: Laravel Echo Server con Socket.io
- **Base de datos principal**: MySQL para persistencia
- **Caché y gestión de sesiones**: Redis
- **Cola de mensajes**: Laravel Horizon con Redis
- **Contenedores**: Docker para despliegue consistente

### 6.3 Flujo de Datos

1. El usuario interactúa con la interfaz Next.js
2. Las solicitudes de datos se envían a la API Laravel
3. Los eventos en tiempo real se transmiten a través de WebSockets
4. Las transacciones se almacenan en MySQL
5. Los estados temporales y caché se mantienen en Redis
6. Las tareas asíncronas se procesan a través de Laravel Horizon

### 6.4 Modelo de Datos

```
- users
  ├── id
  ├── name
  ├── email
  ├── password
  ├── avatar
  ├── status (online/offline/away)
  ├── last_online_at
  ├── settings (JSON)
  └── created_at/updated_at

- messages
  ├── id
  ├── sender_id
  ├── conversation_id
  ├── content
  ├── type (text/system)
  ├── status (sent/delivered/read)
  ├── read_at
  ├── delivered_at
  ├── metadata (JSON - para enlaces, formatos)
  ├── deleted_at
  └── created_at/updated_at

- conversations
  ├── id
  ├── type (individual/group)
  ├── name (para grupos)
  ├── created_by
  ├── avatar (para grupos)
  ├── settings (JSON)
  ├── last_message_at
  └── created_at/updated_at

- conversation_participants
  ├── id
  ├── conversation_id
  ├── user_id
  ├── role (normal/admin) - para grupos
  ├── status (active/left/removed)
  ├── last_read_at
  ├── notifications_enabled
  └── created_at/updated_at

- message_receipts
  ├── id
  ├── message_id
  ├── user_id
  ├── read_at
  └── created_at
```

## 7. Consideraciones Técnicas

### 7.1 Tecnologías

- **Frontend**:

  - Next.js 13+ (React)
  - Tailwind CSS para estilos
  - Socket.io-client para WebSockets
  - SWR para gestión de estado y caché
  - Jest para pruebas unitarias

- **Backend**:

  - Laravel 10+ (PHP 8.2+)
  - Laravel Echo Server para WebSockets
  - Laravel Sanctum para autenticación
  - Laravel Horizon para colas
  - PHPUnit para pruebas

- **Infraestructura**:
  - MySQL 8.0+ para base de datos
  - Redis 6.0+ para caché y colas
  - Nginx como servidor web
  - Docker y Docker Compose
  - CI/CD con GitHub Actions

### 7.2 Experiencia de Usuario

- Diseño responsive con enfoque mobile-first
- Indicadores de escritura ("typing indicators")
- Soporte para formatos básicos (negrita, cursiva, emojis)
- Previsualización de enlaces compartidos
- Transiciones y animaciones sutiles para mejorar la experiencia
- Soporte para modo oscuro/claro
- Notificaciones nativas del navegador

### 7.3 Manejo de Datos

- Respaldo automático diario de la base de datos
- Soft delete para permitir recuperación de contenido
- Política de retención de mensajes antiguos (archivado tras 1 año)
- Caché de conversaciones frecuentes para mejorar rendimiento
- Sincronización bidireccional para garantizar consistencia

### 7.4 Consideraciones de Seguridad

- Sanitización de entrada para prevenir inyección
- Encriptación de datos sensibles en reposo
- Control granular de acceso basado en roles
- Auditoría de actividades sensibles
- Protección contra ataques de fuerza bruta

## 8. Plan de Implementación

### 8.1 Enfoque de Desarrollo

Se utilizará una metodología Agile Scrum con sprints de 2 semanas, priorizando características según el valor de negocio y complejidad técnica. El desarrollo seguirá los principios de CI/CD con pruebas automatizadas para garantizar la calidad del código.

### 8.2 Fases del Proyecto

#### Fase 1: Establecimiento de Base (3 semanas)

- **Semana 1**: Configuración del entorno y estructura del proyecto

  - Configurar repositorios Git
  - Implementar Docker y entornos de desarrollo
  - Establecer CI/CD básico
  - Crear estructura base de proyectos Laravel y Next.js

- **Semana 2-3**: Autenticación y estructura de datos
  - Implementar sistema de autenticación
  - Crear migraciones y modelos de base de datos
  - Establecer API RESTful básica
  - Configurar WebSockets iniciales
  - Implementar UI de registro e inicio de sesión

#### Fase 2: Mensajería Básica (4 semanas)

- **Semana 4-5**: Sistema de mensajería individual
  - Desarrollar backend para conversaciones 1:1
  - Implementar envío y recepción de mensajes
  - Crear interfaz de conversaciones
  - Establecer sincronización básica
- **Semana 6-7**: Mejoras de la experiencia de usuario
  - Implementar indicadores de estado
  - Añadir paginación de historial
  - Desarrollar notificaciones básicas
  - Implementar indicadores de escritura

#### Fase 3: Robustez y Características Avanzadas (4 semanas)

- **Semana 8-9**: Gestión de conexiones y resiliencia
  - Implementar manejo de desconexiones
  - Desarrollar sistema de cola de mensajes local
  - Crear sincronización bidireccional
  - Añadir reconexión automática
- **Semana 10-11**: Funcionalidades avanzadas
  - Implementar mensajería grupal
  - Desarrollar roles y permisos
  - Añadir formateo de mensajes
  - Implementar previsualización de enlaces

#### Fase 4: Optimización y Finalización (3 semanas)

- **Semana 12-13**: Pruebas y optimización
  - Realizar pruebas de carga
  - Optimizar consultas a base de datos
  - Mejorar rendimiento de WebSockets
  - Implementar escalabilidad horizontal
- **Semana 14**: Preparación para producción
  - Finalizar configuración de producción
  - Implementar monitoreo y alertas
  - Realizar auditoría de seguridad
  - Preparar documentación final

### 8.3 Entregables por Fase

| Fase   | Entregables Clave                                                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fase 1 | - Repositorio de código configurado<br>- Entorno Docker funcional<br>- Sistema de autenticación<br>- Estructura de base de datos<br>- Interfaz de usuario básica                    |
| Fase 2 | - API de mensajería completa<br>- WebSockets funcionales<br>- Interfaz de chat básica<br>- Sistema de indicadores de estado<br>- Historial de mensajes con paginación               |
| Fase 3 | - Sistema de manejo de desconexiones<br>- Mensajería grupal<br>- Roles y permisos<br>- Formateo de mensajes<br>- Previsualización de enlaces                                        |
| Fase 4 | - Informe de pruebas de carga<br>- Configuración de producción<br>- Sistema de monitoreo<br>- Documentación técnica y de usuario<br>- Aplicación optimizada y lista para producción |

## 9. Riesgos y Mitigación

| Riesgo                                        | Probabilidad | Impacto | Estrategia de Mitigación                                                                                                                  |
| --------------------------------------------- | ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Latencia alta en mensajes                     | Media        | Alto    | - Optimizar consultas<br>- Implementar caché eficiente<br>- Monitoreo continuo<br>- Balanceo de carga inteligente                         |
| Pérdida de mensajes durante desconexiones     | Alta         | Alto    | - Sistema robusto de cola local<br>- Sincronización bidireccional<br>- Almacenamiento temporal en IndexedDB<br>- Validación de entrega    |
| Problemas de escalabilidad                    | Media        | Alto    | - Diseño para escalabilidad horizontal<br>- Pruebas de carga anticipadas<br>- Monitoreo proactivo<br>- Optimización temprana de consultas |
| Vulnerabilidades de seguridad                 | Baja         | Crítico | - Revisiones de código<br>- Pruebas de penetración<br>- Actualizaciones regulares<br>- Implementación de OWASP Top 10                     |
| Complejidad técnica                           | Media        | Medio   | - Capacitación del equipo<br>- Documentación detallada<br>- Revisiones de código frecuentes<br>- Consultas con expertos                   |
| Problemas de compatibilidad entre navegadores | Media        | Medio   | - Pruebas en múltiples navegadores<br>- Utilización de polyfills<br>- Enfoque progresivo para características avanzadas                   |
| Incremento inesperado de usuarios             | Baja         | Alto    | - Arquitectura elástica<br>- Monitoreo de capacidad<br>- Plan de escalado automático<br>- Restricciones temporales de características     |

## 10. Criterios de Éxito y Aceptación

### 10.1 Criterios de Aceptación Técnica

- El sistema mantiene una latencia inferior a 500ms en el 95% de los mensajes
- La aplicación soporta al menos 1,000 conexiones simultáneas
- El tiempo de recuperación tras desconexiones es menor a 5 segundos
- La interfaz mantiene tiempos de respuesta menores a 200ms
- El sistema funciona correctamente en los principales navegadores (Chrome, Firefox, Safari, Edge)

### 10.2 Criterios de Aceptación de Usuario

- Mínimo 85% de satisfacción en pruebas de usuario
- Tasa de abandono menor al 20% durante las primeras interacciones
- Tiempo promedio de primera acción menor a 30 segundos
- Completitud de tareas de usuario superior al 90%
- Net Promoter Score (NPS) superior a 40 tras el lanzamiento

## 11. Apéndices

### Apéndice A: Estructura de Directorios

#### Estructura del Proyecto Completo

```
chat-app/
├── .github/                          # Configuración de CI/CD
│   └── workflows/
│       ├── deploy-prod.yml           # Workflow para despliegue a producción
│       └── testing.yml               # Workflow para pruebas automatizadas
│
├── backend/                          # Aplicación Laravel
│   ├── app/
│   │   ├── Console/
│   │   ├── Events/                   # Eventos para WebSockets
│   │   ├── Exceptions/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   ├── Jobs/
│   │   ├── Listeners/
│   │   ├── Models/
│   │   ├── Notifications/
│   │   ├── Providers/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── bootstrap/
│   ├── config/
│   │   ├── websockets.php
│   │   ├── broadcasting.php
│   │   └── horizon.php
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── public/
│   ├── resources/
│   │   └── views/
│   ├── routes/
│   │   ├── api.php
│   │   ├── channels.php              # Definición de canales WebSocket
│   │   └── web.php
│   ├── storage/
│   ├── tests/
│   │   ├── Feature/
│   │   └── Unit/
│   ├── .env                          # Variables de entorno para Laravel
│   ├── .env.example                  # Ejemplo de variables de entorno
│   ├── artisan
│   └── composer.json
│
├── frontend/                         # Aplicación Next.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/
│   │       └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── common/
│   │   │   ├── groups/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── config/
│   ├── .dockerignore                 # Archivos ignorados por Docker
│   ├── .env.local                    # Variables de entorno para Next.js
│   ├── Dockerfile                    # Dockerfile para Next.js
│   ├── next.config.js                # Configuración de Next.js
│   ├── package.json
│   └── tailwind.config.js            # Configuración de Tailwind CSS
│
├── docker/                           # Configuraciones de Docker
│   ├── nginx/
│   │   ├── conf.d/
│   │   │   ├── default.conf          # Configuración principal de Nginx
│   │   │   └── ssl.conf              # Configuración SSL (HTTPS)
│   │   ├── ssl/                      # Certificados SSL
│   │   └── Dockerfile                # Dockerfile para Nginx
│   │
│   ├── php/
│   │   ├── local.ini                 # Configuración PHP personalizada
│   │   ├── php.ini                   # Configuración PHP completa
│   │   ├── supervisord.conf          # Configuración de Supervisor
│   │   └── Dockerfile                # Dockerfile para PHP-FPM
│   │
│   ├── mysql/
│   │   ├── my.cnf                    # Configuración de MySQL
│   │   └── init/                     # Scripts de inicialización
│   │       └── 01-create-databases.sql
│   │
│   ├── redis/
│   │   └── redis.conf                # Configuración de Redis
│   │
│   └── websockets/
│       ├── laravel-echo-server.json  # Configuración de Laravel Echo Server
│       └── Dockerfile                # Dockerfile para WebSockets
│
├── docs/                             # Documentación del proyecto
│   ├── api/                          # Documentación de API
│   ├── development/                  # Guías de desarrollo
│   ├── deployment/                   # Instrucciones de despliegue
│   └── Chat-App.md                   # Documento de Requisitos (BRD)
│
├── .env                              # Variables de entorno para Docker Compose
├── .gitignore                        # Archivos ignorados por Git
├── docker-compose.yml                # Configuración para desarrollo
├── docker-compose.prod.yml           # Configuración para producción
└── README.md
```

### Apéndice B: Glosario de Términos

- **WebSocket**: Protocolo de comunicación que proporciona canales de comunicación full-duplex a través de una única conexión TCP.
- **Laravel**: Framework de PHP de código abierto para el desarrollo de aplicaciones web.
- **Next.js**: Framework de React para aplicaciones web del lado del cliente y servidor.
- **Redis**: Almacén de estructuras de datos en memoria, utilizado como base de datos, caché y agente de mensajes.
- **JWT (JSON Web Token)**: Estándar abierto que define una forma compacta y autónoma para transmitir información de forma segura entre partes como un objeto JSON.
- **WebSockets**: Tecnología que permite la comunicación bidireccional en tiempo real entre clientes y servidores.
- **Laravel Echo**: Biblioteca JavaScript para suscribirse a canales y escuchar eventos transmitidos por Laravel.
- **Soft Delete**: Técnica de eliminación donde los registros se marcan como eliminados pero no se eliminan físicamente de la base de datos.
- **Heartbeat**: Señal periódica que se envía para verificar que una conexión sigue activa.
- **Backoff Exponencial**: Estrategia que incrementa progresivamente el tiempo entre intentos de reconexión tras fallos.
- **Mobile-First**: Enfoque de diseño que prioriza la experiencia en dispositivos móviles antes que en escritorio.
- **CI/CD**: Integración Continua y Despliegue Continuo, prácticas que automatizan la integración de código y el despliegue de aplicaciones.
- **API REST**: Interfaz de Programación de Aplicaciones que sigue principios de Transferencia de Estado Representacional.

### Apéndice C: Estimación de Recursos

#### Recursos Humanos

| Rol                    | Cantidad | Dedicación | Responsabilidades Principales                            |
| ---------------------- | -------- | ---------- | -------------------------------------------------------- |
| Líder Técnico          | 1        | 100%       | Arquitectura, decisiones técnicas, revisión de código    |
| Desarrollador Backend  | 2        | 100%       | API, WebSockets, base de datos, infraestructura          |
| Desarrollador Frontend | 2        | 100%       | Interfaz de usuario, experiencia de usuario, integración |
| QA/Tester              | 1        | 100%       | Pruebas, automatización, calidad                         |
| DevOps                 | 1        | 50%        | Infraestructura, CI/CD, monitoreo                        |
| Project Manager        | 1        | 50%        | Gestión del proyecto, seguimiento, comunicación          |

#### Infraestructura Inicial

| Recurso                   | Especificaciones                | Propósito                      |
| ------------------------- | ------------------------------- | ------------------------------ |
| Servidores de Aplicación  | 2+ instancias (4 vCPU, 8GB RAM) | Ejecutar la aplicación backend |
| Servidor de Base de Datos | 1 instancia (8 vCPU, 16GB RAM)  | MySQL para datos persistentes  |
| Servidor Redis            | 2 instancias (2 vCPU, 4GB RAM)  | Caché, colas, WebSockets       |
| Balanceador de Carga      | 1 instancia                     | Distribución de tráfico        |
| CDN                       | N/A                             | Entrega de activos estáticos   |
| Almacenamiento            | 100GB SSD inicialmente          | Datos de aplicación y backups  |

---

## Aprobación del Documento

| Rol                       | Nombre | Firma | Fecha |
| ------------------------- | ------ | ----- | ----- |
| Patrocinador del Proyecto |        |       |       |
| Director de Proyecto      |        |       |       |
| Líder Técnico             |        |       |       |
| Representante de Usuario  |        |       |       |
