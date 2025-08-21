# 1. Se usa una imagen base de Node.js ligera y moderna.
FROM node:20-alpine

# 2. Se establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# 3. Se copian los archivos de dependencias y se las instalan.
COPY package*.json ./
RUN npm install

# 4. Se copia el resto del código de la aplicación.
COPY . .

# 5. Se expone el puerto en el que correrá el servidor.
EXPOSE 3000

# 6. Comando para iniciar la aplicación cuando arranque el contenedor.
CMD ["node", "index.js"]