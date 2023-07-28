# Utiliza la imagen de Node.js 16 como base
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Expone el puerto que usa la aplicación React (si es necesario)
# EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["npm", "start"]
