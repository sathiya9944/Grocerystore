# Use a lightweight Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy all project files into the container
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose port 8082
EXPOSE 8082

# Command to run the app
CMD ["http-server", "-p", "8082"]

