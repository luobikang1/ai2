# Stage 1: Build Frontend and Server
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy full code and build frontend static assets
COPY . .
RUN npm run build

# Clean up devDependencies to keep image lean
RUN npm prune --production

# Stage 2: Final Production Container
FROM node:20-alpine

WORKDIR /app

# Copy built server assets, production packages, and server entrypoints
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Expose port
EXPOSE 3000

# Environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Start Hono backend server which hosts both frontend and API
CMD ["node", "server/index.js"]
