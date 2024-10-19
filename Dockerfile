# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build --prod

# Stage 2: Production Stage
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copy nginx configuration
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/

# Expose the port
EXPOSE 4200
