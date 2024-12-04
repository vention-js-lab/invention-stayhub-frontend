# Step 1: Use official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the application for production
RUN npm run build

# Step 7: Serve the app using a lightweight HTTP server (e.g., serve)
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to access the app
EXPOSE 80

# Step 10: Run the nginx server
CMD ["nginx", "-g", "daemon off;"]
