# Stage 1: Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /glossary-backend

# Copy package.json and yarn.lock files first to leverage Docker layer caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Stage 2: Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /glossary-backend

# Copy only the necessary files from the build stage
COPY --from=build /glossary-backend /glossary-backend

# Expose the application port
EXPOSE 9000

# Start the application
CMD ["yarn", "dev"]
