# Stage 1: Build the Vite app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application for production (generates 'dist' folder)
RUN npm run build

# Stage 2: Serve the built app with NGINX
FROM nginx:alpine


# Copy the built files from the previous stage to the NGINX html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to allow external traffic
EXPOSE 80

# Start NGINX in the foreground (default behavior)
CMD ["nginx", "-g", "daemon off;"]
