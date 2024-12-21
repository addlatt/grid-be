# Use Node.js 22 as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies, including devDependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN yarn build

# Command to run the app
CMD ["node", "dist/server.js"]
