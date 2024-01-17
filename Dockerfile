# Use an official Node.js runtime as a parent image
FROM node:16.14-alpine3.14 as angular

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Use an official HTTPD image as a parent image
FROM httpd:alpine3.15

# Set the working directory for Apache
WORKDIR /usr/local/apache2/htdocs/

# Copy the built Angular app from the previous stage
COPY --from=angular /app/dist/sato-quiz/ .
