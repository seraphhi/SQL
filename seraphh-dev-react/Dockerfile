# Etapa 1: Compilación de React con Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx (Versión unprivileged necesaria para OpenShift)
FROM nginxinc/nginx-unprivileged:alpine
# Vite por defecto compila en la carpeta 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 8080 (requerido para Nginx unprivileged y OpenShift)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
