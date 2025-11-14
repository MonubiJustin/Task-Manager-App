# Use Node.js v20.11.1 with Alpine Linux (lightweight base image)
FROM node:20.11.1-alpine3.19

# Update package index and install bash (needed for wait-for-it)
# Also install coreutils for common Unix utilities
RUN apk update && apk add bash && apk add --no-cache coreutils

# Copy wait-for-it script into the container to wait for other services (like DB)
COPY wait-for-it.sh /usr/local/bin/wait-for-it
# Make the script executable
RUN chmod +x /usr/local/bin/wait-for-it

# Create a non-root user 'app' and a group 'app' for security
RUN addgroup app && adduser -S -G app app

# Set working directory inside container to /app
WORKDIR /app

# Create a directory for app data (logs, files, etc.)
RUN mkdir data

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the app files into the container
COPY . .

RUN dos2unix /app/docker-entrypoint.sh /usr/local/bin/wait-for-it && chmod +x /app/docker-entrypoint.sh /usr/local/bin/wait-for-it
# Give ownership of /app folder to 'app' user
RUN chown -R app:app /app

# Switch to 'app' user (no longer root) for security
USER app

# Expose port 4000 (your app will listen on this port)
EXPOSE 4000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start the app using nodemon
CMD ["npx", "nodemon", "app.js"]
