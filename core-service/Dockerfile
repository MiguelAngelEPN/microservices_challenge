# Usar la imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código fuente al contenedor
COPY . .

# Exponer el puerto del servicio
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
