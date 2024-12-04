# Step 1: Use the official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Set the NODE_ENV environment variable to production
ENV NODE_ENV=production

# Step 4: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 5: Install production dependencies
RUN npm ci

# Step 6: Copy the rest of the application files
COPY . .

# Step 7: Build the application for production
RUN npm run build

# Step 8: Run the application directly using Node.js
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
