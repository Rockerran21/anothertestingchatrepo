# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm i
RUN npm run dev

# Copy the rest of your application source code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Command to run the app
CMD ["npm", "start"]
