# Use a specific Node version for consistency
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package*.json ./

# Install dependencies (npm ci ensures clean installs if package-lock.json exists)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
