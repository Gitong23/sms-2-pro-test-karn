# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript files
RUN npx tsc

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy compiled files from the build stage
COPY --from=build /app/dist ./dist

# Run the application
CMD ["node", "dist/index.js"]
