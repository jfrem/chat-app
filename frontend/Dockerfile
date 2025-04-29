FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias globales
# RUN npm install -g npm@latest

# Copiar archivos de configuración de paquetes
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto para desarrollo
EXPOSE 3000

# Comando de inicio para desarrollo
CMD ["npm", "run", "dev"]