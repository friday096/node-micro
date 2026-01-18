# Use Node.js version 20 as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Install nodemon as a global dependency for live reloading (only for development)
RUN npm install -g nodemon

# Copy the source code
COPY ./src ./src
COPY ./app.js ./app.js

# Expose port 6000 (or your desired port)
EXPOSE 6000

# Start the service using nodemon for live reloading during development
CMD ["nodemon", "app.js"]
