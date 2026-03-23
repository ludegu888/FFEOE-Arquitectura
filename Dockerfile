# ETAPA 1: Build (Compilación)
# Usamos una imagen ligera de Node para compilar
FROM node:20-slim AS builder
WORKDIR /app

# Copiamos archivos de dependencias primero para aprovechar la caché de capas
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y compilamos de TS a JS
COPY . .
RUN npm run build

# ETAPA 2: Runtime (Ejecución)
# Usamos una imagen limpia y pequeña para el servidor final
FROM node:20-slim
WORKDIR /app

# Solo copiamos lo estrictamente necesario para ejecutar la app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalamos solo las dependencias de producción (sin compiladores ni tests)
RUN npm install --omit=dev

# Exponemos el puerto 3000
EXPOSE 3000

# Arrancamos la aplicación
CMD ["node", "dist/index.js"]
