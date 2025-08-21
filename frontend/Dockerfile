# 1. Misma versión de Node.js que se usa para generar los archivos.
FROM node:20-alpine

# 2. Se establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# 3. Se instala el CLI de Ionic globalmente DENTRO del contenedor.
RUN npm install -g @ionic/cli

# 4. Se copian los archivos de dependencias.
COPY package*.json ./

# 5. Se instalan todas las dependencias del proyecto.
RUN npm install

# 6. Se copia el resto del código fuente de la aplicación.
COPY . .

# 7. Se expone el puerto 8100.
EXPOSE 8100

# 8. Para iniciar la aplicación.
#    --host=0.0.0.0 CRÍTICO para que el servidor sea accesible desde fuera del contenedor.
CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100", "--external"]