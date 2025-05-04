# Use the official Node.js image as a base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install a simple HTTP server to serve static files
RUN npm install -g http-server

# Expose port 8082
EXPOSE 8082

# Command to run the application
CMD ["http-server", "-p", "8082", "-c-1"]
