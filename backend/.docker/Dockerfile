# Utiliza la imagen de Node.js 16 como base
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
RUN npm install




# Copia el resto de los archivos de la aplicación
COPY . .


RUN npm run build

# Expone el puerto 3001 del backend
EXPOSE 3001


RUN echo "Finishing building backend"

# Comando para iniciar el servidor Node.js
CMD ["npm", "start"]
