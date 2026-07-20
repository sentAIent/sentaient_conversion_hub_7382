# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Vite app
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
