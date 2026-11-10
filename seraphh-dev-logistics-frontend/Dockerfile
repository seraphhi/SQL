# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (NGINX)
FROM nginx:alpine
# Copy custom nginx config if necessary, else default
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 8080 for OpenShift compatibility
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
