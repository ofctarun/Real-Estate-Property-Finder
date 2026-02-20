# Dockerfile for the main application
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3006
EXPOSE 3006

# Start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3006"]
