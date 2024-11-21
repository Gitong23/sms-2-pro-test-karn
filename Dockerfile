# Use a more robust base image for better compatibility
FROM node:18-bullseye AS build

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Add dependencies required for building some Node.js modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# Start a clean runtime image
FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Copy built files and dependencies from the build stage
COPY --from=build /app .

# Expose the application port
EXPOSE 3000

# Set the default command to start the application
CMD ["npm", "start"]
