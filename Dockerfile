# Step 1: Build Stage
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Pass environment variables as build arguments
ARG VITE_APP_PORT
ARG VITE_API_BASE_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_MAP_APIKEY
ARG VITE_STRIPE_PUBLISHABLE_KEY

# Persist build arguments as environment variables
ENV VITE_APP_PORT=$VITE_APP_PORT
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_MAP_APIKEY=$VITE_GOOGLE_MAP_APIKEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Production Stage
FROM nginx:1.25

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
