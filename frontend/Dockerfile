FROM node:18-alpine

# Configuración del entorno
ENV NODE_ENV=development \
    PORT=3000 \
    NPM_CACHE_DIR=/app/.npm-cache

# Directorio de trabajo
WORKDIR /app

# 1. Copiar solo lo necesario para instalar dependencias
COPY package.json package-lock.json* ./

# 2. Instalación optimizada de dependencias
RUN --mount=type=cache,target=${NPM_CACHE_DIR} \
    npm set cache ${NPM_CACHE_DIR} && \
    npm ci --no-optional && \
    npm cache clean --force

# 3. Copiar el resto de la aplicación (excluyendo node_modules)
COPY . .

# 4. Build de producción (opcional, recomendado para staging/prod)
# RUN npm run build

# Exponer puerto
EXPOSE ${PORT}

# Comando de inicio con hot-reload para desarrollo
CMD ["npm", "run", "dev"]